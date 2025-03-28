import { pool } from '@/lib/db'
import { Car } from '@/types/types'
import { NextRequest } from 'next/server'

export async function GET(
	req: NextRequest,
	{ params }: { params: Promise<string> }
) {
	try {
		if (params?.id) {
			return Response.json({ error: 'ID is required' }, { status: 400 })
		}

		const id = await `car${params?.id.padStart(3, '0')}`
		const result = await pool.query<Car>('SELECT * FROM cars WHERE id = $1', [
			id,
		])

		if (result.rows.length === 0) {
			return Response.json({ error: 'Car not found' }, { status: 404 })
		}

		return Response.json(result.rows[0], { status: 200 })
	} catch (error) {
		console.error('Error fetching car:', error)
		return Response.json({ error: 'Internal server error' }, { status: 500 })
	}
}

export async function DELETE(
	req: NextRequest,
	{ params }: { params: Promise<string> }
) {
	try {
		if (!params?.id) {
			return Response.json({ error: 'ID is required' }, { status: 400 })
		}

		const formattedId = await `car${params.id.padStart(3, '0')}`
		const { rows: cars } = await pool.query<Car>(
			'SELECT * FROM cars WHERE id = $1',
			[formattedId]
		)

		if (cars.length === 0) {
			return Response.json({ error: 'Car not found' }, { status: 404 })
		}

		await pool.query('DELETE FROM cars WHERE id = $1', [formattedId])
		return Response.json(
			{ message: 'Car deleted successfully' },
			{ status: 200 }
		)
	} catch (error) {
		console.error('Error deleting car:', error)
		return Response.json({ error: 'Internal server error' }, { status: 500 })
	}
}
