import Link from 'next/link'

export default function NavLogoutList() {
	return (
		<>
			<Link href='/'>
				<li>Home</li>
			</Link>
			<Link href='/login'>
				<li>Zaloguj</li>
			</Link>
			<Link href='/register'>
				<li>Zajerestruj</li>
			</Link>
		</>
	)
}
