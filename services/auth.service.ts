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
    if (res.status === 401) throw new AuthError(body.message || 'E-mail ou senha inválidos')
    throw new ApiError(body.message || 'Erro ao fazer login', res.status)
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
    throw new ApiError(body.message || 'Erro ao criar conta', res.status, body.errors)
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
