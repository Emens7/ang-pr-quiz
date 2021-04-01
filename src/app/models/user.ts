export interface User {
    uid?: string;
    email: string;
    role: 'teacher' | 'student';
}