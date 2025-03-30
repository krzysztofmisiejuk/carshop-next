import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { pool } from '@/app/lib/db'
import { BoughtCar, Car, User } from '@/app/types/types'
import { getUserFromToken } from '@/app/lib/auth'

export async function PUT(req: Request) {
	try {
		const cookieStore = await cookies()
		const token = cookieStore.get('token')
		if (!token) {
			return Response.json({ error: 'Token not provided' }, { status: 401 })
		}
		const decryptedUserId = getUserFromToken(token?.value)
		const bougthCar: BoughtCar = await req.json()

		const { rows: owner } = await pool.query<User>(
			'SELECT * FROM users WHERE id = $1',
			[decryptedUserId]
		)

		const { rows: car } = await pool.query<Car>(
			'SELECT * FROM cars WHERE id = $1',
			[bougthCar.carId]
		)

		if (!bougthCar.carId) {
			return Response.json({ error: 'carId is required' }, { status: 400 })
		}

		if (car.length === 0) {
			return Response.json({ error: 'Car not found' }, { status: 404 })
		}

		if (car[0].owner_id === decryptedUserId) {
			return Response.json(
				{ error: 'The car already is your property!' },
				{ status: 400 }
			)
		}

		if (car[0].owner_id === '') {
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

		await pool.query<User>('UPDATE users SET balance = $1 WHERE id = $2', [
			newBalance,
			owner[0].id,
		])

		await pool.query<Car>(
			'UPDATE public.cars SET owner_Id = $1  WHERE id = $2',
			[owner[0].id, bougthCar.carId]
		)
		revalidatePath('/')
		revalidatePath('/profile')

		return Response.json({ message: 'Purchase succesfully' }, { status: 200 })
	} catch (error) {
		console.error('Błąd:', error)
		return Response.json({ error }, { status: 500 })
	}
}
