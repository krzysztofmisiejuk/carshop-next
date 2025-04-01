import crypto from 'crypto'
import { NextRequest } from 'next/server'
import dotenv from 'dotenv'
import { User } from '../types/types'
import { getUserById } from './prismaActions'

dotenv.config()

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
