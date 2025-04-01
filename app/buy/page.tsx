'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button, Form, Input, PageHeader } from '@/components'

export default function BuyCarPanel() {
	const [carId, setCarId] = useState('')
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

			if (response.ok) {
				router.refresh()
			}
		} catch (error) {
			console.error('Error when trying to buy car:', error)
		}
	}

	return (
		<section>
			<PageHeader headerContent='Kup samochód' />
			<Form onSubmit={handleSubmit}>
				<Input
					id='bought_car'
					placeholder='ID samochodu'
					onChange={setCarId}
				/>
				<Button text='Kup samochód' />
			</Form>
		</section>
	)
}
