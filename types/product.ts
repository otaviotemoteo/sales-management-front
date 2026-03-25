export interface ProductResponse {
  id: number
  name: string
  description: string | null
  price: number
  category: string
  imageUrl: string | null
  active: boolean
  stock: number
  createdAt: string
  updatedAt: string
}

export interface CreateProductRequest {
  name: string
  description?: string
  price: number
  category: string
  imageUrl?: string
  stock: number
}

export interface UpdateProductRequest {
  name?: string
  description?: string
  price?: number
  category?: string
  imageUrl?: string
  stock?: number
  active?: boolean
}
