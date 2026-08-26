import { NextRequest, NextResponse } from 'next/server'

const publicPaths = ['/', '/login', '/register']

function getRoleFromToken(token: string): string | null {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) return null
    const payload = JSON.parse(
      Buffer.from(parts[1].replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString()
    )
    if (payload.exp && payload.exp * 1000 < Date.now()) return null
    return payload.role || null
  } catch {
    return null
  }
}

function getDashboardForRole(role: string): string {
  return role === 'ADMIN' ? '/admin/dashboard' : '/seller/dashboard'
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get('auth-token')?.value

  // Allow static files and auth API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api/auth') ||
    pathname.startsWith('/favicon') ||
    pathname.startsWith('/public')
  ) {
    return NextResponse.next()
  }

  // Allow all other API routes (they handle auth internally)
  if (pathname.startsWith('/api/')) {
    return NextResponse.next()
  }

  const role = token ? getRoleFromToken(token) : null

  // Public paths: if authenticated, redirect to appropriate dashboard
  if (publicPaths.includes(pathname)) {
    if (role) {
      return NextResponse.redirect(new URL(getDashboardForRole(role), request.url))
    }
    return NextResponse.next()
  }

  // No valid token → redirect to login
  if (!role) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Role-based route protection
  if (pathname.startsWith('/admin') && role !== 'ADMIN') {
    return NextResponse.redirect(new URL('/seller/dashboard', request.url))
  }
  if (pathname.startsWith('/seller') && role !== 'SELLER') {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
