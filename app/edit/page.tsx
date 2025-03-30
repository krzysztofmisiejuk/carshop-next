import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { EditPanel, PageHeader } from '@/components'
import { getUserData, getUsers } from '../lib/actions'
import { Profile } from '../types/types'

export default async function Edit() {
	const cookieStore = await cookies()
	const token = cookieStore.get('token')?.value
	const data: { data: Profile } | null = token ? await getUserData(token) : null
	const usersList = await getUsers()

	const isAdmin = data?.data.role === 'admin'
	if (!isAdmin) {
		redirect('/')
	}

	return (
		<div>
			<PageHeader headerContent='Edycja użytkowników' />
			{usersList?.data.map((user) => {
				return (
					<EditPanel
						key={user.id}
						user={user}
					/>
				)
			})}
		</div>
	)
}
