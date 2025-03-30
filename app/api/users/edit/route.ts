import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { getUserFromToken } from '@/app/lib/auth'
import { pool } from '@/app/lib/db'
import { EditedCurrentUser, User } from '@/app/types/types'

export async function PUT(req: Request) {
	try {
		const cookieStore = await cookies()
		const token = cookieStore.get('token')
		if (!token) {
			return Response.json({ error: 'Token not provided' }, { status: 401 })
		}
		const decryptedUserId = getUserFromToken(token?.value)
		const editedData: EditedCurrentUser = await req.json()
		const { rows: users } = await pool.query<User>('SELECT * FROM public.users')
		const isUserExist = users.find((user) => user.id === decryptedUserId)
		if (!isUserExist) {
			return Response.json({ error: 'User not found' }, { status: 404 })
		}
		await pool.query<User>(
			'UPDATE public.users SET username = $1, password = $2 WHERE id = $3',
			[editedData.username, editedData.password, decryptedUserId]
		)
		revalidatePath('/profile')
		revalidatePath('/')
		return Response.json(
			{ message: 'User edited succesfully' },
			{ status: 200 }
		)
	} catch (error) {
		console.error(error)
		return Response.json({ error: 'Internal server error' }, { status: 500 })
	}
}
