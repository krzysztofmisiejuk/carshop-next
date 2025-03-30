import { Footer, Header, Notification } from '@/components'
import { cookies } from 'next/headers'
import { getUserData } from './lib/actions'
import { Profile } from './types/types'

export default async function RootTemplate({
	children,
}: {
	children: React.ReactNode
}) {
	const cookieStore = await cookies()
	const token = cookieStore.get('token')?.value
	const data: { data: Profile } = token ? await getUserData(token) : null

	return (
		<div className='flex flex-col min-h-svh'>
			<Header dataUser={data} />
			<Notification />
			<main className='flex flex-col flex-1 p-5 mt-5 w-full rounded bg-white'>
				{children}
			</main>
			<Footer />
		</div>
	)
}
