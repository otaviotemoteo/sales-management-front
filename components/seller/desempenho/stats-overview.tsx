'use client'

import { Card } from '@/components/ui/card'
import { DollarSign, TrendingUp, Users, ShoppingCart } from 'lucide-react'

interface StatsOverviewProps {
  totalSales: number
  totalRevenue: number
  totalCustomers: number
  averageTicket: number
}

export function StatsOverview({
  totalSales,
  totalRevenue,
  totalCustomers,
  averageTicket,
}: StatsOverviewProps) {
  const stats = [
    {
      icon: ShoppingCart,
      label: 'Total de Vendas',
      value: totalSales,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      icon: DollarSign,
      label: 'Faturamento',
      value: `R$ ${totalRevenue.toFixed(2)}`,
      color: 'bg-green-100 text-green-600',
    },
    {
      icon: Users,
      label: 'Clientes',
      value: totalCustomers,
      color: 'bg-purple-100 text-purple-600',
    },
    {
      icon: TrendingUp,
      label: 'Ticket Médio',
      value: `R$ ${averageTicket.toFixed(2)}`,
      color: 'bg-orange-100 text-orange-600',
    },
  ]

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, idx) => {
        const Icon = stat.icon
        return (
          <Card key={idx} className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              </div>
              <div className={`p-2 rounded-lg ${stat.color}`}>
                <Icon className="w-5 h-5" />
              </div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
