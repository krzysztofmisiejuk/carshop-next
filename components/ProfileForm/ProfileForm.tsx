'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Button, Form, Input, PageSubHeader } from '@/components'

export default function ProfileForm() {
	const [newUsername, setNewUsername] = useState<string>('')
	const [newPassword, setNewPassword] = useState<string>('')
	const router = useRouter()

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		try {
			const response = await fetch('http://localhost:3000/api/users/edit', {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					username: newUsername,
					password: newPassword,
				}),
				credentials: 'include',
				cache: 'no-store',
			})
			if (response.ok) {
				router.refresh()
			}
		} catch (error) {
			console.error('Error:', error)
		}
	}
	return (
		<section>
			<PageSubHeader headerContent='Edytuj swój profil' />
			<Form onSubmit={handleSubmit}>
				<Input
					id='new_username'
					placeholder='Nowy Username'
					onChange={setNewUsername}
				/>
				<Input
					id='new_password'
					placeholder='Nowy Password'
					onChange={setNewPassword}
				/>
				<Button text='Aktualizuj profil' />
			</Form>
		</section>
	)
}
