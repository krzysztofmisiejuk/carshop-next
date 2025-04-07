'use client'
import CustomLink from '../CustomLink/CustomLink'
import { signOut } from 'next-auth/react'
import { useContext } from 'react'
import { MessageContext } from '@/contexts/MessageContext'
import { User } from '@prisma/client'

export default function NavLoginList({
	dataUser,
}: {
	dataUser: User[] | null
}) {
	const [, setMessage] = useContext(MessageContext)

	async function handleLogout() {
		signOut({ callbackUrl: '/login' })
		setMessage({ text: 'Wylogowano pomyślnie', type: 'success' })
	}

	return (
		<div className='flex gap-4 w-full'>
			<CustomLink pathname='/'>
				<li>Home</li>
			</CustomLink>
			<CustomLink pathname='/profile'>
				<li>Profil</li>
			</CustomLink>
			<CustomLink pathname='/cars'>
				<li>Samochody</li>
			</CustomLink>
			<CustomLink pathname='/buy'>
				<li>Kup samochód</li>
			</CustomLink>
			<li>
				<button
					className='cursor-pointer'
					onClick={() => handleLogout()}
				>
					Wyloguj
				</button>
			</li>
			{dataUser && dataUser[0]?.role === 'admin' ? (
				<div className='ml-auto'>
					<CustomLink pathname='/edit'>Lista użytkowników</CustomLink>
				</div>
			) : null}
		</div>
	)
}
