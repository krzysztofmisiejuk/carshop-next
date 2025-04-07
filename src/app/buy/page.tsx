'use client'
import { useContext, useState } from 'react'
import { useRouter } from 'next/navigation'
import { MessageContext } from '../../contexts/MessageContext'
import { CustomButton, Form, CustomInput, PageHeader } from '@/components'

export default function BuyCarPanel() {
	const [carId, setCarId] = useState('')
	const [, setMessage] = useContext(MessageContext)
	const router = useRouter()

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		try {
			const response = await fetch(
				`http://localhost:3000/api/cars/${carId}/buy`,
				{
					method: 'PUT',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ carId: carId }),
					credentials: 'include',
					cache: 'no-store',
				}
			)
			const data = await response.json()

			if (response.ok) {
				setMessage({
					text: data.message,
					type: 'success',
				})
				router.refresh()
			} else {
				setMessage({
					text: data.error,
					type: 'error',
				})
			}
		} catch (error) {
			console.error('Error when trying to buy car:', error)
		}
	}

	return (
		<section>
			<PageHeader headerContent='Kup samochód' />
			<Form onSubmit={handleSubmit}>
				<CustomInput
					id='bought_car'
					placeholder='ID samochodu'
					onChange={setCarId}
				/>
				<CustomButton text='Kup samochód' />
			</Form>
		</section>
	)
}
