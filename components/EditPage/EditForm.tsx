'use client'
import { User } from '@/types/types'
import { useContext, useState } from 'react'
import { MessageContext } from '@/contexts'
import { Button, Form, Input } from '../index'

export default function EditForm({
	user,
	setIsEditMode,
	refreshUser,
}: {
	user: User
	setIsEditMode: React.Dispatch<React.SetStateAction<boolean>>
	refreshUser: () => void
}) {
	const [, setMessage] = useContext(MessageContext)
	const [newUsername, setNewUsername] = useState<string>('')
	const [newPassword, setNewPassword] = useState<string>('')
	const [newBalance, setNewBalance] = useState<string>('')
	const [newRole, setNewRole] = useState<string>('')

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
						password: newPassword,
						role: newRole,
						balance: newBalance,
					}),
				}
			)
			const data = await response.json()
			if (response.ok) {
				setMessage({
					text: data.message,
					type: 'success',
				})
				setIsEditMode(false)
				refreshUser()
			} else {
				setMessage({
					text: data.error,
					type: 'error',
				})
			}
		} catch (error) {
			console.error('Bład: ', error)
		}
	}

	return (
		<Form onSubmit={handeSubmit}>
			<p>
				<span className='font-bold mr-1'>Id:</span>
				{user.id}
			</p>
			<Input
				id='new_user_username'
				onChange={setNewUsername}
				placeholder='Nowy username'
			/>
			<Input
				id='new_user_password'
				onChange={setNewPassword}
				placeholder='Nowe password'
			/>
			<Input
				id='new_user_balance'
				onChange={setNewBalance}
				placeholder='Nowe saldo'
			/>
			<select
				id='new_user_role'
				className='my-1 p-2 border text-sm rounded'
				value={newRole}
				onChange={(e) => {
					setNewRole(e.target.value)
				}}
				required
			>
				<option
					value=''
					disabled
				>
					Wybierz role
				</option>
				<option value='user'>user</option>
				<option value='admin'>admin</option>
			</select>
			<Button text='Zatwierdź zmiany' />
			<Button
				type='button'
				text='Anuluj'
				onClickFn={() => setIsEditMode(false)}
			/>
		</Form>
	)
}
