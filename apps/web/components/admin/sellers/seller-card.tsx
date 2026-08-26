'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { SellerActionsMenu } from './seller-actions-menu'

interface SellerCardProps {
  id: string
  fullName: string
  email: string
  phone: string
  status: 'active' | 'inactive'
  stats: {
    totalSales: number
    totalRevenue: number
    averageTicket: number
  }
  onViewDetails: () => void
  onEdit: () => void
  onToggleActive: () => void
}

export function SellerCard({
  fullName,
  email,
  phone,
  status,
  stats,
  onViewDetails,
  onEdit,
  onToggleActive,
}: SellerCardProps) {
  const initials = fullName
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase()

  return (
    <Card className="p-4 hover:shadow-md transition-shadow flex flex-col">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm shrink-0">
            {initials}
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold text-foreground text-sm leading-tight truncate">{fullName}</h3>
            <p className="text-xs text-muted-foreground truncate">{email}</p>
          </div>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <Badge variant={status === 'active' ? 'default' : 'secondary'} className="text-xs">
            {status === 'active' ? 'Ativo' : 'Inativo'}
          </Badge>
          <SellerActionsMenu
            active={status === 'active'}
            onViewDetails={onViewDetails}
            onEdit={onEdit}
            onToggleActive={onToggleActive}
          />
        </div>
      </div>

      <div className="pt-3 border-t border-border grid grid-cols-3 gap-2 mb-4">
        <div className="text-center">
          <p className="text-xs text-muted-foreground mb-0.5">Sales</p>
          <p className="font-bold text-foreground text-sm">{stats.totalSales}</p>
        </div>
        <div className="text-center border-x border-border">
          <p className="text-xs text-muted-foreground mb-0.5">Faturamento</p>
          <p className="font-bold text-foreground text-sm">
            R${(stats.totalRevenue / 1000).toFixed(1)}k
          </p>
        </div>
        <div className="text-center">
          <p className="text-xs text-muted-foreground mb-0.5">Average ticket</p>
          <p className="font-bold text-foreground text-sm">
            R$ {stats.averageTicket.toLocaleString('pt-BR', { minimumFractionDigits: 0 })}
          </p>
        </div>
      </div>

      <div className="border-t border-border pt-3 mt-auto">
        <Button variant="outline" size="sm" className="w-full" onClick={onViewDetails}>
          Ver Detalhes
        </Button>
      </div>
    </Card>
  )
}
