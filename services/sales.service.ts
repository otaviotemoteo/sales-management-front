import type { SaleResponse, CreateSaleRequest, UpdateSaleRequest } from '@/types/sale'
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

export async function getAllSales(params?: PaginationParams): Promise<PageResponse<SaleResponse>> {
  const res = await fetch(`/api/sales${buildQuery(params)}`)
  return handleResponse(res)
}

export async function getMySales(params?: PaginationParams): Promise<PageResponse<SaleResponse>> {
  const res = await fetch(`/api/sales/my-sales${buildQuery(params)}`)
  return handleResponse(res)
}

export async function getSaleById(id: number): Promise<SaleResponse> {
  const res = await fetch(`/api/sales/${id}`)
  return handleResponse(res)
}

export async function createSale(data: CreateSaleRequest): Promise<SaleResponse> {
  const res = await fetch('/api/sales', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return handleResponse(res)
}

export async function updateSale(id: number, data: UpdateSaleRequest): Promise<SaleResponse> {
  const res = await fetch(`/api/sales/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return handleResponse(res)
}

export async function cancelSale(id: number): Promise<void> {
  const res = await fetch(`/api/sales/${id}`, { method: 'DELETE' })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    if (res.status === 401) throw new AuthError()
    throw new ApiError(body.message || 'Erro ao cancelar venda', res.status)
  }
}

export async function markPaid(id: number): Promise<SaleResponse> {
  const res = await fetch(`/api/sales/${id}/payment/mark-paid`, { method: 'PATCH' })
  return handleResponse(res)
}

export async function getCustomerStatement(
  customerId: number,
  startDate: string,
  endDate: string
): Promise<SaleResponse[]> {
  const query = new URLSearchParams({ startDate, endDate })
  const res = await fetch(`/api/sales/customer/${customerId}/statement?${query}`)
  return handleResponse(res)
}
