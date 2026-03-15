import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import type { Request, Response } from 'express';
import { z } from 'zod';
import { getCheckinCounter, initializeDatabase, logFailedStudentQuery, pool } from './db.js';

const app = express();

const corsOrigins = (process.env.CORS_ORIGIN ?? 'http://localhost:5173')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

app.use(
    cors({
        origin: corsOrigins.length > 0 ? corsOrigins : true,
    }),
);
app.use(express.json());

const studentPayloadSchema = z.object({
    studentId: z.string().regex(/^\d{7}$/),
    name: z.string().trim().min(1).max(120).optional(),
});

function isValidStudentId(studentId: string): boolean {
    return /^\d{7}$/.test(studentId);
}

function logServerError(context: string, error: unknown): void {
    // eslint-disable-next-line no-console
    console.error(context, error);
}

app.get('/api/health', async (_req: Request, res: Response) => {
    try {
        const dbStatus = await pool.query('SELECT 1');
        res.json({ ok: true, db: dbStatus.rowCount === 1 });
    } catch {
        res.status(500).json({ ok: false, db: false });
    }
});

app.post('/api/checkins', async (req: Request, res: Response) => {
    const parsed = studentPayloadSchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({
            ok: false,
            message: 'Invalid payload. studentId must be exactly 7 digits.',
        });
    }

    const studentId = parsed.data.studentId;
    const name = parsed.data.name ?? `Sinh vien ${studentId}`;

    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        const insertResult = await client.query<{
            student_id: string;
            name: string;
            checked_in_at: Date;
        }>(
            `
        INSERT INTO students (student_id, name)
        VALUES ($1, $2)
        ON CONFLICT (student_id) DO NOTHING
        RETURNING student_id, name, checked_in_at;
      `,
            [studentId, name],
        );

        const inserted = insertResult.rowCount === 1;

        let counterResult;
        if (inserted) {
            counterResult = await client.query<{ counter_value: string; updated_at: Date }>(
                `
          UPDATE app_counters
          SET counter_value = counter_value + 1,
              updated_at = NOW()
          WHERE counter_key = 'checked_in_total'
          RETURNING counter_value, updated_at;
        `,
            );
        } else {
            counterResult = await client.query<{ counter_value: string; updated_at: Date }>(
                `
          SELECT counter_value, updated_at
          FROM app_counters
          WHERE counter_key = 'checked_in_total';
        `,
            );
        }

        await client.query('COMMIT');

        const counter = counterResult.rows[0];
        return res.status(inserted ? 201 : 200).json({
            ok: true,
            inserted,
            studentId,
            totalStudents: Number(counter?.counter_value ?? 0),
            updatedAt: (counter?.updated_at ?? new Date()).toISOString(),
        });
    } catch (error) {
        await client.query('ROLLBACK');
        logServerError('Failed to register check-in.', error);
        return res.status(500).json({
            ok: false,
            message: 'Failed to register check-in.',
        });
    } finally {
        client.release();
    }
});

app.get('/api/checkins/summary', async (_req: Request, res: Response) => {
    try {
        const summary = await getCheckinCounter();
        res.json({ ok: true, ...summary });
    } catch (error) {
        logServerError('Failed to fetch summary.', error);
        res.status(500).json({
            ok: false,
            message: 'Failed to fetch summary.',
        });
    }
});

app.get('/api/students', async (req: Request, res: Response) => {
    const parsedLimit = Number.parseInt(String(req.query.limit ?? '80'), 10);
    const limit = Number.isNaN(parsedLimit) ? 80 : Math.max(1, Math.min(parsedLimit, 500));

    try {
        const result = await pool.query<{
            student_id: string;
            name: string;
            checked_in_at: Date;
        }>(
            `
        SELECT student_id, name, checked_in_at
        FROM students
        ORDER BY checked_in_at DESC
        LIMIT $1;
      `,
            [limit],
        );

        res.json({
            ok: true,
            students: result.rows.map((row) => ({
                studentId: row.student_id,
                name: row.name,
                checkedInAt: row.checked_in_at.toISOString(),
            })),
        });
    } catch (error) {
        logServerError('Failed to fetch students.', error);
        res.status(500).json({
            ok: false,
            message: 'Failed to fetch students.',
        });
    }
});

app.get('/api/students/:studentId', async (req: Request, res: Response) => {
    const studentId = String(req.params.studentId ?? '').trim();
    if (!isValidStudentId(studentId)) {
        return res.status(400).json({
            ok: false,
            message: 'studentId must be 7 digits.',
        });
    }

    try {
        const result = await pool.query<{
            student_id: string;
            name: string;
            checked_in_at: Date;
        }>(
            `
        SELECT student_id, name, checked_in_at
        FROM students
        WHERE student_id = $1;
      `,
            [studentId],
        );

        if (result.rowCount === 0) {
            await logFailedStudentQuery(studentId, 'NOT_FOUND');
            return res.status(404).json({
                ok: false,
                found: false,
                message: 'Student not found.',
            });
        }

        const student = result.rows[0];
        return res.json({
            ok: true,
            found: true,
            student: {
                studentId: student.student_id,
                name: student.name,
                checkedInAt: student.checked_in_at.toISOString(),
            },
        });
    } catch (error) {
        logServerError(`Failed to query student information for ${studentId}.`, error);
        try {
            await logFailedStudentQuery(studentId, 'QUERY_FAILED');
        } catch {
            // Best effort logging only.
        }

        return res.status(500).json({
            ok: false,
            message: 'Failed to query student information.',
        });
    }
});

async function startServer(): Promise<void> {
    await initializeDatabase();

    const port = Number.parseInt(process.env.PORT ?? '4000', 10);
    app.listen(port, () => {
        // eslint-disable-next-line no-console
        console.log(`Backend API ready at http://localhost:${port}`);
    });
}

startServer().catch((error) => {
    // eslint-disable-next-line no-console
    console.error('Failed to start backend server:', error);
    process.exit(1);
});
