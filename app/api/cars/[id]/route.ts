import { pool } from '@/app/lib/db'
import { Car } from '@/app/types/types'


export async function GET(
	req: Request,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		const { id } = await params
		const formattedId = `${id.padStart(3, '0')}`
		const result = await pool.query<Car>('SELECT * FROM cars WHERE id = $1', [
			formattedId,
		])
		if (result.rows.length < 1) {
			return Response.json({ error: 'Car not found' }, { status: 404 })
		}
		return Response.json({ data: result.rows }, { status: 200 })
	} catch (error) {
		console.error('Błąd:', error)
		return Response.json({ error }, { status: 500 })
	}
}

export async function DELETE(
	req: Request,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		const { id } = await params
		const formattedId = `${id.padStart(3, '0')}`
		const { rows: cars } = await pool.query<Car>(
			'SELECT * FROM cars WHERE id = $1',
			[formattedId]
		)
		if (cars.length === 0) {
			return Response.json({ error: 'Car not found' }, { status: 404 })
		}

		await pool.query<Car>('DELETE FROM cars WHERE id = $1', [formattedId])
		return Response.json({ data: 'delete succesfully' }, { status: 200 })
	} catch (error) {
		console.error('Błąd DELETE:', error)
		return Response.json({ error: 'Internal server error' }, { status: 500 })
	}
}
