'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface SaleCardProps {
  id: string
  customer: string
  date: string
  amount: number
  status: 'pending' | 'completed' | 'cancelled'
  items: number
  onView?: () => void
}

export function SaleCard({ id, customer, date, amount, status, items, onView }: SaleCardProps) {
  return (
    <Card className="p-4 hover:shadow-md transition-shadow flex flex-col">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-foreground">{customer}</h3>
          <p className="text-xs text-muted-foreground mt-1">{date}</p>
        </div>
        <Badge
          className="mr-8"
          variant={status === 'completed' ? 'default' : status === 'pending' ? 'secondary' : 'destructive'}
        >
          {status}
        </Badge>
      </div>
      <div className="pt-4 border-t border-border flex justify-between items-end mb-4">
        <span className="text-sm text-muted-foreground">{items} produtos</span>
        <span className="font-bold text-lg text-foreground">R$ {amount.toFixed(2)}</span>
      </div>
      <div className="border-t border-border pt-3 mt-auto">
        <Button variant="outline" size="sm" className="w-full" onClick={onView}>
          Ver Detalhes
        </Button>
      </div>
    </Card>
  )
}
