import { useRouter } from 'next/navigation'

export default function CustomLink({
	pathname,
	children,
}: {
	pathname: string
	children: React.ReactNode
}) {
	const router = useRouter()
	return (
		<button
			onClick={async () => {
				router.push(`${pathname}`)
				router.refresh()
			}}
		>
			{children}
		</button>
	)
}
