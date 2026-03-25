export type UserRole = 'ADMIN' | 'SELLER'

export interface UserResponse {
  id: number
  name: string
  email: string
  role: UserRole
  active: boolean
  createdAt: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  name: string
  email: string
  password: string
  role: UserRole
}

export interface AuthResponse {
  token: string
  type: string
  user: UserResponse
}

export interface CreateUserRequest {
  name: string
  email: string
  password: string
  role: UserRole
}

export interface UpdateUserRequest {
  name?: string
  email?: string
  active?: boolean
}
