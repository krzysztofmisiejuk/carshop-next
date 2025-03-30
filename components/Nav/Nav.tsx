import { Profile } from '@/app/types/types'
import { NavInfo, NavLoginList, NavLogoutList } from '.'

export default async function Nav({
	dataUser,
}: {
	dataUser: { data: Profile } | null
}) {
	const isAdmin = dataUser?.data.role === 'admin'
	const isLoggedIn = dataUser !== null

	return (
		<>
			<ul className='my-[10px] flex gap-x-5 list-none'>
				{isLoggedIn ? <NavLoginList isAdmin={isAdmin} /> : <NavLogoutList />}
			</ul>
			<NavInfo
				dataUser={dataUser}
				isLoggedIn={isLoggedIn}
			/>
		</>
	)
}
