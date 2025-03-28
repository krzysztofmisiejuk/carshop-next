import { getUserFromToken } from '@/lib/auth';
import { pool } from '@/lib/db';
import { User } from '@/types/types';
import { cookies } from 'next/headers';

export async function GET(
	req: Request,
	{ params }: { params: { bonus: number } }
) {
	try {
		const param = await params;
		const bonus = param.bonus;
		const cookieStore = await cookies();
		const token = cookieStore.get('token');
		if (!token) {
			return Response.json({ error: 'Token not provided' }, { status: 401 });
		}
		const decryptedUserId = getUserFromToken(token?.value);
		
		if (!bonus) {
			return Response.json(
				{ error: 'You have to provide an amount to hack!' },
				{ status: 404 }
			);
		}

		if (isNaN(bonus)) {
			return Response.json(
				{ error: 'Bonus must be a number!' },
				{ status: 400 }
			);
		}

		const { rows: user } = await pool.query<User>(
			'SELECT * FROM users WHERE id = $1',
			[decryptedUserId]
		);
		const amount = +bonus + +user[0].balance;

		await pool.query<User>('UPDATE users SET balance=$1 WHERE id = $2', [
			amount,
			user[0].id,
		]);
		return Response.json({ message: 'User balance hacked!' }, { status: 200 });
	} catch (error) {
		console.error('Błąd:', error);
		return Response.json({ error: 'Internal server error' }, { status: 500 });
	}
}
