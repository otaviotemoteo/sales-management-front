'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { SaleResponse } from '@/types/sale'
import { SALE_STATUS_LABELS, formatSaleId, formatDate, formatCurrency } from '@/lib/constants'

interface CustomerSalesHistoryProps {
  sales: SaleResponse[]
  customerId: number
}

export function CustomerSalesHistory({ sales }: CustomerSalesHistoryProps) {
  return (
    <Card className="p-6">
      <h3 className="font-semibold text-foreground mb-4">Histórico de Vendas</h3>
      {sales.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-6">
          Nenhuma venda registrada
        </p>
      ) : (
        <div className="space-y-3">
          {sales.map((sale) => (
            <div key={sale.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
              <div className="flex-1">
                <p className="font-medium text-foreground">Venda #{formatSaleId(sale.id)}</p>
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
