'use client'
import { useContext, useEffect, useState } from 'react'
import { EditPanel, PageHeader } from '@/components'
import { User } from '@/types/types'
import { LoginContext } from '@/contexts'
import { redirect } from 'next/navigation'

export default function Edit() {
	const [usersList, setUsersList] = useState<User[]>([])
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const { loggedUser, setLoggedUser } = useContext(LoginContext)
	useEffect(() => {
		getUsers()
		return () => {}
	}, [])

	async function getUsers() {
		setIsLoading(true)
		try {
			const response = await fetch('http://localhost:3000/api/users')
			if (!response.ok) {
				const errorData = await response.json()
				throw new Error(errorData.error || 'Failed to fetch users')
			}
			const data: { data: User[] } = await response.json()
			setUsersList(data.data)
		} catch (error) {
			console.error('Error fetching Users:', error)
			setUsersList([])
		} finally {
			setIsLoading(false)
		}
	}

	async function refreshUser() {
		try {
			const response = await fetch('http://localhost:3000/api/login', {
				credentials: 'include',
			})
			if (!response.ok) return

			const data = await response.json()
			setLoggedUser({
				username: data.data.username,
				role: data.data.role,
				balance: data.data.balance,
			})
		} catch (error) {
			console.error('Error refreshing user data:', error)
		}
	}

	if (loggedUser?.role !== 'admin') {
		redirect('/')
	}

	if (isLoading) {
		return (
			<section>
				<PageHeader headerContent='Edycja użytkowników' />
				<p className='my-2.5'>Ładowanie danych...</p>
			</section>
		)
	}

	return (
		<div>
			<PageHeader headerContent='Edycja użytkowników' />
			{usersList.map((user) => {
				return (
					<EditPanel
						key={user.id}
						user={user}
						refreshUser={refreshUser}
					/>
				)
			})}
		</div>
	)
}
