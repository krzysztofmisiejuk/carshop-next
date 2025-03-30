import { pool } from '@/app/lib/db'
import { NewUser, User } from '@/app/types/types'

export async function POST(req: Request) {
	try {
		const { rows: users } = await pool.query<User>('SELECT * FROM public.users')
		const newUser: NewUser = await req.json()
		const isUserExist = users.find((user) => user.username === newUser.username)
		if (!newUser.password || !newUser.username) {
			return Response.json(
				{ message: 'username and password are required' },
				{ status: 400 }
			)
		}

		if (isUserExist) {
			return Response.json({ error: 'User already exists' }, { status: 409 })
		}
		await pool.query(
			'INSERT INTO public.users (username, password, role, balance) VALUES ($1, $2, $3, $4)',
			[newUser.username, newUser.password, 'user', 2000]
		)
		return Response.json(
			{ message: 'The registration was successfully' },
			{ status: 201 }
		)
	} catch (error) {
		console.error('Błąd:', error)
		return Response.json({ error: 'Internal server error' }, { status: 500 })
	}
}
