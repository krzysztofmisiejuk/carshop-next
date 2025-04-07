import { MessageProvider } from '../contexts/MessageContext'
import { getServerSession } from 'next-auth'
import { authOptions } from '../lib/auth'
import { getUserById } from '../lib/prismaActions'
import {
	Footer,
	Header,
	Message,
	Notification,
	SessionProviderWrapper,
} from '@/components'

export default async function RootTemplate({
	children,
}: {
	children: React.ReactNode
}) {
	const session = await getServerSession(authOptions)
	const loggedUserId = session?.user.id
	const user = loggedUserId ? await getUserById(loggedUserId) : null
	return (
		<SessionProviderWrapper>
			<MessageProvider>
				<div className='flex flex-col min-h-svh'>
					<Header dataUser={user} />
					<Notification />
					<Message />
					<main className='flex flex-col flex-1  w-full  p-5 mt-5 rounded bg-white'>
						{children}
					</main>
					<Footer />
				</div>
			</MessageProvider>
		</SessionProviderWrapper>
	)
}
