import crypto from 'crypto'
import { NextRequest } from 'next/server'
import dotenv from 'dotenv'
import { User } from '../types/types'
import { getUserById, getUserByUsername } from './prismaActions'
import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import FacebookProvider from 'next-auth/providers/facebook'

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
				if (!user) return null

				// Porównanie hasła — tu najlepiej dodać bcrypt!
				if (user.password !== credentials.password) {
					return null
				}

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
				token.id = user.id
				token.username = user.username ?? user.name
				token.role = user.role ?? 'user'
				token.balance = user.balance ?? '0'
			}
			return token
		},
	},
	pages: {
		signIn: '/login',
	},
	secret: process.env.NEXTAUTH_SECRET,
}

const IV_LENGTH = 16
const algorithm = 'aes-192-cbc'
const TOKEN_KEY = process.env.TOKEN_KEY

if (!TOKEN_KEY) throw new Error('TOKEN_KEY is not set in .env')
const TOKEN_KEY_BUFFER = Buffer.from(TOKEN_KEY.padEnd(24, ' '), 'utf8')

export function generateToken(userData: string): string {
	const iv = crypto.randomBytes(IV_LENGTH)
	const cipher = crypto.createCipheriv(algorithm, TOKEN_KEY_BUFFER, iv)
	let encrypted = cipher.update(userData, 'utf8', 'hex')
	encrypted += cipher.final('hex')
	return iv.toString('hex') + '.' + encrypted
}

export function getUserFromToken(token: string): string | null {
	try {
		if (!token) return null
		const [ivHex, encryptedData] = token.split('.')
		if (!ivHex || !encryptedData) return null

		const iv = Buffer.from(ivHex, 'hex')
		const decipher = crypto.createDecipheriv(algorithm, TOKEN_KEY_BUFFER, iv)
		let decrypted = decipher.update(encryptedData, 'hex', 'utf8')
		decrypted += decipher.final('utf8')

		return decrypted.startsWith('"') && decrypted.endsWith('"')
			? decrypted.slice(1, -1).trim()
			: decrypted.trim()
	} catch (error) {
		console.error('Decryption error:', error)
		return null
	}
}

export const getAuthenticatedUser = async (
	req: NextRequest
): Promise<User | null> => {
	try {
		const token = req.cookies.get('token')?.value || ''
		const userId = getUserFromToken(token)
		if (!userId) return null
		const user = await getUserById(userId)
		return user[0]
	} catch (error) {
		console.error('Error in getAuthenticatedUser:', error)
		return null
	}
}
