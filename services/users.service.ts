import type { UserResponse, CreateUserRequest, UpdateUserRequest } from '@/types/auth'
import type { PageResponse, PaginationParams } from '@/types/api'
import { ApiError, AuthError } from '@/types/api'

function buildQuery(params?: PaginationParams & Record<string, string | number | undefined>): string {
  const query = new URLSearchParams()
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value != null) query.set(key, String(value))
    })
  }
  const str = query.toString()
  return str ? `?${str}` : ''
}

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    if (res.status === 401) throw new AuthError()
    throw new ApiError(body.message || 'Erro no servidor', res.status, body.errors)
  }
  return res.json()
}

export async function getUsers(params?: PaginationParams): Promise<PageResponse<UserResponse>> {
  const res = await fetch(`/api/users${buildQuery(params)}`)
  return handleResponse(res)
}

export async function getUserById(id: number): Promise<UserResponse> {
  const res = await fetch(`/api/users/${id}`)
  return handleResponse(res)
}

export async function createUser(data: CreateUserRequest): Promise<UserResponse> {
  const res = await fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return handleResponse(res)
}

export async function updateUser(id: number, data: UpdateUserRequest): Promise<UserResponse> {
  const res = await fetch(`/api/users/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return handleResponse(res)
}

export async function deleteUser(id: number): Promise<void> {
  const res = await fetch(`/api/users/${id}`, { method: 'DELETE' })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    if (res.status === 401) throw new AuthError()
    throw new ApiError(body.message || 'Erro ao desativar usuário', res.status)
  }
}

export async function reactivateUser(id: number): Promise<UserResponse> {
  const res = await fetch(`/api/users/${id}/reactivate`, { method: 'PATCH' })
  return handleResponse(res)
}

export async function searchUsers(
  query: string,
  params?: PaginationParams
): Promise<PageResponse<UserResponse>> {
  const searchParams = new URLSearchParams({ query })
  if (params?.page != null) searchParams.set('page', String(params.page))
  if (params?.size != null) searchParams.set('size', String(params.size))

  const res = await fetch(`/api/users/search?${searchParams}`)
  return handleResponse(res)
}

export async function getUsersByRole(
  role: 'ADMIN' | 'SELLER',
  params?: PaginationParams
): Promise<PageResponse<UserResponse>> {
  const res = await fetch(`/api/users/role/${role}${buildQuery(params)}`)
  return handleResponse(res)
}
