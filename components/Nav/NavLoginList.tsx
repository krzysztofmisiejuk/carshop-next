'use client'
import { useRouter } from 'next/navigation'
import CustomLink from '../CustomLink/CustomLink'

export default function NavLoginList({ isAdmin }: { isAdmin: boolean }) {
	const router = useRouter()

	async function handleLogout() {
		const response = await fetch('/api/logout', {
			method: 'GET',
			credentials: 'include',
		})
		if (response.ok) {
			router.push('/login')
			router.refresh()
		}
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
			<li
				onClick={async () => {
					try {
						await handleLogout()
					} catch (error) {
						console.error('Logout error:', error)
					}
				}}
				className='cursor-pointer'
			>
				Wyloguj
			</li>
			{isAdmin && (
				<div className='ml-auto'>
					<CustomLink pathname='/edit'>Lista użytkowników</CustomLink>
				</div>
			)}
		</div>
	)
}
