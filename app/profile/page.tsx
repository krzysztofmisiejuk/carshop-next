import { PageHeader, ProfileForm } from '@/components'
import { cookies } from 'next/headers'
import { getUserData } from '../lib/actions'

export default async function Profile() {
	const cookieStore = await cookies()
	const token = cookieStore.get('token')?.value
	console.log('token', token)
	const data = token ? await getUserData(token) : null
	console.log(data)
	return (
		<>
			<PageHeader headerContent='Profil' />
			<section>
				<p>Username: {data?.data.username}</p>
				<p>Saldo: {data?.data.balance}</p>
			</section>
			<ProfileForm />
		</>
	)
}
