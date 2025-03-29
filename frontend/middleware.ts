import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the user is trying to access the login page
  if (pathname === '/login') {
    // Check for authentication cookies
    const hasLoginToken = request.cookies.has('login_token')
    const hasRefreshToken = request.cookies.has('refresh_token')

    // If user is already logged in, redirect to dashboard
    if (hasLoginToken && hasRefreshToken) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  // Check if the user is trying to access protected routes
  if (pathname.startsWith('/dashboard')) {
    // Check for authentication cookies
    const hasLoginToken = request.cookies.has('login_token')
    const hasRefreshToken = request.cookies.has('refresh_token')

    // If user is not logged in, redirect to login page
    if (!hasLoginToken || !hasRefreshToken) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    '/login',
    '/dashboard/:path*'
  ]
} 