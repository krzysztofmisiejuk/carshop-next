import { User } from '@prisma/client'
import { getServerSession } from 'next-auth'

export default async function NavInfo({
	dataUser,
}: {
	dataUser: User[] | null
}) {
	const session = await getServerSession()

	if (!dataUser) {
		return <p className='text-sm mt-1'>Nie jesteś zalogowany</p>
	}

	if (dataUser?.length === 0 && session) {
		const { user } = session
		return (
			<p className='text-sm mt-1'>
				{`Zalogowany jako: ${user.name} | Rola: user | Saldo: brak danych `}
			</p>
		)
	}

	return (
		<p className='text-sm mt-1'>
			{`Zalogowany jako: ${dataUser[0]?.username} | Rola: ${dataUser[0]?.role} | Saldo:
			${dataUser[0]?.balance}`}
		</p>
	)
}
