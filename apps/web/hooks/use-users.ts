'use client'

import { useState, useEffect, useCallback } from 'react'
import type { UserResponse } from '@/types/auth'
import type { PageResponse } from '@/types/api'
import * as usersService from '@/services/users.service'

interface UseUsersOptions {
  page?: number
  size?: number
  sortBy?: string
  direction?: 'ASC' | 'DESC'
  role?: 'ADMIN' | 'SELLER'
  autoFetch?: boolean
}

export function useUsers(options: UseUsersOptions = {}) {
  const { page = 0, size = 20, sortBy = 'createdAt', direction = 'DESC', role, autoFetch = true } = options

  const [data, setData] = useState<PageResponse<UserResponse> | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchUsers = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const result = role
        ? await usersService.getUsersByRole(role, { page, size })
        : await usersService.getUsers({ page, size, sortBy, direction })
      setData(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not load users')
    } finally {
      setIsLoading(false)
    }
  }, [page, size, sortBy, direction, role])

  useEffect(() => {
    if (autoFetch) fetchUsers()
  }, [fetchUsers, autoFetch])

  const searchUsers = async (query: string) => {
    setIsLoading(true)
    setError(null)
    try {
      const result = await usersService.searchUsers(query, { page: 0, size })
      setData(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not search users')
    } finally {
      setIsLoading(false)
    }
  }

  return {
    users: data?.content ?? [],
    pagination: data ? {
      page: data.number,
      totalPages: data.totalPages,
      totalElements: data.totalElements,
    } : null,
    isLoading,
    error,
    refresh: fetchUsers,
    searchUsers,
  }
}
