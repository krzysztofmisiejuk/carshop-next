import { Car } from '@/app/types/types'
import { SingleProperty } from '../'

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
				value={props.car.owner_id}
			/>
		</li>
	)
}
