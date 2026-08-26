'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { SaleResponse } from '@/types/sale'
import { SALE_STATUS_LABELS, PAYMENT_METHOD_LABELS, formatDate, formatCurrency } from '@/lib/constants'

interface SaleCardProps {
  sale: SaleResponse
  onView?: () => void
}

export function SaleCard({ sale, onView }: SaleCardProps) {
  const MAX_VISIBLE = 3
  const visibleItems = sale.items.slice(0, MAX_VISIBLE)
  const hiddenCount = sale.items.length - MAX_VISIBLE

  const statusVariant = sale.status === 'CONFIRMED' ? 'default' : sale.status === 'PENDING' ? 'secondary' : 'destructive'

  return (
    <Card className="p-4 gap-0 h-full hover:shadow-md transition-shadow flex flex-col">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground">{sale.customer.name}</h3>
          <p className="text-xs text-muted-foreground mt-1">{formatDate(sale.saleDate)}</p>
          {sale.paymentStatus === 'PAID' ? (
            <span className="inline-flex items-center mt-2 px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700 border border-green-200">
              Pago com {PAYMENT_METHOD_LABELS[sale.paymentMethod] ?? sale.paymentMethod}
            </span>
          ) : (
            <span className="inline-flex items-center mt-2 px-2 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-700 border border-orange-200">
              Payment pendente
            </span>
          )}
        </div>
        <Badge className="mr-9 shrink-0" variant={statusVariant}>
          {SALE_STATUS_LABELS[sale.status] ?? sale.status}
        </Badge>
      </div>
      <div className="flex-1 flex flex-col pt-3 border-t border-border">
        <div className="flex-1 space-y-1.5 mb-2">
          {visibleItems.map((item) => (
            <div key={item.id} className="flex items-start justify-between gap-2">
              <span className="text-sm text-muted-foreground truncate flex-1">
                {item.quantity > 1 ? `${item.quantity}x ` : ''}{item.product.name}
              </span>
              <span className="text-sm text-foreground font-medium shrink-0">
                {formatCurrency(item.totalPrice)}
              </span>
            </div>
          ))}
          {hiddenCount > 0 && (
            <span className="text-xs text-muted-foreground">
              +{hiddenCount} {hiddenCount === 1 ? 'item' : 'itens'} a mais...
            </span>
          )}
        </div>
        <div className="flex justify-between items-center pt-2 border-t border-border">
          <span className="text-sm font-semibold text-foreground">Total</span>
          <span className="font-bold text-lg text-foreground">
            {formatCurrency(sale.finalAmount)}
          </span>
        </div>
      </div>
      <div className="border-t border-border pt-3 mt-3">
        <Button variant="outline" size="sm" className="w-full" onClick={onView}>
          Ver Detalhes
        </Button>
      </div>
    </Card>
  )
}
