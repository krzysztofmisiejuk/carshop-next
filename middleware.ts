import { NextRequest, NextResponse } from 'next/server';


export async function middleware(request: NextRequest) {
	const cookie = request.cookies.get('token');	
	if (!cookie) {
		if (
			request.nextUrl.pathname.startsWith('/buy') ||
			request.nextUrl.pathname.startsWith('/edit') ||
			request.nextUrl.pathname.startsWith('/profile') ||
			request.nextUrl.pathname.startsWith('/cars') ||
			request.nextUrl.pathname.startsWith('/api/cars') ||
			request.nextUrl.pathname.startsWith('/api/users') ||
			request.nextUrl.pathname.startsWith('/api/fund')
		) {
			return NextResponse.redirect(new URL('/login', request.url));
		}
	}

	// if (cookie && request.nextUrl.pathname.startsWith('/edit')) {

	// 	return NextResponse.rewrite(new URL('/adminInfo', request.url));
	// }

	return NextResponse.next();
}
