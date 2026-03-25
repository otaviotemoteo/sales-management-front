export interface PageResponse<T> {
  content: T[]
  totalElements: number
  totalPages: number
  first: boolean
  last: boolean
  numberOfElements: number
  size: number
  number: number
  empty: boolean
}

export interface PaginationParams {
  page?: number
  size?: number
  sortBy?: string
  direction?: 'ASC' | 'DESC'
}

export class ApiError extends Error {
  status: number
  fieldErrors?: Record<string, string>

  constructor(message: string, status: number, fieldErrors?: Record<string, string>) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.fieldErrors = fieldErrors
  }
}

export class AuthError extends ApiError {
  constructor(message = 'Sessão expirada') {
    super(message, 401)
    this.name = 'AuthError'
  }
}
