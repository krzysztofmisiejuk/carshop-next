import { error } from 'console'
import { Car, User } from '../types/types'

export async function getUserData(token: string) {
	const response = await fetch('http://localhost:3000/api/login', {
		cache: 'no-store',
		credentials: 'include',
		headers: {
			Cookie: `token=${token}`,
		},
	})
	return response.ok ? await response.json() : null
}

export async function getCars(): Promise<{ data: Car[] } | undefined> {
	try {
		const response = await fetch('http://localhost:3000/api/cars', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
			cache: 'no-store',
		})

		if (!response.ok) {
			console.error('Błąd podczas pobierania samochodów:', error)
			throw new Error('Błąd podczas pobierania samochodów')
		}

		const data = await response.json()

		if (!data || !data.data) {
			throw new Error('Nie znaleziono danych')
		}

		return data
	} catch (error) {
		console.error(' error fetchu:', error)
	}
}

export async function getUsers(): Promise<{ data: User[] } | undefined> {
	try {
		const response = await fetch('http://localhost:3000/api/users', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
			cache: 'no-store',
		})

		if (!response.ok) {
			console.error('Błąd podczas pobierania użytkowników:', error)
			throw new Error('Błąd podczas pobierania użytkowników')
		}

		const data = await response.json()

		if (!data || !data.data) {
			throw new Error('Nie znaleziono danych')
		}

		return data
	} catch (error) {
		console.error(' error fetchu:', error)
	}
}
