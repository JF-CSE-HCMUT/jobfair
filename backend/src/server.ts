import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import type { Request, Response } from 'express';

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

app.get('/api/health', async (_req: Request, res: Response) => {
    res.json({ ok: true, service: 'jf-backend', timestamp: new Date().toISOString() });
});

async function startServer(): Promise<void> {
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
