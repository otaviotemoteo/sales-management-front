'use client'

import { Card } from '@/components/ui/card'
import { TrendingUp, TrendingDown } from 'lucide-react'

interface PerformanceCardProps {
  title: string
  value: string | number
  change: number
  changeType: 'increase' | 'decrease'
  unit?: string
}

export function PerformanceCard({
  title,
  value,
  change,
  changeType,
  unit,
}: PerformanceCardProps) {
  const isPositive = changeType === 'increase'
  const Icon = isPositive ? TrendingUp : TrendingDown
  const color = isPositive ? 'text-green-600' : 'text-red-600'

  return (
    <Card className="p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <p className="text-3xl font-bold text-foreground">{value}</p>
          {unit && <p className="text-xs text-muted-foreground mt-1">{unit}</p>}
        </div>
        <div className={`flex items-center gap-1 px-2 py-1 rounded-lg ${isPositive ? 'bg-green-50' : 'bg-red-50'}`}>
          <Icon className={`w-4 h-4 ${color}`} />
          <span className={`text-sm font-semibold ${color}`}>{Math.abs(change)}%</span>
        </div>
      </div>
    </Card>
  )
}
