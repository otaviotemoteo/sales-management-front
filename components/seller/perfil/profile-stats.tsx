'use client'

import { Card } from '@/components/ui/card'
import { TrendingUp, Target, Award, Clock } from 'lucide-react'

interface Stat {
  icon: React.ReactNode
  label: string
  value: string | number
  color: string
}

interface ProfileStatsProps {
  totalSales: number
  totalRevenue: number
  averageRating: number
  joinDate: string
}

export function ProfileStats({
  totalSales,
  totalRevenue,
  averageRating,
  joinDate,
}: ProfileStatsProps) {
  const stats: Stat[] = [
    {
      icon: <TrendingUp className="w-5 h-5" />,
      label: 'Total de Vendas',
      value: totalSales,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      icon: <Target className="w-5 h-5" />,
      label: 'Faturamento Total',
      value: `R$ ${totalRevenue.toFixed(2)}`,
      color: 'bg-green-100 text-green-600',
    },
    {
      icon: <Award className="w-5 h-5" />,
      label: 'Avaliação Média',
      value: `${averageRating.toFixed(1)} ⭐`,
      color: 'bg-yellow-100 text-yellow-600',
    },
    {
      icon: <Clock className="w-5 h-5" />,
      label: 'Membro desde',
      value: joinDate,
      color: 'bg-purple-100 text-purple-600',
    },
  ]

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, idx) => (
        <Card key={idx} className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            </div>
            <div className={`p-2 rounded-lg ${stat.color}`}>
              {stat.icon}
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
