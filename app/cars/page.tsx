// components/Cars.tsx
'use client';
import { useContext, useEffect, useState } from 'react';
import {
	Button,
	Form,
	Input,
	PageHeader,
	PageSubHeader,
	SingleProperty,
} from '@/components';
import { MessageContext } from '@/contexts/MessageContext';
import { Car } from '@/types/types';

function SingleCarData(props: { car: Car }) {
	return (
		<li className='flex py-1.5 border-b border-custom-medium-gray'>
			<SingleProperty
				property='ID'
				value={props.car.id}
			/>
			<SingleProperty
				property='Model'
				value={props.car.model}
			/>
			<SingleProperty
				property='Cena'
				value={props.car.price}
			/>
			<SingleProperty
				property='Właściciel'
				value={props.car.owner_id}
			/>
		</li>
	);
}

export default function Cars() {
	const [model, setModel] = useState<string>('');
	const [price, setPrice] = useState<string>('');
	const [carsList, setCarsList] = useState<Car[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [, setMessage] = useContext(MessageContext);

	useEffect(() => {
		getCars();
		return () => {};
	}, []);

	async function getCars() {
		try {
			const response = await fetch('http://localhost:3000/api/cars');
			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.error || 'Failed to fetch cars');
			}
			const data: { data: Car[] } = await response.json();
			setCarsList(data.data);
		} catch (error) {
			console.error('Error fetching cars:', error);
			setCarsList([]);
		} finally {
			setIsLoading(false);
		}
	}

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		try {
			const response = await fetch('http://localhost:3000/api/cars', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ model, price: Number(price) }),
			});
			const data = await response.json();
			if (response.ok) {
				setMessage({
					text: data.message || 'Samochód dodany pomyślnie',
					type: 'success',
				});
				await getCars();
			} else {
				setMessage({
					text: data.error || 'Błąd podczas dodawania samochodu',
					type: 'error',
				});
			}
		} catch (error) {
			console.error('Error adding car:', error);
			setMessage({
				text: error instanceof Error ? error.message : 'Wystąpił błąd',
				type: 'error',
			});
		}
	}

	if (isLoading) {
		return (
			<section>
				<PageHeader headerContent='Samochody' />
				<p className='my-2.5'>Ładowanie danych...</p>
			</section>
		);
	}

	return (
		<section>
			<PageHeader headerContent='Samochody' />
			<ul className='my-2.5'>
				{carsList.length > 0 ? (
					carsList.map((car) => (
						<SingleCarData
							key={car.id}
							car={car}
						/>
					))
				) : (
					<li>Brak samochodów do wyświetlenia</li>
				)}
			</ul>
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
		</section>
	);
}
