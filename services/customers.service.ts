import type { CustomerResponse, CreateCustomerRequest, UpdateCustomerRequest } from '@/types/customer'
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

export async function getCustomers(params?: PaginationParams): Promise<PageResponse<CustomerResponse>> {
  const res = await fetch(`/api/customers${buildQuery(params)}`)
  return handleResponse(res)
}

export async function getCustomerById(id: number): Promise<CustomerResponse> {
  const res = await fetch(`/api/customers/${id}`)
  return handleResponse(res)
}

export async function createCustomer(data: CreateCustomerRequest): Promise<CustomerResponse> {
  const res = await fetch('/api/customers', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return handleResponse(res)
}

export async function updateCustomer(id: number, data: UpdateCustomerRequest): Promise<CustomerResponse> {
  const res = await fetch(`/api/customers/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return handleResponse(res)
}

export async function deleteCustomer(id: number): Promise<void> {
  const res = await fetch(`/api/customers/${id}`, { method: 'DELETE' })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    if (res.status === 401) throw new AuthError()
    throw new ApiError(body.message || 'Erro ao deletar cliente', res.status)
  }
}

export async function searchCustomers(
  query: string,
  params?: PaginationParams
): Promise<PageResponse<CustomerResponse>> {
  const searchParams = new URLSearchParams({ query })
  if (params?.page != null) searchParams.set('page', String(params.page))
  if (params?.size != null) searchParams.set('size', String(params.size))

  const res = await fetch(`/api/customers/search?${searchParams}`)
  return handleResponse(res)
}
