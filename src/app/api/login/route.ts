import { createSession } from '@/lib/jwt'
import { getUserByUsername } from '@/lib/prismaActions'
import { NewUser } from '@/types/types'
import { revalidatePath } from 'next/cache'

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

		await createSession(user.id)

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
