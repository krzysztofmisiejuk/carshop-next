import { User } from '@/types/types'

export default async function NavInfo({ dataUser }: { dataUser: User | null }) {
	if (!dataUser) {
		return <p className='text-sm mt-1'>Nie jesteś zalogowany</p>
	}

	return (
		<p className='text-sm mt-1'>
			{`Zalogowany jako: ${dataUser.username} | Rola: ${dataUser.role} | Saldo: ${dataUser.balance}`}
		</p>
	)
}
