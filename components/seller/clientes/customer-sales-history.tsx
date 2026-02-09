'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface Sale {
  id: string
  date: string
  amount: number
  status: 'pending' | 'completed' | 'cancelled'
}

interface CustomerSalesHistoryProps {
  sales: Sale[]
  customerId: string
}

export function CustomerSalesHistory({ sales, customerId }: CustomerSalesHistoryProps) {
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
                <p className="font-medium text-foreground">Venda #{sale.id}</p>
                <p className="text-xs text-muted-foreground">{sale.date}</p>
              </div>
              <div className="flex items-center gap-2">
                <p className="font-semibold text-foreground">R$ {sale.amount.toFixed(2)}</p>
                <Badge variant={sale.status === 'completed' ? 'default' : 'secondary'}>
                  {sale.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  )
}
