import { NextRequest, NextResponse } from 'next/server'
import { apiClient } from '@/lib/api-client'

export async function PATCH(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await request.json()
    const backendRes = await apiClient('/users/me/set-password', {
      method: 'PATCH',
      body: JSON.stringify(body),
      token,
    })
    if (backendRes.status === 200 || backendRes.status === 204) {
      return NextResponse.json({ success: true })
    }
    const data = await backendRes.json()
    return NextResponse.json(data, { status: backendRes.status })
  } catch {
    return NextResponse.json({ message: 'Could not reach the server' }, { status: 500 })
  }
}
