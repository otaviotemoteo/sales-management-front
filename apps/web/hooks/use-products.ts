'use client'

import { useState, useEffect, useCallback } from 'react'
import type { ProductResponse } from '@/types/product'
import type { PageResponse } from '@/types/api'
import * as productsService from '@/services/products.service'

interface UseProductsOptions {
  page?: number
  size?: number
  sortBy?: string
  direction?: 'ASC' | 'DESC'
  autoFetch?: boolean
}

export function useProducts(options: UseProductsOptions = {}) {
  const { page = 0, size = 20, sortBy = 'name', direction = 'ASC', autoFetch = true } = options

  const [data, setData] = useState<PageResponse<ProductResponse> | null>(null)
  const [categories, setCategories] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchProducts = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const result = await productsService.getProducts({ page, size, sortBy, direction })
      setData(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not load products')
    } finally {
      setIsLoading(false)
    }
  }, [page, size, sortBy, direction])

  const fetchCategories = useCallback(async () => {
    try {
      const cats = await productsService.getCategories()
      setCategories(cats)
    } catch {
      // Non-critical, ignore
    }
  }, [])

  useEffect(() => {
    if (autoFetch) {
      fetchProducts()
      fetchCategories()
    }
  }, [fetchProducts, fetchCategories, autoFetch])

  const searchProducts = async (query: string) => {
    setIsLoading(true)
    setError(null)
    try {
      const result = await productsService.searchProducts(query, { page: 0, size })
      setData(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not search products')
    } finally {
      setIsLoading(false)
    }
  }

  return {
    products: data?.content ?? [],
    categories,
    pagination: data ? {
      page: data.number,
      totalPages: data.totalPages,
      totalElements: data.totalElements,
    } : null,
    isLoading,
    error,
    refresh: fetchProducts,
    searchProducts,
  }
}
