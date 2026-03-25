export interface CustomerResponse {
  id: number
  name: string
  phone: string | null
  email: string | null
  address: string | null
  createdByUsername: string
  createdAt: string
  updatedAt: string
}

export interface CreateCustomerRequest {
  name: string
  phone?: string
  email?: string
  address?: string
}

export interface UpdateCustomerRequest {
  name?: string
  phone?: string
  email?: string
  address?: string
}
