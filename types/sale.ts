import type { UserResponse } from './auth'
import type { CustomerResponse } from './customer'
import type { ProductResponse } from './product'

export type SaleStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED'
export type PaymentMethod = 'CASH' | 'PIX' | 'DEBIT_CARD' | 'CREDIT_CARD'
export type PaymentStatus = 'PAID' | 'PENDING'

export interface SaleItemResponse {
  id: number
  product: ProductResponse
  quantity: number
  unitPrice: number
  totalPrice: number
}

export interface SaleItemRequest {
  productId: number
  quantity: number
  unitPrice: number
}

export interface SaleResponse {
  id: number
  saleDate: string
  totalAmount: number
  discount: number
  finalAmount: number
  status: SaleStatus
  notes: string | null
  seller: UserResponse
  customer: CustomerResponse
  items: SaleItemResponse[]
  paymentMethod: PaymentMethod
  paymentStatus: PaymentStatus
  paymentDate: string | null
  createdAt: string
}

export interface CreateSaleRequest {
  customerId: number
  items: SaleItemRequest[]
  paymentMethod: PaymentMethod
  paymentStatus: PaymentStatus
  discount?: number
  notes?: string
}

export interface UpdateSaleRequest {
  [key: string]: unknown
}
