'use client'

import { useState } from 'react'
import { useAuth } from './use-auth'
import type { UpdateUserRequest } from '@/types/auth'
import * as usersService from '@/services/users.service'

export function useProfile() {
  const { user } = useAuth()
  const [isUpdating, setIsUpdating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const updateProfile = async (data: UpdateUserRequest) => {
    if (!user) throw new Error('Not authenticated')
    setIsUpdating(true)
    setError(null)
    try {
      const updated = await usersService.updateUser(user.id, data)
      return updated
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Could not update the profile'
      setError(msg)
      throw err
    } finally {
      setIsUpdating(false)
    }
  }

  return {
    user,
    isUpdating,
    error,
    updateProfile,
  }
}
