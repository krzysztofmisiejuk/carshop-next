import { revalidatePath } from 'next/cache'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { BoughtCar } from '@/types/types'
import { buyCar, getCarById, getUserById } from '@/lib/prismaActions'


export async function PUT(req: Request) {
	try {
		const bougthCar: BoughtCar = await req.json()
		const session = await getServerSession(authOptions)
		if (!session) {
			return Response.json({ error: 'Session do not exist' }, { status: 401 })
		}

		const decryptedUserId = session?.user?.id
		if (!decryptedUserId) {
			return Response.json({ error: 'User is not logged in' }, { status: 401 })
		}

		if (!bougthCar.carId) {
			return Response.json({ error: 'CarId is required' }, { status: 400 })
		}

		const owner = await getUserById(decryptedUserId)

		if (!owner) {
			return Response.json({ error: 'Car owner not found' }, { status: 404 })
		}
		const car = await getCarById(bougthCar.carId)

		if (!car[0]) {
			return Response.json({ error: 'Car not found' }, { status: 404 })
		}

		if (car[0]?.ownerId === decryptedUserId) {
			return Response.json(
				{ error: 'The car already is your property!' },
				{ status: 400 }
			)
		}

		if (car[0]?.ownerId !== null) {
			return Response.json(
				{ error: 'The car already has an owner!' },
				{ status: 400 }
			)
		}

		if (+car[0]?.price > +owner[0]?.balance) {
			return Response.json(
				{ error: 'You do not have enough money!' },
				{ status: 400 }
			)
		}

		const newBalance = +owner[0].balance - +car[0].price

		await buyCar(newBalance, owner[0].id, car[0].id)
		revalidatePath('/')
		revalidatePath('/profile')
		revalidatePath('/cars')

		return Response.json(
			{ message: `Purchase successfully, ${owner[0].id} bought ${car[0].id}!` },
			{ status: 200 }
		)
	} catch (error) {
		console.error('Error:', error)
		return Response.json({ error }, { status: 500 })
	}
}
