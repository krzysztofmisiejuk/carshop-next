import dotenv from 'dotenv'
import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import FacebookProvider from 'next-auth/providers/facebook'
import { generateUserId } from './generateCustomId'
import { prisma } from './db'
import { createUser, getUserByUsername } from './prismaActions'

dotenv.config()

export const authOptions: NextAuthOptions = {
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_ID ?? '',
			clientSecret: process.env.GITHUB_SECRET ?? '',
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_ID ?? '',
			clientSecret: process.env.GOOGLE_SECRET ?? '',
			authorization: {
				params: {
					prompt: 'consent',
					access_type: 'offline',
					response_type: 'code',
				},
			},
		}),
		FacebookProvider({
			clientId: process.env.FACEBOOK_CLIENT_ID ?? '',
			clientSecret: process.env.FACEBOOK_CLIENT_SECRET ?? '',
		}),
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				username: { label: 'Username', type: 'text' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				if (!credentials) return null
				const user = await getUserByUsername(credentials.username)
				if (!user || user.password !== credentials.password) return null

				return {
					id: user.id,
					username: user.username,
					role: user.role,
					balance: user.balance,
				}
			},
		}),
	],
	session: {
		strategy: 'jwt',
	},
	callbacks: {
		async session({ session, token }) {
			if (session.user) {
				session.user.id = token.id as string
				session.user.role = token.role as 'admin' | 'user'
				session.user.username = token.username as string
				session.user.balance = token.balance as number
			}
			return session
		},
		async jwt({ token, user }) {
			if (user) {
				const identifier = user.username ?? user.email?.replace(/\s+/g, '')

				let findUser = await getUserByUsername(identifier)

				if (!findUser && user.email) {
					findUser = await prisma.user.findUnique({
						where: { email: user.email },
					})
				}

				if (!findUser && user.email) {
					const id = await generateUserId()
					const username = user.name?.replace(/\s+/g, '') ?? user.email.split('@')[0]
					await createUser(id, username, user.email, "defaultPassword", 'user')

					findUser = await getUserByUsername(username)
				}

				if (findUser) {
					token.id = findUser.id
					token.username = findUser.username
					token.role = findUser.role
					token.balance = findUser.balance
				}
			}
			return token
		},
	},
	pages: {
		signIn: '/login',
	},
	secret: process.env.NEXTAUTH_SECRET,
}
