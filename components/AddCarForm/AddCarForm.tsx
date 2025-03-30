'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { PageSubHeader, Form, Button, Input } from '../'

export default function AddCarForm() {
	const [model, setModel] = useState<string>('')
	const [price, setPrice] = useState<string>('')
	const router = useRouter()

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		try {
			const response = await fetch('http://localhost:3000/api/cars', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ model, price: Number(price) }),
			})
			if (response.ok) {
				router.refresh()
			}
		} catch (error) {
			console.error('Error adding car:', error)
		}
	}

	return (
		<div>
			<PageSubHeader headerContent='Dodaj samochód' />
			<Form onSubmit={handleSubmit}>
				<Input
					id='car_model'
					placeholder='Model'
					onChange={setModel}
				/>
				<Input
					id='car_price'
					placeholder='Cena'
					type='number'
					onChange={setPrice}
				/>
				<Button text='Dodaj samochód' />
			</Form>
		</div>
	)
}
