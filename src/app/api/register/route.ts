import { generateUserId } from '@/lib/generateCustomId'
import { createUser, getUsers } from '@/lib/prismaActions'
import { NewUser } from '@/types/types'

export async function POST(req: Request) {
	try {
		const users = await getUsers()
		const newUser: NewUser = await req.json()
		const newId = await generateUserId()
		const isUserExist = users.find((user) => user.username === newUser.username)

		if (!newUser.password || !newUser.username) {
			return Response.json(
				{ message: 'Username and password are required' },
				{ status: 400 }
			)
		}

		if (isUserExist) {
			return Response.json({ error: 'User already exists' }, { status: 409 })
		}

		await createUser(newId, newUser.password, 'user', newUser.username)
		return Response.json(
			{ message: `The registration was successfully - ${newId}` },
			{ status: 201 }
		)
	} catch (error) {
		console.error('Error register: ', error)
		return Response.json({ error: 'Internal server error' }, { status: 500 })
	}
}
