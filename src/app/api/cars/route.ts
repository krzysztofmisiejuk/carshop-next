import { generateCarId } from '@/lib/generateCustomId'
import { createCar, getCarByModel, getCars } from '@/lib/prismaActions'
import { NewCar } from '@/types/types'
import { revalidatePath } from 'next/cache'

export async function GET() {
	try {
		const cars = await getCars()
		if (!cars) {
			return Response.json({ error: 'Cars not found' }, { status: 404 })
		}
		return Response.json({ data: cars }, { status: 200 })
	} catch (error) {
		console.error('Error GET cars:', error)
		return Response.json({ error: 'Internal server error' }, { status: 500 })
	}
}

export async function POST(req: Request) {
	try {
		const newCar: NewCar = await req.json()
		const isCarExist = await getCarByModel(newCar.model)
		const newCarId = await generateCarId()

		if (!newCar.model || !newCar.price) {
			return Response.json(
				{ message: 'Model and price are required' },
				{ status: 400 }
			)
		}

		if (isCarExist) {
			return Response.json({ error: 'Car already exists' }, { status: 409 })
		}
		revalidatePath("/cars")
		await createCar(newCarId, newCar.model, +newCar.price)
		return Response.json(
			{ message: `Added new car! - ${newCarId}` },
			{ status: 201 }
		)
	} catch (error) {
		console.error('Error POST cars:', error)
		return Response.json({ error: 'Internal server error' }, { status: 500 })
	}
}
