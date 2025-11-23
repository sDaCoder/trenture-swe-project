import { NextResponse, NextRequest } from 'next/server'

export function proxy(request: NextRequest) {

    const path = request.nextUrl.pathname
    const isPublicPath = path === '/login' || path === '/signup'
    const token = request.cookies.get('token')?.value || ''

    if (isPublicPath && token) {
        return NextResponse.redirect(new URL('/plans', request.url))
    } else if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/login', request.url))
    }
    
    return NextResponse.next()
}

export const config = {
    matcher: [
        '/user-profile',
        '/plans',
        '/plans/:path*',
        '/login',
        '/signup'
    ],
}