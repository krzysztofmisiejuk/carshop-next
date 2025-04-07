'use client'
import { useContext, useState } from 'react'
import { useRouter } from 'next/navigation'
import { PageSubHeader, Form, CustomButton, CustomInput } from '..'
import { MessageContext } from '@/contexts/MessageContext'

export default function AddCarForm() {
	const [model, setModel] = useState<string>('')
	const [price, setPrice] = useState<string>('')
	const [, setMessage] = useContext(MessageContext)
	const router = useRouter()

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		try {
			const response = await fetch('http://localhost:3000/api/cars', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ model, price: Number(price) }),
			})
			const data = await response.json()

			if (!response.ok) {
				setMessage({
					text: data.error || 'Błąd podczas dodawania samochodu',
					type: 'error',
				})
				router.refresh()
				return
			}
			setMessage({
				text: data.message || 'Samochód dodany pomyślnie',
				type: 'success',
			})
			router.refresh()
		} catch (error) {
			console.error('Error adding car:', error)
		}
	}

	return (
		<div>
			<PageSubHeader headerContent='Dodaj samochód' />
			<Form onSubmit={handleSubmit}>
				<CustomInput
					id='car_model'
					placeholder='Model'
					onChange={setModel}
				/>
				<CustomInput
					id='car_price'
					placeholder='Cena'
					type='number'
					onChange={setPrice}
				/>
				<CustomButton text='Dodaj samochód' />
			</Form>
		</div>
	)
}
