'use client'
import { createContext, useState } from 'react'
import { MessageContextType, MessageObject } from '../types/types'

export const MessageContext = createContext<MessageContextType>([
	{ text: '', type: 'info' },
	() => {},
])

export function MessageProvider({ children }: { children: React.ReactNode }) {
	const [message, setMessage] = useState<MessageObject>({
		text: '',
		type: 'info',
	})

	return (
		<MessageContext.Provider value={[message, setMessage]}>
			{children}
		</MessageContext.Provider>
	)
}
