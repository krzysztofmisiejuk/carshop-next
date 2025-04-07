'use server'
// import { authOptions } from '@/lib/auth';
// import { createChat, updateChat } from '@/lib/prismaActions';
// import { getServerSession } from 'next-auth';
import OpenAI from 'openai'
// import { getServerSession } from "next-auth";
// import { createChat, updateChat } from "@/db";

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
})

// // v1
export async function getCompletion(
	messageHistory: {
		role: 'user' | 'assistant'
		content: string
	}[]
) {
	const initialPrompt = {
		role: 'system' as const,
		content:
			'Pracujesz w sklepie, w którym sprzedaje samchody, jesteś doradcą klienta i pomagasz klientom w wyborze odpowiedniego dla nich samochodu. ',
	}

	const response = await openai.chat.completions.create({
		model: 'gpt-3.5-turbo',
		messages: [initialPrompt, ...messageHistory],
	})

	const messages = [
		...messageHistory,
		response.choices[0].message as unknown as {
			role: 'user' | 'assistant'
			content: string
		},
	]

	return { messages }
}

// v2 with prisma

// export async function getCompletion(
//   id: number | null,
//   messageHistory: {
//     role: "user" | "assistant";
//     content: string;
//   }[]
// ) {
//   const response = await openai.chat.completions.create({
//     model: "gpt-3.5-turbo",
//     messages: messageHistory,
//   });

//   const messages = [
//     ...messageHistory,
//     response.choices[0].message as unknown as {
//       role: "user" | "assistant";
//       content: string;
//     },
//   ];

//   const session = await getServerSession(authOptions);

//   let chatId = id;
//   if (!chatId) {
//     chatId = await createChat(
//       session?.user?.name!,
//       messageHistory[0].content,
//       messages
//     );
//   } else {
//     await updateChat(chatId, messages);
//   }

//   return {
//     messages,
//     id: chatId,
//   };
// }
