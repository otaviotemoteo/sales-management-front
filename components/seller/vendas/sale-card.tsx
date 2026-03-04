'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface Product {
  name: string
  quantity: number
  unitPrice: number
  total: number
}

interface SaleCardProps {
  id: string
  customer: string
  date: string
  amount: number
  status: 'pending' | 'completed' | 'cancelled'
  paymentMethod: string
  products: Product[]
  onView?: () => void
}

const statusLabel: Record<string, string> = {
  completed: 'Concluída',
  pending: 'Pendente',
  cancelled: 'Cancelada',
}

const paymentLabels: Record<string, string> = {
  credit: 'Cartão de Crédito',
  pix: 'PIX',
  debit: 'Cartão de Débito',
  cash: 'Dinheiro',
}

export function SaleCard({ customer, date, amount, status, paymentMethod, products, onView }: SaleCardProps) {
  const MAX_VISIBLE = 3
  const visibleProducts = products.slice(0, MAX_VISIBLE)
  const hiddenCount = products.length - MAX_VISIBLE

  return (
    <Card className="p-4 gap-0 h-full hover:shadow-md transition-shadow flex flex-col">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground">{customer}</h3>
          <p className="text-xs text-muted-foreground mt-1">{date}</p>
          {status === 'completed' && (
            <span className="inline-flex items-center mt-2 px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700 border border-green-200">
              Pago com {paymentLabels[paymentMethod] ?? paymentMethod}
            </span>
          )}
          {status === 'pending' && (
            <span className="inline-flex items-center mt-2 px-2 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-700 border border-orange-200">
              Pagamento pendente
            </span>
          )}
        </div>
        <Badge
          className="mr-8 shrink-0"
          variant={status === 'completed' ? 'default' : status === 'pending' ? 'secondary' : 'destructive'}
        >
          {statusLabel[status] ?? status}
        </Badge>
      </div>
      <div className="flex-1 flex flex-col pt-3 border-t border-border">
        <div className="flex-1 space-y-1.5 mb-2">
          {visibleProducts.map((product, i) => (
            <div key={i} className="flex items-start justify-between gap-2">
              <span className="text-sm text-muted-foreground truncate flex-1">
                {product.quantity > 1 ? `${product.quantity}x ` : ''}{product.name}
              </span>
              <span className="text-sm text-foreground font-medium shrink-0">
                R$ {product.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
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
            R$ {amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
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