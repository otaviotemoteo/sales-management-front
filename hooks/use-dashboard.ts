'use client'

import { useState, useEffect, useCallback } from 'react'
import type { DashboardResponse } from '@/types/dashboard'
import * as dashboardService from '@/services/dashboard.service'

type Period = 'day' | 'week' | 'month' | 'year'

function getDateRange(period: Period): { startDate: string; endDate: string } {
  const now = new Date()
  const end = now.toISOString()
  let start: Date

  switch (period) {
    case 'day':
      start = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      break
    case 'week':
      start = new Date(now)
      start.setDate(start.getDate() - 7)
      break
    case 'month':
      start = new Date(now.getFullYear(), now.getMonth(), 1)
      break
    case 'year':
      start = new Date(now.getFullYear(), 0, 1)
      break
  }

  return { startDate: start.toISOString(), endDate: end }
}

interface UseDashboardOptions {
  period?: Period
  sellerId?: number
  autoFetch?: boolean
}

export function useDashboard(options: UseDashboardOptions = {}) {
  const { period = 'month', sellerId, autoFetch = true } = options

  const [dashboard, setDashboard] = useState<DashboardResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchDashboard = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const { startDate, endDate } = getDateRange(period)
      const result = await dashboardService.getDashboard(startDate, endDate, sellerId)
      setDashboard(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar dashboard')
    } finally {
      setIsLoading(false)
    }
  }, [period, sellerId])

  useEffect(() => {
    if (autoFetch) fetchDashboard()
  }, [fetchDashboard, autoFetch])

  return {
    dashboard,
    isLoading,
    error,
    refresh: fetchDashboard,
  }
}
