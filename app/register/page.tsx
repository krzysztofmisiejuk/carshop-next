'use client'
import { Button, Form, Input, PageHeader } from '@/components'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Register() {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const router = useRouter()

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault()
		try {
			const response = await fetch('http://localhost:3000/api/register', {
				method: 'POST',
				headers: { 'Content-type': 'application/json' },
				body: JSON.stringify({ username, password }),
			})
			if (response.ok) {
				router.push('/login')
			}
		} catch (error) {
			console.error('Błąd:', error)
		}
	}

	return (
		<>
			<PageHeader headerContent='Rejestracja' />
			<Form onSubmit={handleSubmit}>
				<Input
					id='register_username'
					placeholder='Username'
					onChange={setUsername}
				/>
				<Input
					id='register_password'
					type='password'
					placeholder='Password'
					onChange={setPassword}
				/>
				<Button text='Zarejestruj' />
			</Form>
		</>
	)
}
