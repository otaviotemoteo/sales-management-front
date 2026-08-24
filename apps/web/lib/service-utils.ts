import { ApiError, AuthError } from '@/types/api'

export function buildQuery(params?: Record<string, string | number | undefined>): string {
  const query = new URLSearchParams()
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value != null) query.set(key, String(value))
    })
  }
  const str = query.toString()
  return str ? `?${str}` : ''
}

export async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    if (res.status === 401) throw new AuthError()
    throw new ApiError(body.message || 'Erro no servidor', res.status, body.errors)
  }
  return res.json()
}

export async function handleVoidResponse(res: Response, fallbackMsg: string): Promise<void> {
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    if (res.status === 401) throw new AuthError()
    throw new ApiError(body.message || fallbackMsg, res.status)
  }
}
