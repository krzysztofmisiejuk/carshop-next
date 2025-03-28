import { Nav } from '../Nav';

export default function Header() {

	return (
		<div className='p-2.5 bg-custom-dark-gray text-white'>
			<h1 className='font-bold text-main-header-size'>Car Shop</h1>
			<Nav/>
		</div>
	);
}
