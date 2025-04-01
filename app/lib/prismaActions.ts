import { prisma } from './db'

export async function getUsers() {
	return await prisma.user.findMany()
}
export async function getCars() {
	return await prisma.car.findMany()
}

export async function createUser(
	newId: string,
	newUsername: string,
	newPassword: string
) {
	return await prisma.user.create({
		data: {
			id: newId,
			username: newUsername,
			password: newPassword,
			balance: 5000,
		},
	})
}

export async function createCar(
	newId: string,
	newModel: string,
	newPrice: number,
	newOwner?: string
) {
	return await prisma.car.create({
		data: {
			id: newId,
			model: newModel,
			price: newPrice,
			ownerId: newOwner,
		},
	})
}

export async function getUserById(userId: string) {
	return await prisma.user.findMany({
		where: { id: userId },
	})
}
export async function getCarById(carId: string) {
	return await prisma.car.findMany({
		where: { id: carId },
	})
}

export async function getUserByUsername(usernameToFind: string) {
	return await prisma.user.findUnique({
		where: { username: usernameToFind },
	})
}
export async function getCarByModel(modelToFind: string) {
	return await prisma.car.findUnique({
		where: { model: modelToFind },
	})
}

export async function deleteUser(userId: string) {
	return await prisma.user.delete({ where: { id: userId } })
}

export async function deleteCar(carId: string) {
	return await prisma.car.delete({ where: { id: carId } })
}

export async function editUser(
	userId: string,
	editedUsername: string,
	editedPassword: string,
	editedRole?: 'user' | 'admin',
	newBalance?: number
) {
	return await prisma.user.update({
		data: {
			username: editedUsername,
			password: editedPassword,
			role: editedRole,
			balance: newBalance,
		},
		where: { id: userId },
	})
}

export async function buyCar(
	newBalance: number,
	userId: string,
	carId: string
) {
	await prisma.user.update({
		data: { balance: newBalance },
		where: { id: userId },
	})
	await prisma.car.update({
		data: { ownerId: userId },
		where: { id: carId },
	})
}

export async function hackUser(userId: string, hackedBalance: number) {
	return await prisma.user.update({
		data: { balance: hackedBalance },
		where: { id: userId },
	})
}
