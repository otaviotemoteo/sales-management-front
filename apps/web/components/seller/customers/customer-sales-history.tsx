'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Loader2 } from 'lucide-react'
import type { SaleResponse } from '@/types/sale'
import { SALE_STATUS_LABELS, formatSaleId, formatDate, formatCurrency } from '@/lib/constants'
import * as salesService from '@/services/sales.service'

interface CustomerSalesHistoryProps {
  customerId: number
}

export function CustomerSalesHistory({ customerId }: CustomerSalesHistoryProps) {
  const [sales, setSales] = useState<SaleResponse[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!customerId) return
    setIsLoading(true)
    const endDate = new Date().toISOString()
    const startDate = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString()
    salesService.getCustomerStatement(customerId, startDate, endDate)
      .then(setSales)
      .catch(() => setSales([]))
      .finally(() => setIsLoading(false))
  }, [customerId])

  return (
    <Card className="p-6">
      <h3 className="font-semibold text-foreground mb-4">Sales history</h3>
      {isLoading ? (
        <div className="flex items-center justify-center py-6">
          <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
        </div>
      ) : sales.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-6">
          Nenhuma venda registrada
        </p>
      ) : (
        <div className="space-y-3">
          {sales.map((sale) => (
            <div key={sale.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
              <div className="flex-1">
                <p className="font-medium text-foreground">Sale #{formatSaleId(sale.id)}</p>
                <p className="text-xs text-muted-foreground">{formatDate(sale.saleDate)}</p>
              </div>
              <div className="flex items-center gap-2">
                <p className="font-semibold text-foreground">{formatCurrency(sale.finalAmount)}</p>
                <Badge variant={sale.status === 'CONFIRMED' ? 'default' : sale.status === 'PENDING' ? 'secondary' : 'destructive'}>
                  {SALE_STATUS_LABELS[sale.status] ?? sale.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  )
}
