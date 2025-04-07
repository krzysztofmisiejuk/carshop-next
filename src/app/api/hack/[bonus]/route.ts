import { authOptions } from '@/lib/auth'
import { getUserById, hackUser } from '@/lib/prismaActions'
import { getServerSession } from 'next-auth'
import { revalidatePath } from 'next/cache'

export async function GET(
	req: Request,
	{ params }: { params: Promise<{ bonus: number }> }
) {
	try {
		const { bonus } = await params
		const session = await getServerSession(authOptions)
		if (!session) {
			return Response.json({ error: 'Session do not exist' }, { status: 401 })
		}
		const decryptedUserId = session?.user?.id

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

		revalidatePath('/')
		revalidatePath('/profile')

		return Response.json(
			{ message: `${decryptedUserId} balance hacked!` },
			{ status: 200 }
		)
	} catch (error) {
		console.error('Error HACK:', error)
		return Response.json({ error: 'Internal server error' }, { status: 500 })
	}
}
