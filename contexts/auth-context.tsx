'use client'

import { createContext, useState, useEffect, useCallback, type ReactNode } from 'react'
import type { UserResponse } from '@/types/auth'
import * as authService from '@/services/auth.service'

interface AuthContextValue {
  user: UserResponse | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<UserResponse>
  register: (name: string, email: string, password: string) => Promise<UserResponse>
  firstAccessLogin: (email: string) => Promise<UserResponse>
  logout: () => Promise<void>
  refreshUser: () => Promise<void>
}

export const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    authService.getCurrentUser()
      .then((data) => setUser(data.user))
      .catch(() => setUser(null))
      .finally(() => setIsLoading(false))
  }, [])

  const refreshUser = useCallback(async () => {
    try {
      const data = await authService.getCurrentUser()
      setUser(data.user)
    } catch {
      setUser(null)
    }
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    const { user } = await authService.login({ email, password })
    setUser(user)
    return user
  }, [])

  const register = useCallback(async (name: string, email: string, password: string) => {
    const { user } = await authService.register({ name, email, password, role: 'ADMIN' })
    setUser(user)
    return user
  }, [])

  const firstAccessLogin = useCallback(async (email: string) => {
    const { user } = await authService.firstAccess(email)
    setUser(user)
    return user
  }, [])

  const logout = useCallback(async () => {
    await authService.logout()
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      isAuthenticated: !!user,
      login,
      register,
      firstAccessLogin,
      logout,
      refreshUser,
    }}>
      {children}
    </AuthContext.Provider>
  )
}
