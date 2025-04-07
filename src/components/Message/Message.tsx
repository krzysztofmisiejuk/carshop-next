'use client'
import { useContext, useEffect } from 'react'
import { MessageContext } from '@/contexts/MessageContext'

export default function Message() {
	const [message, setMessage] = useContext(MessageContext)

	useEffect(() => {
		if (message.text !== '' || message.type !== 'info') {
			const returnDefaultMessage = setTimeout(() => {
				setMessage({ text: '', type: 'info' })
			}, 5000)

			return () => clearTimeout(returnDefaultMessage)
		}
	}, [message, setMessage])

	if (message.type === 'error') {
		return (
			<div className='p-2.5 w-full  text-sm rounded text-custom-dark-red bg-custom-light-red'>
				{message.text}
			</div>
		)
	} else if (message.type === 'success') {
		return (
			<div className='p-2.5 w-full  text-sm rounded text-custom-dark-green bg-custom-light-green'>
				{message.text}
			</div>
		)
	} else {
		return (
			<div className='p-2.5 w-full text-sm rounded text-transparent bg-transparent'>
				{message.text}
			</div>
		)
	}
}
