import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { generateToken, getUserFromToken } from '@/app/lib/auth'
import { NewUser } from '@/app/types/types'
import { getUserById, getUserByUsername } from '@/app/lib/prismaActions'

export async function GET() {
	try {
		const cookieStore = await cookies()
		const token = cookieStore.get('token')
		if (!token) {
			return Response.json({ error: 'Token not provided' }, { status: 401 })
		}
		const decryptedUserId = getUserFromToken(token?.value)

		const user = decryptedUserId ? await getUserById(decryptedUserId) : null

		if (!user) {
			return Response.json({ error: 'Your are not logged in' }, { status: 401 })
		}

		const loggedUser = {
			username: user[0].username,
			role: user[0].role,
			balance: user[0].balance,
		}
		return Response.json({ data: loggedUser }, { status: 200 })
	} catch (error) {
		console.error('Error GET: ', error)
		return Response.json({ error: 'Internal server error' }, { status: 500 })
	}
}

export async function POST(req: Request) {
	try {
		const loginData: NewUser = await req.json()
		const user = loginData ? await getUserByUsername(loginData.username) : null

		if (!user) {
			return Response.json(
				{ error: 'The entered username was not found' },
				{ status: 404 }
			)
		}

		if (user.password !== loginData.password) {
			return Response.json(
				{ error: 'The entered password is incorrect' },
				{ status: 401 }
			)
		}

		const token = generateToken(JSON.stringify(user.id))
		if (!token) {
			return Response.json(
				{ error: 'Error generating token', data: user },
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
			{ message: 'Login successfully!', data: user },
			{ status: 200 }
		)
	} catch (error) {
		console.error('Error login', error)
		return Response.json({ error: 'Internal server error' }, { status: 500 })
	}
}
