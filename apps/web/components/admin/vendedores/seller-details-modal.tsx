'use client'

import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { ShoppingCart, DollarSign, Users, Star, TrendingUp, Calendar } from 'lucide-react'

interface SellerDetailsModalProps {
  seller: {
    id: string
    fullName: string
    email: string
    phone: string
    status: 'active' | 'inactive'
    joinedAt: string
    stats: {
      totalSales: number
      totalRevenue: number
      totalCustomers: number
      averageTicket: number
      rating: number
    }
  }
}

export function SellerDetailsModal({ seller }: SellerDetailsModalProps) {
  const initials = seller.fullName
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase()

  const stats = [
    { icon: ShoppingCart, label: 'Total de Vendas', value: seller.stats.totalSales, color: 'bg-blue-100 text-blue-600' },
    {
      icon: DollarSign,
      label: 'Faturamento',
      value: `R$ ${seller.stats.totalRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
      color: 'bg-green-100 text-green-600',
    },
    { icon: Users, label: 'Clientes', value: seller.stats.totalCustomers, color: 'bg-purple-100 text-purple-600' },
    {
      icon: TrendingUp,
      label: 'Ticket Médio',
      value: `R$ ${seller.stats.averageTicket.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
      color: 'bg-orange-100 text-orange-600',
    },
  ]

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg shrink-0">
          {initials}
        </div>
        <div>
          <h3 className="font-semibold text-foreground text-lg">{seller.fullName}</h3>
          <p className="text-sm text-muted-foreground">{seller.email}</p>
          <p className="text-sm text-muted-foreground">{seller.phone}</p>
        </div>
        <Badge variant={seller.status === 'active' ? 'default' : 'secondary'} className="ml-auto">
          {seller.status === 'active' ? 'Ativo' : 'Inativo'}
        </Badge>
      </div>

      {/* Join date + Rating */}
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <Calendar className="w-4 h-4" />
          Desde {new Date(seller.joinedAt).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
        </span>
        <span className="flex items-center gap-1.5">
          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
          {seller.stats.rating.toFixed(1)} de avaliação
        </span>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3">
        {stats.map((stat, idx) => {
          const Icon = stat.icon
          return (
            <Card key={idx} className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
                  <p className="font-bold text-foreground">{stat.value}</p>
                </div>
                <div className={`p-1.5 rounded-lg ${stat.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
