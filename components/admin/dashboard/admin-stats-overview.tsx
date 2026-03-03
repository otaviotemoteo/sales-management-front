'use client'

import { Card } from '@/components/ui/card'
import { ShoppingCart, DollarSign, Users, UserCheck, Package, Clock } from 'lucide-react'

interface AdminStatsOverviewProps {
  totalSales: number
  totalRevenue: number
  totalCustomers: number
  activeSellers: number
  totalProducts: number
  pendingPaymentsCount: number
  pendingPaymentsValue: number
}

export function AdminStatsOverview({
  totalSales,
  totalRevenue,
  totalCustomers,
  activeSellers,
  totalProducts,
  pendingPaymentsCount,
  pendingPaymentsValue,
}: AdminStatsOverviewProps) {
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
      value: `R$ ${totalRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
      color: 'bg-green-100 text-green-600',
    },
    {
      icon: Users,
      label: 'Clientes',
      value: totalCustomers,
      color: 'bg-purple-100 text-purple-600',
    },
    {
      icon: UserCheck,
      label: 'Vendedores Ativos',
      value: activeSellers,
      color: 'bg-indigo-100 text-indigo-600',
    },
    {
      icon: Package,
      label: 'Produtos',
      value: totalProducts,
      color: 'bg-orange-100 text-orange-600',
    },
    {
      icon: Clock,
      label: 'Pagtos. Pendentes',
      value: `${pendingPaymentsCount} (R$ ${pendingPaymentsValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })})`,
      color: 'bg-red-100 text-red-600',
    },
  ]

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
