import type { ProductResponse, CreateProductRequest, UpdateProductRequest } from '@/types/product'
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

export async function getProducts(params?: PaginationParams): Promise<PageResponse<ProductResponse>> {
  const res = await fetch(`/api/products${buildQuery(params)}`)
  return handleResponse(res)
}

export async function getProductById(id: number): Promise<ProductResponse> {
  const res = await fetch(`/api/products/${id}`)
  return handleResponse(res)
}

export async function createProduct(data: CreateProductRequest): Promise<ProductResponse> {
  const res = await fetch('/api/products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return handleResponse(res)
}

export async function updateProduct(id: number, data: UpdateProductRequest): Promise<ProductResponse> {
  const res = await fetch(`/api/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return handleResponse(res)
}

export async function deleteProduct(id: number): Promise<void> {
  const res = await fetch(`/api/products/${id}`, { method: 'DELETE' })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    if (res.status === 401) throw new AuthError()
    throw new ApiError(body.message || 'Erro ao desativar produto', res.status)
  }
}

export async function searchProducts(
  query: string,
  params?: PaginationParams
): Promise<PageResponse<ProductResponse>> {
  const searchParams = new URLSearchParams({ query })
  if (params?.page != null) searchParams.set('page', String(params.page))
  if (params?.size != null) searchParams.set('size', String(params.size))

  const res = await fetch(`/api/products/search?${searchParams}`)
  return handleResponse(res)
}

export async function getCategories(): Promise<string[]> {
  const res = await fetch('/api/products/categories')
  return handleResponse(res)
}

export async function getByCategory(
  category: string,
  params?: PaginationParams
): Promise<PageResponse<ProductResponse>> {
  const res = await fetch(`/api/products/category/${encodeURIComponent(category)}${buildQuery(params)}`)
  return handleResponse(res)
}
