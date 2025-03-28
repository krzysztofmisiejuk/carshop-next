import { pool } from '@/lib/db';
import { EditedUser, User } from '@/types/types';

export async function PUT(
	req: Request,
	{ params }: { params: { id: string } }
) {
	try {
		const param = await params;
		const formmattedId = `${param.id.padStart(3, '0')}`;
		const editedUser: EditedUser = await req.json();
		const { rows: users } = await pool.query<User>(
			'SELECT * FROM public.users'
		);
		const isUserExist = users.find((user) => user.id === formmattedId);

		if (!isUserExist) {
			return Response.json({ error: 'User not found' }, { status: 404 });
		}

		await pool.query(
			'UPDATE public.users SET username = $1, password = $2, role = $3, balance = $4 WHERE id = $5',
			[
				editedUser.username,
				editedUser.password,
				editedUser.role,
				editedUser.balance,
				formmattedId,
			]
		);
		return Response.json(
			{ message: 'User edited succesfully' },
			{ status: 200 }
		);
	} catch (error) {
		console.error('Błąd DELETE:', error);
		return Response.json({ error: 'Internal server error' }, { status: 500 });
	}
}
