import { AddCarForm, PageHeader, SingleCarData } from '@/components'
import { getCars } from '@/lib/prismaActions'

export default async function Cars() {
	const carsList = await getCars()

	if (!carsList) {
		return (
			<section>
				<PageHeader headerContent='Samochody' />
				<p>Brak samochodów do wyświetlenia</p>
			</section>
		)
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
			<AddCarForm />
		</section>
	)
}
