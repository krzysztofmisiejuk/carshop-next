import { cookies } from 'next/headers'
import { getUserFromToken } from '@/app/lib/auth'
import { getUserById, hackUser } from '@/app/lib/prismaActions'

export async function GET(
	req: Request,
	{ params }: { params: Promise<{ bonus: number }> }
) {
	try {
		const { bonus } = await params
		const cookieStore = await cookies()
		const token = cookieStore.get('token')
		if (!token) {
			return Response.json({ error: 'Token not provided' }, { status: 401 })
		}
		const decryptedUserId = getUserFromToken(token?.value)

		if (!decryptedUserId) {
			return Response.json({ error: 'User is not logged in' }, { status: 401 })
		}

		if (!bonus) {
			return Response.json(
				{ error: 'You have to provide an amount to hack!' },
				{ status: 404 }
			)
		}

		const user = await getUserById(decryptedUserId)

		if (!user) {
			return Response.json({ error: 'User not found' }, { status: 404 })
		}

		const hackedBalance = +bonus + user[0].balance
		await hackUser(decryptedUserId, hackedBalance)

		return Response.json(
			{ message: `${decryptedUserId} balance hacked!` },
			{ status: 200 }
		)
	} catch (error) {
		console.error('Error HACK:', error)
		return Response.json({ error: 'Internal server error' }, { status: 500 })
	}
}
