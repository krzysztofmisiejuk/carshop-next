// import { Chat, ChatWithMessages, Message } from '@/types/types'
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
	newEmail: string,
	newPassword: string,
	newRole: 'admin' | 'user' = 'user'
) {
	return await prisma.user.create({
		data: {
			id: newId,
			username: newUsername,
			email: newEmail,
			password: newPassword,
			role: newRole,
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
	editedEmail?: string,
	editedRole?: 'user' | 'admin',
	newBalance?: number
) {
	return await prisma.user.update({
		data: {
			username: editedUsername,
			password: editedPassword,
			email: editedEmail,
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

// export async function createChat(
// 	userEmail: string,
// 	name: string,
// 	msgs: Message[]
//   ) {
// 	const chat = await prisma.chat.create({
// 	  data: {
// 		userEmail,
// 		name,
// 		messages: {
// 		  create: msgs.map((msg) => ({
// 			role: msg.role,
// 			content: msg.content,
// 		  })),
// 		},
// 	  },
// 	});

// 	return chat.id;
//   }

//   export async function getChats(userEmail: string): Promise<Chat[]> {
// 	const chats = await prisma.chat.findMany({
// 	  where: { userEmail },
// 	});
// 	return chats;
//   }

//   export async function getChat(
// 	chatId: number
//   ): Promise<ChatWithMessages | null> {
// 	const chat = await prisma.chat.findUnique({
// 	  where: { id: chatId },
// 	  include: { messages: true },
// 	});

// 	return chat as ChatWithMessages;
//   }

//   export async function getChatsWithMessages(
// 	userEmail: string
//   ): Promise<ChatWithMessages[]> {
// 	const chatsWithMessages = await prisma.chat.findMany({
// 	  where: { userEmail },
// 	  include: { messages: true },
// 	  orderBy: { timestamp: "desc" },
// 	  take: 3,
// 	});

// 	return chatsWithMessages as ChatWithMessages[];
//   }

//   export async function getMessages(chatId: number): Promise<Message[]> {
// 	const messages = await prisma.message.findMany({
// 	  where: { chatId },
// 	});

// 	return messages as Message[];
//   }

//   export async function updateChat(
// 	chatId: number,
// 	msgs: { role: string; content: string }[]
//   ) {
// 	await prisma.message.deleteMany({ where: { chatId } });

// 	await prisma.message.createMany({
// 	  data: msgs.map((msg) => ({
// 		chatId,
// 		role: msg.role,
// 		content: msg.content,
// 	  })),
// 	});
//   }
