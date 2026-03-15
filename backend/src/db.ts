import { Pool } from 'pg';

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
    throw new Error('DATABASE_URL is required. Copy backend/.env.example to backend/.env and set your PostgreSQL connection string.');
}

export const pool = new Pool({
    connectionString: databaseUrl,
});

const COUNTER_KEY = 'checked_in_total';

export async function initializeDatabase(): Promise<void> {
    await pool.query(`
    CREATE TABLE IF NOT EXISTS students (
      id BIGSERIAL PRIMARY KEY,
      student_id VARCHAR(20) UNIQUE NOT NULL,
      name TEXT NOT NULL,
      checked_in_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

    await pool.query(`
    CREATE TABLE IF NOT EXISTS app_counters (
      counter_key TEXT PRIMARY KEY,
      counter_value BIGINT NOT NULL DEFAULT 0,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

    await pool.query(`
    CREATE TABLE IF NOT EXISTS failed_student_queries (
      id BIGSERIAL PRIMARY KEY,
      student_id VARCHAR(20) NOT NULL,
      reason TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

    await pool.query(
        `
      INSERT INTO app_counters (counter_key, counter_value)
      VALUES ($1, 0)
      ON CONFLICT (counter_key) DO NOTHING;
    `,
        [COUNTER_KEY],
    );

    await pool.query(
        `
      UPDATE app_counters
      SET counter_value = (SELECT COUNT(*) FROM students),
          updated_at = NOW()
      WHERE counter_key = $1;
    `,
        [COUNTER_KEY],
    );
}

export async function logFailedStudentQuery(studentId: string, reason: string): Promise<void> {
    await pool.query(
        `
      INSERT INTO failed_student_queries (student_id, reason)
      VALUES ($1, $2);
    `,
        [studentId, reason],
    );
}

export async function getCheckinCounter(): Promise<{ totalStudents: number; updatedAt: string }> {
    const result = await pool.query<{ counter_value: string; updated_at: Date }>(
        `
      SELECT counter_value, updated_at
      FROM app_counters
      WHERE counter_key = $1;
    `,
        [COUNTER_KEY],
    );

    const row = result.rows[0];
    return {
        totalStudents: Number(row?.counter_value ?? 0),
        updatedAt: (row?.updated_at ?? new Date()).toISOString(),
    };
}
