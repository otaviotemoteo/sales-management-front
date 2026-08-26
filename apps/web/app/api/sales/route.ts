import { NextRequest, NextResponse } from 'next/server'
import { apiClient } from '@/lib/api-client'

export async function GET(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const searchParams = request.nextUrl.searchParams.toString()
  const path = searchParams ? `/sales?${searchParams}` : '/sales'

  try {
    const backendRes = await apiClient(path, { token })
    const data = await backendRes.json()
    return NextResponse.json(data, { status: backendRes.status })
  } catch {
    return NextResponse.json({ message: 'Could not reach the server' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await request.json()
    const backendRes = await apiClient('/sales', {
      method: 'POST',
      body: JSON.stringify(body),
      token,
    })
    const data = await backendRes.json()
    return NextResponse.json(data, { status: backendRes.status })
  } catch {
    return NextResponse.json({ message: 'Could not reach the server' }, { status: 500 })
  }
}
