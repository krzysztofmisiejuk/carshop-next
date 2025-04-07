import { editUser, getUserById } from "@/lib/prismaActions"
import { EditedUser } from "@/types/types"


export async function PUT(
	req: Request,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		const { id } = await params
		const formattedId = `${id.padStart(3, '0')}`
		const editedUser: EditedUser = await req.json()
		const user = await getUserById(formattedId)

		if (!user) {
			return Response.json({ error: 'User not found' }, { status: 404 })
		}

		await editUser(
			formattedId,
			editedUser.username,
			editedUser.password,
			editedUser.role,
			+editedUser.balance
		)

		return Response.json(
			{ message: `User ${formattedId} edited succesfully` },
			{ status: 200 }
		)
	} catch (error) {
		console.error('Error PUT:', error)
		return Response.json({ error: 'Internal server error' }, { status: 500 })
	}
}
