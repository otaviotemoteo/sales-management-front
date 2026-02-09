'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MoreVertical, MapPin, Phone, Mail } from 'lucide-react'

interface CustomerCardProps {
  id: string
  name: string
  email: string
  phone: string
  city: string
  totalSpent: number
  lastPurchase: string
  onEdit?: () => void
  onDelete?: () => void
}

export function CustomerCard({
  id,
  name,
  email,
  phone,
  city,
  totalSpent,
  lastPurchase,
  onEdit,
  onDelete,
}: CustomerCardProps) {
  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-foreground">{name}</h3>
          <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
            <MapPin className="w-3 h-3" />
            {city}
          </p>
        </div>
        <Button variant="ghost" size="sm">
          <MoreVertical className="w-4 h-4" />
        </Button>
      </div>

      <div className="space-y-2 text-sm mb-4 pb-4 border-b border-border">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Mail className="w-3 h-3" />
          {email}
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Phone className="w-3 h-3" />
          {phone}
        </div>
      </div>

      <div className="flex justify-between items-end">
        <div>
          <p className="text-xs text-muted-foreground">Gasto Total</p>
          <p className="font-bold text-foreground">R$ {totalSpent.toFixed(2)}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted-foreground">Última compra</p>
          <p className="text-xs text-foreground">{lastPurchase}</p>
        </div>
      </div>
    </Card>
  )
}
