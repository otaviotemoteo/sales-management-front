'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MapPin, Phone, Mail } from 'lucide-react'
import { CustomerActionsMenu } from './customer-actions-menu'

interface LastSaleInfo {
  date: string
  items: number
  productName?: string
  amount: number
}

interface CustomerCardProps {
  id: string
  name: string
  email: string
  phone: string
  city: string
  totalSpent: number
  lastSaleInfo: LastSaleInfo | null
  onView?: () => void
  onEdit?: () => void
  onDelete?: () => void
}

function getPurchaseRecency(date: string) {
  const [d, m, y] = date.split('/').map(Number)
  const days = Math.floor((Date.now() - new Date(y, m - 1, d).getTime()) / 86_400_000)
  if (days <= 30) return { label: 'Recente', className: 'bg-green-100 text-green-700 border border-green-200' }
  if (days <= 90) return { label: 'Ativo', className: 'bg-blue-100 text-blue-700 border border-blue-200' }
  return { label: 'Inativo', className: 'bg-orange-100 text-orange-700 border border-orange-200' }
}

export function CustomerCard({
  id,
  name,
  email,
  phone,
  city,
  totalSpent,
  lastSaleInfo,
  onView,
  onEdit,
  onDelete,
}: CustomerCardProps) {
  const recency = lastSaleInfo ? getPurchaseRecency(lastSaleInfo.date) : null

  return (
    <Card className="p-4 gap-0 h-full hover:shadow-md transition-shadow flex flex-col">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground">{name}</h3>
          <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
            <MapPin className="w-3 h-3" />
            {city}
          </p>
        </div>
        <div className="flex items-center shrink-0">
          {recency && (
            <span className={`mr-1 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${recency.className}`}>
              {recency.label}
            </span>
          )}
          <CustomerActionsMenu
            customerId={id}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </div>
      </div>

      <div className="space-y-2 text-sm pb-3 border-b border-border">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Mail className="w-3 h-3" />
          {email}
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Phone className="w-3 h-3" />
          {phone}
        </div>
      </div>

      <div className="flex-1 flex flex-col pt-3">
        <div className="flex-1">
          <p className="text-xs text-muted-foreground mb-1">Última compra</p>
          {lastSaleInfo ? (
            <p className="text-xs text-foreground truncate">
              {lastSaleInfo.date}
              {' - '}
              {lastSaleInfo.productName ?? `${lastSaleInfo.items} produtos`}
              {' · '}
              R$ {lastSaleInfo.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
          ) : (
            <p className="text-xs text-muted-foreground italic">Nenhuma compra realizada ainda</p>
          )}
        </div>
        <div className="flex justify-between items-center pt-2 border-t border-border mt-2">
          <span className="text-sm font-semibold text-foreground">Gasto Total</span>
          <span className="font-bold text-lg text-foreground">
            R$ {totalSpent.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
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
