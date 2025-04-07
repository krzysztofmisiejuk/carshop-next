import { revalidatePath } from 'next/cache'
import { getServerSession } from 'next-auth'
import { EditedCurrentUser } from '@/types/types'
import { authOptions } from '@/lib/auth'
import { editUser, getUserById } from '@/lib/prismaActions'


export async function PUT(req: Request) {
	try {
		const editedUser: EditedCurrentUser = await req.json()
		const session = await getServerSession(authOptions)

		if (!session) {
			return Response.json({ error: 'Session is not exist' }, { status: 401 })
		}
		const decryptedUserId = session?.user?.id

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
