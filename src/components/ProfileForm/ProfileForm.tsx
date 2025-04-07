'use client'
import { MessageContext } from '@/contexts/MessageContext'
import { useRouter } from 'next/navigation'
import { useContext, useState } from 'react'
import { PageSubHeader } from '../PageHeader'
import Form from '../Form/Form'
import CustomInput from '../CustomInput/CustomInput'
import CustomButton from '../CustomButton/CustomButton'

export default function ProfileForm() {
	const [newUsername, setNewUsername] = useState<string>('')
	const [newPassword, setNewPassword] = useState<string>('')
	const [, setMessage] = useContext(MessageContext)
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
			const data = await response.json()
			if (response.ok) {
				setMessage({ text: data.message, type: 'success' })
				router.refresh()
				return
			}
			setMessage({ text: data.error, type: 'error' })
		} catch (error) {
			console.error('Error:', error)
		}
	}
	return (
		<section>
			<PageSubHeader headerContent='Edytuj swój profil' />
			<Form onSubmit={handleSubmit}>
				<CustomInput
					id='new_username'
					placeholder='Nowy Username'
					onChange={setNewUsername}
				/>
				<CustomInput
					id='new_password'
					placeholder='Nowy Password'
					onChange={setNewPassword}
				/>
				<CustomButton text='Aktualizuj profil' />
			</Form>
		</section>
	)
}
