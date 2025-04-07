import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Car shop',
	description: 'Simple car shop',
}

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body className='w-full min-h-screen px-5 font-family-base bg-custom-light-gray'>
				{children}
			</body>
		</html>
	)
}
