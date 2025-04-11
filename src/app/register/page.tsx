'use client'
import { useContext, useState } from 'react'
import { useRouter } from 'next/navigation'
import { MessageContext } from '../../contexts/MessageContext'
import { CustomButton, Form, CustomInput, PageHeader } from '@/components'

export default function Register() {
	const [username, setUsername] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [, setMessage] = useContext(MessageContext)
	const router = useRouter()

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault()
		try {
			const response = await fetch('http://localhost:3000/api/register', {
				method: 'POST',
				headers: { 'Content-type': 'application/json' },
				body: JSON.stringify({ username, email, password }),
			})
			const data = await response.json()
			if (response.ok) {
				router.push('/login')
				setMessage({ text: data.message, type: 'success' })
			} else {
				setMessage({ text: data.error, type: 'error' })
			}
		} catch (error) {
			console.error('Błąd:', error)
		}
	}

	return (
		<>
			<PageHeader headerContent='Rejestracja' />
			<Form onSubmit={handleSubmit}>
				<CustomInput
					id='register_username'
					placeholder='Username'
					onChange={setUsername}
				/>
				<CustomInput
					id='register_email'
					placeholder='Email'
					onChange={setEmail}
				/>
				<CustomInput
					id='register_password'
					type='password'
					placeholder='Password'
					onChange={setPassword}
				/>
				<CustomButton text='Zarejestruj' />
			</Form>
		</>
	)
}
