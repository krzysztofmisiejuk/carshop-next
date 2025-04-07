'use client'
import { useRouter } from 'next/navigation'
import { useContext, useState } from 'react'
import { signIn } from 'next-auth/react'
import { MessageContext } from '../../contexts/MessageContext'
import { CustomButton, Form, CustomInput, PageHeader } from '@/components'
import { Button } from '@/components/ui/button'

export default function Login() {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [, setMessage] = useContext(MessageContext)
	const router = useRouter()

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault()
		const res = await signIn('credentials', {
			username,
			password,
			redirect: false,
		})

		if (res?.ok) {
			setMessage({ text: 'Zalogowano pomyślnie', type: 'success' })
			router.push('/')
			router.refresh()
			return
		}
		setMessage({ text: 'Błąd logowania', type: 'error' })
	}

	return (
		<>
			<PageHeader headerContent='Logowanie' />
			<Form onSubmit={handleSubmit}>
				<CustomInput
					id='login_username'
					placeholder='Username'
					onChange={setUsername}
				/>
				<CustomInput
					id='login_password'
					type='password'
					placeholder='Password'
					onChange={setPassword}
				/>
				<CustomButton text='Zaloguj' />
			</Form>
			<div className='flex flex-col gap-y-5  my-10  max-w-96 '>
				<Button
					className='bg-custom-dark-gray cursor-pointer'
					onClick={() => signIn('github', { callbackUrl: '/' })}
				>
					Zaloguj z github
				</Button>
				<Button
					className='bg-custom-dark-blue cursor-pointer'
					onClick={() => signIn('facebook', { callbackUrl: '/' })}
				>
					Zaloguj z facebook
				</Button>
				<Button
					className='bg-custom-dark-red cursor-pointer'
					onClick={() => signIn('google', { callbackUrl: '/' })}
				>
					Zaloguj z google
				</Button>
			</div>
		</>
	)
}
