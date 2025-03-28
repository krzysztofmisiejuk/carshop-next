import { pool } from '@/lib/db';
import { User } from '@/types/types';

export async function GET() {
	try {
		const result = await pool.query<User>('SELECT * FROM users');
		return Response.json({ data: result.rows }, { status: 200 });
	} catch (error) {
		console.error('Błąd:', error);
		return Response.json({ error }, { status: 500 });
	}
}


