import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip'
import Link from 'next/link'

export default function ChatLink() {
	return (
		<TooltipProvider>
			<Tooltip delayDuration={300}>
				<TooltipTrigger asChild>
					<Avatar className='absolute bottom-7 right-10 h-16 w-16 hover:scale-105 transition '>
						<Link href='/chat'>
							<AvatarImage src='https://cdn.pixabay.com/photo/2017/06/10/07/21/chat-2389223_1280.png' />
						</Link>
						<AvatarFallback>Assisatant</AvatarFallback>
					</Avatar>
				</TooltipTrigger>
				<TooltipContent
					side='left'
					className='ml-2.5 text-base'
				>
					<p>Porozmawiaj z chatem</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}
