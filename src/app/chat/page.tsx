'use client'
import { PageHeader } from '@/components'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { getCompletion } from '@/server-action/getCompletion'

interface Message {
	role: 'user' | 'assistant'
	content: string
}

export default function Chat() {
	const [messages, setMessages] = useState<Message[]>([])
	const [message, setMessage] = useState<string>('')
	// const chatId = useRef<number | null>(null)

	async function onClick() {
		// v1
		const completions = await getCompletion([
			...messages,
			{ role: 'user', content: message },
		])

		// const completions = await getCompletion(chatId.current, [
		// 	...messages,
		// 	{ role: 'user', content: message },
		// ])
		// chatId.current = completions.id
		setMessage('')
		setMessages(completions.messages)
	}

	return (
		<div className='flex flex-col items-center w-full flex-1 '>
			<PageHeader headerContent='Porozmawiaj z naszym wirtualnym sprzedawcą' />
			<div className='flex flex-col items-center w-full max-w-[1920px]  flex-1 border-t-2 '>
				<div className='flex flex-col w-full border-b-2 overflow-y-auto max-h-[calc(100vh-350px)] px-4'>
					{messages.map((msg, i) => (
						<div
							key={i}
							className={`my-2.5 flex flex-col  ${
								msg.role === 'user' ? 'items-end' : 'items-start'
							}`}
						>
							<div
								className={`${
									msg.role === 'user'
										? 'bg-custom-light-blue text-black'
										: 'bg-custom-dark-gray text-white'
								} rounded-md py-2 px-8`}
							>
								{msg.content}
							</div>
						</div>
					))}
				</div>
				<div className='flex  mx-auto py-5 w-full max-w-[1920px] h-1/4 shrink-0 '>
					<Input
						className='flex-1 '
						id='new_message'
						placeholder='Zadaj nam pytanie...'
						value={message}
						onChange={(e) => setMessage(e.currentTarget.value)}
						onKeyUp={(e) => {
							if (e.key === 'Enter') onClick()
						}}
					/>
					<Button
						onClick={onClick}
						className='ml-3 text-base bg-custom-dark-gray'
					>
						Wyślij
					</Button>
				</div>
			</div>
		</div>
	)
}
