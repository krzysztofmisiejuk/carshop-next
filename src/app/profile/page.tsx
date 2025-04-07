import { PageHeader, ProfileForm } from '@/components'
import { authOptions } from '@/lib/auth'
import { getUserById } from '@/lib/prismaActions'
import { getServerSession } from 'next-auth'

export default async function Profile() {
	const session = await getServerSession(authOptions)
	const loggedUserId = session?.user.id
	const user = loggedUserId ? await getUserById(loggedUserId) : null

	if (!user) {
		return <p>Nie jesteś zalogowany - brak danych</p>
	}

	return (
		<>
			<PageHeader headerContent='Profil' />
			<section>
				<p>Username: {user[0]?.username}</p>
				<p>Saldo: {user[0]?.balance}</p>
			</section>
			<ProfileForm />
		</>
	)
}
