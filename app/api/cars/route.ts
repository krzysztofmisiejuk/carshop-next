import { pool } from '@/lib/db';
import { Car, newCar } from '@/types/types';

export async function GET() {
	try {
		const result = await pool.query<Car>('SELECT * FROM cars');
		return Response.json({ data: result.rows }, { status: 200 });
	} catch (error) {
		console.error('Błąd:', error);
		return Response.json({ error: 'Internal server error' }, { status: 500 });
	}
}

export async function POST(req: Request) {
	try {
		const { rows: cars } = await pool.query<Car>('SELECT * FROM cars');
		const newCar: newCar = await req.json();
		const isCarExist = cars.find((car) => car.model === newCar.model);
		if (!newCar.model || !newCar.price) {
			return Response.json(
				{ message: 'model and price are required' },
				{ status: 400 }
			);
		}

		if (isCarExist) {
			return Response.json({ error: 'Car already exists' }, { status: 409 });
		}
		await pool.query<Car>('INSERT INTO cars (model, price) VALUES($1, $2)', [
			newCar.model,
			newCar.price,
		]);
		return Response.json({ message: 'Added new car!' }, { status: 201 });
	} catch (error) {
		console.error('Błąd:', error);
		return Response.json({ error: 'Internal server error' }, { status: 500 });
	}
}
