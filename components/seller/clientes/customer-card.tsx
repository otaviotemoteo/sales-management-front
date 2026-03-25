'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MapPin, Phone, Mail } from 'lucide-react'
import { CustomerActionsMenu } from './customer-actions-menu'
import type { CustomerResponse } from '@/types/customer'

interface CustomerCardProps {
  customer: CustomerResponse
  onView?: () => void
  onEdit?: () => void
  onDelete?: () => void
}

export function CustomerCard({ customer, onView, onEdit, onDelete }: CustomerCardProps) {
  return (
    <Card className="p-4 gap-0 h-full hover:shadow-md transition-shadow flex flex-col">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground">{customer.name}</h3>
          {customer.address && (
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <MapPin className="w-3 h-3" />
              {customer.address}
            </p>
          )}
        </div>
        <div className="flex items-center shrink-0">
          <CustomerActionsMenu
            customerId={String(customer.id)}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </div>
      </div>

      <div className="space-y-2 text-sm pb-3 border-b border-border">
        {customer.email && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Mail className="w-3 h-3" />
            {customer.email}
          </div>
        )}
        {customer.phone && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Phone className="w-3 h-3" />
            {customer.phone}
          </div>
        )}
      </div>

      <div className="flex-1 flex flex-col pt-3">
        <div className="flex-1">
          <p className="text-xs text-muted-foreground mb-1">Cadastrado por</p>
          <p className="text-xs text-foreground">{customer.createdByUsername}</p>
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
