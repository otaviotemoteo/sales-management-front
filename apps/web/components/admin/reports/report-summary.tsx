'use client'

import { Card } from '@/components/ui/card'
import { ShoppingCart, DollarSign, Clock, CheckCircle } from 'lucide-react'

interface ReportSummaryProps {
  totalSales: number
  totalRevenue: number
  pendingCount: number
  completedCount: number
}

export function ReportSummary({ totalSales, totalRevenue, pendingCount, completedCount }: ReportSummaryProps) {
  const stats = [
    {
      icon: ShoppingCart,
      label: 'Total sales',
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
      icon: CheckCircle,
      label: 'Completed',
      value: completedCount,
      color: 'bg-emerald-100 text-emerald-600',
    },
    {
      icon: Clock,
      label: 'Pendentes',
      value: pendingCount,
      color: 'bg-yellow-100 text-yellow-600',
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
