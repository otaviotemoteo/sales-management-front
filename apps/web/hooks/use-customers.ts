'use client'

import { useState, useEffect, useCallback } from 'react'
import type { CustomerResponse, CreateCustomerRequest, UpdateCustomerRequest } from '@/types/customer'
import type { PageResponse } from '@/types/api'
import * as customersService from '@/services/customers.service'

interface UseCustomersOptions {
  page?: number
  size?: number
  sortBy?: string
  direction?: 'ASC' | 'DESC'
  autoFetch?: boolean
}

export function useCustomers(options: UseCustomersOptions = {}) {
  const { page = 0, size = 20, sortBy = 'name', direction = 'ASC', autoFetch = true } = options

  const [data, setData] = useState<PageResponse<CustomerResponse> | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchCustomers = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const result = await customersService.getCustomers({ page, size, sortBy, direction })
      setData(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar clientes')
    } finally {
      setIsLoading(false)
    }
  }, [page, size, sortBy, direction])

  useEffect(() => {
    if (autoFetch) fetchCustomers()
  }, [fetchCustomers, autoFetch])

  const searchCustomers = async (query: string) => {
    setIsLoading(true)
    setError(null)
    try {
      const result = await customersService.searchCustomers(query, { page: 0, size })
      setData(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao buscar clientes')
    } finally {
      setIsLoading(false)
    }
  }

  const createCustomer = async (input: CreateCustomerRequest) => {
    const newCustomer = await customersService.createCustomer(input)
    await fetchCustomers()
    return newCustomer
  }

  const updateCustomer = async (id: number, input: UpdateCustomerRequest) => {
    const updated = await customersService.updateCustomer(id, input)
    await fetchCustomers()
    return updated
  }

  const deleteCustomer = async (id: number) => {
    await customersService.deleteCustomer(id)
    await fetchCustomers()
  }

  return {
    customers: data?.content ?? [],
    pagination: data ? {
      page: data.number,
      totalPages: data.totalPages,
      totalElements: data.totalElements,
    } : null,
    isLoading,
    error,
    refresh: fetchCustomers,
    searchCustomers,
    createCustomer,
    updateCustomer,
    deleteCustomer,
  }
}
