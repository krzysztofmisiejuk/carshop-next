import { Car, User } from '../types/types'

export async function getCars(): Promise<{ data: Car[] } | undefined> {
	try {
		const response = await fetch('http://localhost:3000/api/cars', {
			cache: 'no-store',
		})

		if (!response.ok) {
			throw new Error('Error downloading cars data')
		}

		const data = await response.json()

		if (!data || !data.data) {
			throw new Error('Data not found')
		}

		return data
	} catch (error) {
		console.error('Error fetch cars:', error)
	}
}

export async function getUsers(): Promise<{ data: User[] } | undefined> {
	try {
		const response = await fetch('http://localhost:3000/api/users', {
			credentials: 'include',
			cache: 'no-store',
		})

		if (!response.ok) {
			throw new Error('Error downloading users data')
		}

		const data = await response.json()

		if (!data || !data.data) {
			throw new Error('Data not found')
		}

		return data
	} catch (error) {
		console.error('Error fetch users:', error)
	}
}
