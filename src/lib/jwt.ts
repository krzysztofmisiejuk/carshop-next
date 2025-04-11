import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'

const TOKEN_KEY = process.env.TOKEN_KEY
if (!TOKEN_KEY) throw new Error('TOKEN_KEY is not set in .env')

const encodedKey = new TextEncoder().encode(TOKEN_KEY)

if (!TOKEN_KEY) throw new Error('TOKEN_KEY is not set in .env')

export async function createSession(userId: string) {
	const expireDate = new Date(Date.now() + 3600)
	const session = await encrypt({ userId, expireDate })

	const cookiesStore = await cookies()
	cookiesStore.set('session', session, {
		httpOnly: true,
		secure: true,
		expires: expireDate,
		sameSite: 'strict',
		path: '/',
	})
}

export async function encrypt(payload: { userId: string; expireDate: Date }) {
	return new SignJWT(payload)
		.setProtectedHeader({ alg: 'HS256' })
		.setIssuedAt()
		.setExpirationTime('1h')
		.sign(encodedKey)
}

export async function decrypt(session: string | undefined = '') {
	try {
		const { payload } = await jwtVerify(session, encodedKey, {
			algorithms: ['HS256'],
		})
		return payload
	} catch (error) {
		console.error('Failed to verify session', error)
	}
}
