'use client';
import { Button, Form, Input, PageHeader } from '@/components';
import { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import { MessageContext } from '@/contexts/MessageContext';
export default function Register() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [, setMessage] = useContext(MessageContext);
	const router = useRouter();

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		try {
			const response = await fetch('http://localhost:3000/api/register', {
				method: 'POST',
				headers: { 'Content-type': 'application/json' },
				body: JSON.stringify({ username, password }),
			});
			const data = await response.json();
			if (response.ok) {
				setMessage({ text: data.message, type: 'success' });
				router.push('/login');
			} else {
				setMessage({ text: data.error, type: 'error' });
			}
		} catch (error) {
			console.error('Błąd:', error);
		}
	}

	return (
		<>
			<PageHeader headerContent='Rejestracja' />
			<Form onSubmit={handleSubmit}>
				<Input
					id='register_username'
					placeholder='Username'
					onChange={setUsername}
				/>
				<Input
					id='register_password'
					type='password'
					placeholder='Password'
					onChange={setPassword}
				/>
				<Button text='Zarejestruj' />
			</Form>
		</>
	);
}
