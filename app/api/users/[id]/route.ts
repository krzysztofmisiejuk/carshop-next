import {  deleteUser, getUserById } from '@/app/lib/prismaActions'

export async function GET(
	req: Request,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		const { id } = await params
		const formattedId = `user${id.padStart(3, '0')}`
		const user = await getUserById(formattedId)
		console.log(formattedId);
		console.log('user/[id]', user)

		if (!user) {
			return Response.json({ error: 'User not found' }, { status: 404 })
		}

		return Response.json({ data: user }, { status: 200 })
	} catch (error) {
		console.error('Error GET :', error)
		return Response.json({ error }, { status: 500 })
	}
}

export async function DELETE(
	req: Request,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		const { id } = await params
		const formattedId = `user${id.padStart(3, '0')}`
		const car = await getUserById(formattedId)

		if (!car) {
			return Response.json({ error: 'User not found' }, { status: 404 })
		}

		await deleteUser(formattedId)
		return Response.json({ message: 'Delete succesfully' }, { status: 200 })
	} catch (error) {
		console.error('Error DELETE:', error)
		return Response.json({ error: 'Internal server error' }, { status: 500 })
	}
}
