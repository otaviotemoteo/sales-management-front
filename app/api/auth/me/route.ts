import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value

  if (!token) {
    return NextResponse.json({ user: null }, { status: 401 })
  }

  try {
    // Decode JWT payload (base64url) to extract user info
    const parts = token.split('.')
    if (parts.length !== 3) {
      return NextResponse.json({ user: null }, { status: 401 })
    }

    const payload = JSON.parse(
      Buffer.from(parts[1].replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString()
    )

    // Check expiration
    if (payload.exp && payload.exp * 1000 < Date.now()) {
      const response = NextResponse.json({ user: null }, { status: 401 })
      response.cookies.delete('auth-token')
      return response
    }

    const user = {
      id: payload.userId || payload.sub,
      name: payload.name || payload.userName || '',
      email: payload.email || payload.sub || '',
      role: payload.role || 'SELLER',
      active: true,
      createdAt: '',
    }

    return NextResponse.json({ user })
  } catch {
    const response = NextResponse.json({ user: null }, { status: 401 })
    response.cookies.delete('auth-token')
    return response
  }
}
