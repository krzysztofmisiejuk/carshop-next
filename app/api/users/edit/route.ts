import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { getUserFromToken } from '@/app/lib/auth'
import { EditedCurrentUser } from '@/app/types/types'
import { editUser, getUserById } from '@/app/lib/prismaActions'

export async function PUT(req: Request) {
	try {
		const editedUser: EditedCurrentUser = await req.json()
		const cookieStore = await cookies()
		const token = cookieStore.get('token')

		if (!token) {
			return Response.json({ error: 'Token not provided' }, { status: 401 })
		}
		const decryptedUserId = getUserFromToken(token?.value)

		if (!decryptedUserId) {
			return Response.json({ error: 'User is not logged in' }, { status: 401 })
		}

		const isUserExist = await getUserById(decryptedUserId)

		if (!isUserExist) {
			return Response.json({ error: 'User not found' }, { status: 404 })
		}

		await editUser(decryptedUserId, editedUser.username, editedUser.password)
		revalidatePath('/profile')
		revalidatePath('/')
		return Response.json(
			{ message: `User: ${decryptedUserId} edited succesfully` },
			{ status: 200 }
		)
	} catch (error) {
		console.error('Error: ', error)
		return Response.json({ error: 'Internal server error' }, { status: 500 })
	}
}
