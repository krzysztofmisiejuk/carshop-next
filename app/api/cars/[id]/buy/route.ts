import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { BoughtCar } from '@/app/types/types'
import { getUserFromToken } from '@/app/lib/auth'
import { buyCar, getCarById, getUserById } from '@/app/lib/prismaActions'

export async function PUT(req: Request) {
	try {
		const bougthCar: BoughtCar = await req.json()
		const cookieStore = await cookies()
		const token = cookieStore.get('token')

		if (!token) {
			return Response.json({ error: 'Token not provided' }, { status: 401 })
		}

		const decryptedUserId = getUserFromToken(token?.value)

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

		if (!car) {
			return Response.json({ error: 'Car not found' }, { status: 404 })
		}

		if (car[0].ownerId === decryptedUserId) {
			return Response.json(
				{ error: 'The car already is your property!' },
				{ status: 400 }
			)
		}

		if (car[0].ownerId !== null) {
			return Response.json(
				{ error: 'The car already has an owner!' },
				{ status: 400 }
			)
		}

		if (+car[0].price > +owner[0].balance) {
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
