'use client'
import { Button, Form, Input, PageHeader } from '@/components'
import { LoginContext } from '@/contexts/LoginContext'
import { MessageContext } from '@/contexts/MessageContext'
import { useRouter } from 'next/navigation'
import { useState, useContext } from 'react'
import { Profile } from '@/types/types'

export default function Login() {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [, setMessage] = useContext(MessageContext)
	const { setLoggedUser } = useContext(LoginContext)
	const router = useRouter()

	async function handleLogin() {
		const response = await fetch('http://localhost:3000/api/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username, password }),
			credentials: 'include',
		})
		const data = await response.json()
		if (response.ok) {
			const user: Profile = {
				username: data.data.username,
				role: data.data.role,
				balance: data.data.balance,
			}
			setLoggedUser(user)
			setMessage({ text: data.message, type: 'success' })
			router.push('/')
			router.refresh()
		} else {
			setMessage({ text: data.error, type: 'error' })
		}
	}

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault()
		try {
			await handleLogin()
		} catch (error) {
			console.error('Błąd:', error)
			setMessage({ text: 'Wystąpił błąd', type: 'error' })
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
