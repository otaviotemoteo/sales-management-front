import { NextRequest, NextResponse } from 'next/server'
import { apiClient } from '@/lib/api-client'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const backendRes = await apiClient('/auth/first-access', {
      method: 'POST',
      body: JSON.stringify(body),
    })

    const data = await backendRes.json()

    if (!backendRes.ok) {
      return NextResponse.json(data, { status: backendRes.status })
    }

    const response = NextResponse.json({ user: data.user })
    response.cookies.set('auth-token', data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24,
    })

    return response
  } catch {
    return NextResponse.json({ message: 'Could not reach the server' }, { status: 500 })
  }
}
