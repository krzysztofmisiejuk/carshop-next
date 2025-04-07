// types/next-auth.d.ts
import { DefaultSession } from 'next-auth'

declare module 'next-auth' {
	interface Session {
		user: {
			id: string
			role: 'admin' | 'user'
			username: string
			balance: number
		} & DefaultSession['user']
	}

	// Typ zwracany przez authorize
	interface User {
		id: string
		username: string
		role: 'admin' | 'user'
		balance: number
	}
}

declare module 'next-auth/jwt' {
	interface JWT {
		id: string
		role: 'admin' | 'user'
		username: string
		balance: number
	}
}
