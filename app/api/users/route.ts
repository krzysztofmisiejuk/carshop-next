import { getUsers } from '@/app/lib/prismaActions'

export async function GET() {
	try {
		const users = await getUsers()
		if (!users) {
			return Response.json({ error: 'Users not found' }, { status: 404 })
		}
		return Response.json({ data: users }, { status: 200 })
	} catch (error) {
		console.error('Error:', error)
		return Response.json({ error }, { status: 500 })
	}
}
