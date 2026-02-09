'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MoreVertical } from 'lucide-react'

interface Sale {
  id: string
  date: string
  customer: string
  items: number
  total: number
  status: 'pending' | 'completed' | 'cancelled'
}

interface SalesListProps {
  sales: Sale[]
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
}

export function SalesList({ sales, onEdit, onDelete }: SalesListProps) {
  return (
    <div className="space-y-4">
      {sales.map((sale) => (
        <Card key={sale.id} className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">{sale.customer}</h3>
              <p className="text-sm text-muted-foreground">{sale.date}</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-right">
                <p className="font-semibold text-foreground">R$ {sale.total.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground">{sale.items} itens</p>
              </div>
              <Badge variant={sale.status === 'completed' ? 'default' : 'secondary'}>
                {sale.status}
              </Badge>
              <Button variant="ghost" size="sm">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
