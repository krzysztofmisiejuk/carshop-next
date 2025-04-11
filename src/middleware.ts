import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

const protectedRoutes = ['/profile', '/buy', '/cars', '/edit']

export async function middleware(request: NextRequest) {
	const token = await getToken({
		req: request,
		secret: process.env.NEXTAUTH_SECRET,
	})

	const { pathname } = request.nextUrl

	const isAdmin = token?.role === 'admin'
	const isProtected = protectedRoutes.some((route) =>
		pathname.startsWith(route)
	)

	if (isProtected && !token) {
		return NextResponse.redirect(new URL('/login', request.url))
	}

	if (isProtected && !isAdmin && pathname.startsWith('/edit')) {
		return NextResponse.redirect(new URL('/', request.url))
	}

	return NextResponse.next()
}
