import { User } from '@/types/types'
import { Nav } from '../Nav'

export default function Header({ dataUser }: { dataUser: User[] | null }) {
	return (
		<div className='p-2.5 bg-custom-dark-gray text-white'>
			<h1 className='font-bold text-main-header-size'>Car Shop</h1>
			<Nav dataUser={dataUser} />
		</div>
	)
}
