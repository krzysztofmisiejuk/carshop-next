import { Profile } from '@/app/types/types'

export default async function NavInfo({
	isLoggedIn,
	dataUser,
}: {
	isLoggedIn: boolean | string | null
	dataUser: { data: Profile } | null
}) {
	if (!isLoggedIn || !dataUser) {
		return <p className='text-sm mt-1'>Nie jesteś zalogowany</p>
	}

	return (
		<p className='text-sm mt-1'>
			{isLoggedIn
				? `Zalogowany jako: ${dataUser.data.username} | Rola: ${dataUser.data.role} | Saldo: ${dataUser.data.balance}`
				: 'Nie jesteś zalogowany'}
		</p>
	)
}
