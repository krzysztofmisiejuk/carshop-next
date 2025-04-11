import NavLoginList from './NavLoginList'
import NavLogoutList from './NavLogoutList'
import NavInfo from './NavInfo'
import { User } from '@/types/types'

export default async function Nav({ dataUser }: { dataUser: User | null }) {
	return (
		<>
			<ul className='my-[10px] flex gap-x-5 list-none'>
				{dataUser ? <NavLoginList dataUser={dataUser} /> : <NavLogoutList />}
			</ul>
			<NavInfo dataUser={dataUser} />
		</>
	)
}
