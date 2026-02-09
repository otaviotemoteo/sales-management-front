'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface SaleCardProps {
  id: string
  customer: string
  date: string
  amount: number
  status: 'pending' | 'completed' | 'cancelled'
  items: number
}

export function SaleCard({ id, customer, date, amount, status, items }: SaleCardProps) {
  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="font-semibold text-foreground">{customer}</h3>
          <p className="text-xs text-muted-foreground mt-1">{date}</p>
        </div>
        <Badge variant={status === 'completed' ? 'default' : status === 'pending' ? 'secondary' : 'destructive'}>
          {status}
        </Badge>
      </div>
      <div className="mt-4 pt-4 border-t border-border flex justify-between items-end">
        <span className="text-sm text-muted-foreground">{items} produtos</span>
        <span className="font-bold text-lg text-foreground">R$ {amount.toFixed(2)}</span>
      </div>
    </Card>
  )
}
