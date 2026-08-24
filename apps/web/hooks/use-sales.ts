'use client'

import { useState, useEffect, useCallback } from 'react'
import type { SaleResponse, CreateSaleRequest } from '@/types/sale'
import type { PageResponse } from '@/types/api'
import * as salesService from '@/services/sales.service'

interface UseSalesOptions {
  page?: number
  size?: number
  own?: boolean
  autoFetch?: boolean
}

export function useSales(options: UseSalesOptions = {}) {
  const { page = 0, size = 20, own = true, autoFetch = true } = options

  const [data, setData] = useState<PageResponse<SaleResponse> | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchSales = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const result = own
        ? await salesService.getMySales({ page, size })
        : await salesService.getAllSales({ page, size })
      setData(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar vendas')
    } finally {
      setIsLoading(false)
    }
  }, [page, size, own])

  useEffect(() => {
    if (autoFetch) fetchSales()
  }, [fetchSales, autoFetch])

  const createSale = async (input: CreateSaleRequest) => {
    const newSale = await salesService.createSale(input)
    await fetchSales()
    return newSale
  }

  const cancelSale = async (id: number) => {
    await salesService.cancelSale(id)
    await fetchSales()
  }

  const markPaid = async (id: number) => {
    const updated = await salesService.markPaid(id)
    await fetchSales()
    return updated
  }

  return {
    sales: data?.content ?? [],
    pagination: data ? {
      page: data.number,
      totalPages: data.totalPages,
      totalElements: data.totalElements,
    } : null,
    isLoading,
    error,
    refresh: fetchSales,
    createSale,
    cancelSale,
    markPaid,
  }
}
