import { deleteCar, getCarById } from "@/lib/prismaActions"

export async function GET(
	req: Request,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		const { id } = await params
		const formattedId = `car${id.padStart(3, '0')}`
		const car = await getCarById(formattedId)
		if (car.length === 0) {
			return Response.json({ error: 'Car not found' }, { status: 404 })
		}
		return Response.json({ data: car }, { status: 200 })
	} catch (error) {
		console.error('Error:', error)
		return Response.json({ error }, { status: 500 })
	}
}

export async function DELETE(
	req: Request,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		const { id } = await params
		const formattedId = `car${id.padStart(3, '0')}`
		const car = await getCarById(formattedId)
		if (!car) {
			return Response.json({ error: 'Car not found' }, { status: 404 })
		}

		await deleteCar(formattedId)
		return Response.json(
			{ data: `Delete succesfully = ${formattedId}` },
			{ status: 200 }
		)
	} catch (error) {
		console.error('Error DELETE:', error)
		return Response.json({ error: 'Internal server error' }, { status: 500 })
	}
}
