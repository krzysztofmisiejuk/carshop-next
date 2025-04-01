import { PageHeader, AddCarForm, SingleCarData } from '@/components'
import { getCars } from '../lib/actions'

export default async function Cars() {
	const carsList = await getCars()

	if (!carsList || !carsList.data) {
		return (
			<section>
				<PageHeader headerContent='Samochody' />
				<p>Brak samochodów do wyświetlenia</p>
			</section>
		)
	}
	console.log('carslist page cars: ', carsList)
	return (
		<section>
			<PageHeader headerContent='Samochody' />
			<ul className='my-2.5'>
				{carsList.data.length > 0 ? (
					carsList.data.map((car) => (
						<SingleCarData
							key={car.id}
							car={car}
						/>
					))
				) : (
					<li>Brak samochodów do wyświetlenia</li>
				)}
			</ul>
			<AddCarForm />
		</section>
	)
}
