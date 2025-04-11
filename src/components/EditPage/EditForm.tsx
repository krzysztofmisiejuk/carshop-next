'use client'
import { useContext, useState } from 'react'
import { useRouter } from 'next/navigation'
import { CustomButton, Form, CustomInput } from '../index'
import { MessageContext } from '@/contexts/MessageContext'
import { User } from '@prisma/client'

export default function EditForm({
	user,
	setIsEditMode,
}: {
	user: User
	setIsEditMode: React.Dispatch<React.SetStateAction<boolean>>
}) {
	const [newUsername, setNewUsername] = useState<string>('')
	const [newEmail, setNewEmail] = useState<string>('')
	const [newPassword, setNewPassword] = useState<string>('')
	const [newBalance, setNewBalance] = useState<string>('')
	const [newRole, setNewRole] = useState<string>('')

	const [, setMessage] = useContext(MessageContext)
	const router = useRouter()

	async function handeSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		try {
			const response = await fetch(
				`http://localhost:3000/api/users/edit/${user.id}`,
				{
					method: 'PUT',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						username: newUsername,
						email: newEmail,
						password: newPassword,
						role: newRole,
						balance: newBalance,
					}),
				}
			)
			const data = await response.json()
			if (response.ok) {
				setMessage({ text: data.message, type: 'success' })
				setIsEditMode(false)
				router.refresh()
				return
			}
			setMessage({ text: data.error, type: 'error' })
		} catch (error) {
			console.error('Błąd:', error)
		}
	}

	return (
		<Form onSubmit={handeSubmit}>
			<p>
				<span className='font-bold mr-1'>Id:</span>
				{user.id}
			</p>
			<CustomInput
				id='new_user_username'
				onChange={setNewUsername}
				placeholder={`Nowy username (obecny: ${user.username})`}
			/>
			<CustomInput
				id='new_user_email'
				onChange={setNewEmail}
				placeholder={`Nowy email (obecny: ${user.email})`}
			/>
			<CustomInput
				id='new_user_password'
				onChange={setNewPassword}
				placeholder='Nowe hasło'
			/>
			<CustomInput
				id='new_user_balance'
				onChange={setNewBalance}
				placeholder={`Nowe saldo (obecne: ${user.balance})`}
			/>
			<select
				id='new_user_role'
				className='my-1 p-2 border text-sm rounded'
				value={newRole}
				onChange={(e) => setNewRole(e.target.value)}
				required
			>
				<option value='' disabled>Wybierz rolę</option>
				<option value='user'>user</option>
				<option value='admin'>admin</option>
			</select>
			<CustomButton text='Zatwierdź zmiany' />
			<CustomButton
				type='button'
				text='Anuluj'
				onClickFn={() => {
					setIsEditMode(false)
					router.push('/edit')
					router.refresh()
				}}
			/>
		</Form>
	)
}
