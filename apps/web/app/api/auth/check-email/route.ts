import { NextRequest, NextResponse } from 'next/server'
import { apiClient } from '@/lib/api-client'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const backendRes = await apiClient('/auth/check-email', {
      method: 'POST',
      body: JSON.stringify(body),
    })
    const data = await backendRes.json()
    return NextResponse.json(data, { status: backendRes.status })
  } catch {
    // Fail closed: behave as a normal (password) login when the check can't run.
    return NextResponse.json({ firstAccess: false })
  }
}
