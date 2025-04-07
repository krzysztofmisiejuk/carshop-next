import { Car } from '@prisma/client'
import { SingleProperty } from '..'

export default function SingleCarData(props: { car: Car }) {
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
				value={props.car.ownerId ? props.car.ownerId : ''}
			/>
		</li>
	)
}
