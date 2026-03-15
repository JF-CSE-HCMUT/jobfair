const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:4000/api').replace(/\/$/, '');

export interface Student {
    studentId: string;
    name: string;
    checkedInAt?: string;
}

interface ApiErrorPayload {
    message?: string;
}

async function apiRequest<T>(path: string, init?: RequestInit): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${path}`, {
        headers: {
            'Content-Type': 'application/json',
            ...(init?.headers ?? {}),
        },
        ...init,
    });

    if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as ApiErrorPayload | null;
        const message = payload?.message ?? `Request failed: ${response.status}`;
        throw new Error(message);
    }

    return response.json() as Promise<T>;
}

interface CheckinResponse {
    ok: boolean;
    inserted: boolean;
    studentId: string;
    totalStudents: number;
    updatedAt: string;
}

interface CheckinSummaryResponse {
    ok: boolean;
    totalStudents: number;
    updatedAt: string;
}

interface StudentsResponse {
    ok: boolean;
    students: Student[];
}

interface StudentQueryResponse {
    ok: boolean;
    found: boolean;
    student?: Student;
}

export async function registerStudentCheckin(payload: { studentId: string; name?: string }): Promise<CheckinResponse> {
    return apiRequest<CheckinResponse>('/checkins', {
        method: 'POST',
        body: JSON.stringify(payload),
    });
}

export async function getCheckinSummary(): Promise<CheckinSummaryResponse> {
    return apiRequest<CheckinSummaryResponse>('/checkins/summary');
}

export async function getStudents(limit = 80): Promise<Student[]> {
    const result = await apiRequest<StudentsResponse>(`/students?limit=${limit}`);
    return result.students;
}

export async function queryStudentById(studentId: string): Promise<Student | null> {
    const response = await fetch(`${API_BASE_URL}/students/${studentId}`, {
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.status === 404) {
        return null;
    }

    if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as ApiErrorPayload | null;
        const message = payload?.message ?? `Request failed: ${response.status}`;
        throw new Error(message);
    }

    const result = (await response.json()) as StudentQueryResponse;
    if (!result.found || !result.student) {
        return null;
    }

    return result.student;
}
