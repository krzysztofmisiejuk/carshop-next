import { pool } from '@/app/lib/db'
import { Car, NewCar } from '@/app/types/types'

import { revalidatePath } from 'next/cache'

export async function GET() {
	try {
		const result = await pool.query<Car>('SELECT * FROM cars')
		if (!result) {
			return Response.json({ error: 'Cars not found' }, { status: 404 })
		}
		revalidatePath('/cars')
		return Response.json({ data: result.rows }, { status: 200 })
	} catch (error) {
		console.error('Can not get cars:', error)
		return Response.json({ error: 'Internal server error' }, { status: 500 })
	}
}

export async function POST(req: Request) {
	try {
		const { rows: cars } = await pool.query<Car>('SELECT * FROM cars')
		const newCar: NewCar = await req.json()
		const isCarExist = cars.find((car) => car.model === newCar.model)

		if (!newCar.model || !newCar.price) {
			return Response.json(
				{ message: 'model and price are required' },
				{ status: 400 }
			)
		}

		if (isCarExist) {
			return Response.json({ error: 'Car already exists' }, { status: 409 })
		}
		await pool.query<Car>('INSERT INTO cars (model, price) VALUES($1, $2)', [
			newCar.model,
			newCar.price,
		])
		return Response.json({ message: 'Added new car!' }, { status: 201 })
	} catch (error) {
		console.error('Can not send cars:', error)
		return Response.json({ error: 'Internal server error' }, { status: 500 })
	}
}
