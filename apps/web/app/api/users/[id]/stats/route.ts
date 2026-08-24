import { NextRequest, NextResponse } from 'next/server'
import { apiClient } from '@/lib/api-client'

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const token = request.cookies.get('auth-token')?.value
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const search = request.nextUrl.searchParams.toString()
  const path = search ? `/users/${id}/stats?${search}` : `/users/${id}/stats`

  try {
    const backendRes = await apiClient(path, { token })
    const data = await backendRes.json()
    return NextResponse.json(data, { status: backendRes.status })
  } catch {
    return NextResponse.json({ message: 'Erro ao conectar com o servidor' }, { status: 500 })
  }
}
