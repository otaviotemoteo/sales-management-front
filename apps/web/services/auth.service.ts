import type { LoginRequest, RegisterRequest, UserResponse } from '@/types/auth'
import { ApiError, AuthError } from '@/types/api'

export async function login(data: LoginRequest): Promise<{ user: UserResponse }> {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    if (res.status === 401) throw new AuthError(body.message || 'Invalid email or password')
    throw new ApiError(body.message || 'Could not sign in', res.status)
  }

  return res.json()
}

export async function register(data: RegisterRequest): Promise<{ user: UserResponse }> {
  const res = await fetch('/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new ApiError(body.message || 'Could not create the account', res.status, body.errors)
  }

  return res.json()
}

export async function checkEmail(email: string): Promise<{ firstAccess: boolean }> {
  const res = await fetch('/api/auth/check-email', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  })

  if (!res.ok) return { firstAccess: false }
  return res.json()
}

export async function firstAccess(email: string): Promise<{ user: UserResponse }> {
  const res = await fetch('/api/auth/first-access', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  })

  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new ApiError(body.message || 'Could not sign in', res.status)
  }

  return res.json()
}

export async function logout(): Promise<void> {
  await fetch('/api/auth/logout', { method: 'POST' })
}

export async function getCurrentUser(): Promise<{ user: UserResponse | null }> {
  const res = await fetch('/api/auth/me')

  if (!res.ok) {
    return { user: null }
  }

  return res.json()
}
