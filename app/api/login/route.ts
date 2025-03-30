import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { generateToken, getUserFromToken } from '@/app/lib/auth'
import { pool } from '@/app/lib/db'
import { NewUser, User } from '@/app/types/types'

export async function GET() {
	try {
		const cookieStore = await cookies()
		const token = cookieStore.get('token')
		if (!token) {
			return Response.json({ error: 'Token not provided' }, { status: 401 })
		}
		const decryptedUserId = getUserFromToken(token?.value)

		const { rows: user } = await pool.query<User>(
			'SELECT * FROM public.users WHERE id = $1',
			[decryptedUserId]
		)
		if (user.length < 1) {
			return Response.json({ error: 'Not logged in' }, { status: 401 })
		}
		const loggedUser = {
			username: user[0].username,
			role: user[0].role,
			balance: user[0].balance,
		}
		return Response.json({ data: loggedUser }, { status: 200 })
	} catch (error) {
		console.error(error, 'Błąd pobierania profilu')
		return Response.json({ error: 'Internal server error' }, { status: 500 })
	}
}

export async function POST(req: Request) {
	try {
		const loginData: NewUser = await req.json()
		const { rows: user } = await pool.query<User>(
			'SELECT * FROM users WHERE username = $1',
			[loginData.username]
		)

		if (user.length < 1) {
			return Response.json(
				{ error: 'The entered username was not found' },
				{ status: 404 }
			)
		}

		if (user[0].password !== loginData.password) {
			return Response.json(
				{ error: 'The entered password is incorrect' },
				{ status: 401 }
			)
		}

		const token = generateToken(JSON.stringify(user[0].id))
		if (!token) {
			return Response.json(
				{ error: 'Error generating token', data: user[0] },
				{ status: 500 }
			)
		}

		const cookieStore = await cookies()
		cookieStore.set('token', token, {
			httpOnly: true,
			maxAge: 3600,
			path: '/',
			sameSite: 'lax',
		})

		revalidatePath('/')
		return Response.json(
			{ message: 'Login successfully!', data: user[0] },
			{ status: 200 }
		)
	} catch (error) {
		console.error(error, 'Błąd logowania')
		return Response.json({ error: 'Internal server error' }, { status: 500 })
	}
}
