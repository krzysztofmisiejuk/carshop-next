'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Button, Form, Input, PageHeader } from '@/components'

export default function Login() {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const router = useRouter()

	async function handleLogin() {
		const response = await fetch('http://localhost:3000/api/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username, password }),
			credentials: 'include',
			cache: 'no-store',
		})

		if (response.ok) {
			router.push('/')
			router.refresh()
		}
	}

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault()
		try {
			await handleLogin()
		} catch (error) {
			console.error('Błąd:', error)
		}
	}

	return (
		<>
			<PageHeader headerContent='Logowanie' />
			<Form onSubmit={handleSubmit}>
				<Input
					id='login_username'
					placeholder='Username'
					onChange={setUsername}
				/>
				<Input
					id='login_password'
					type='password'
					placeholder='Password'
					onChange={setPassword}
				/>
				<Button text='Zaloguj' />
			</Form>
		</>
	)
}
