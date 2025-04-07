import { prisma } from './db'

export async function generateUserId(): Promise<string> {
	const lastUser = await prisma.user.findFirst({
		orderBy: { id: 'desc' },
	})

	let newId = 'user001'
	if (lastUser) {
		const lastNumber = parseInt(lastUser.id.replace('user', ''), 10)
		newId = `user${String(lastNumber + 1).padStart(3, '0')}`
	}
	return newId
}

export async function generateCarId(): Promise<string> {
	const lastUser = await prisma.car.findFirst({
		orderBy: { id: 'desc' },
	})

	let newId = 'car001'
	if (lastUser) {
		const lastNumber = parseInt(lastUser.id.replace('car', ''), 10)
		newId = `car${String(lastNumber + 1).padStart(3, '0')}`
	}
	return newId
}
