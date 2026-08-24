'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Calendar } from 'lucide-react'

type Period = 'day' | 'week' | 'month' | 'year'

interface PeriodSelectorProps {
  selectedPeriod: Period
  onPeriodChange: (period: Period) => void
}

export function PeriodSelector({ selectedPeriod, onPeriodChange }: PeriodSelectorProps) {
  const periods: { label: string; value: Period }[] = [
    { label: 'Hoje', value: 'day' },
    { label: 'Semana', value: 'week' },
    { label: 'Mês', value: 'month' },
    { label: 'Ano', value: 'year' },
  ]

  return (
    <Card className="p-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span className="text-sm font-medium">Período</span>
        </div>
        <div className="flex gap-2">
          {periods.map((period) => (
            <Button
              key={period.value}
              variant={selectedPeriod === period.value ? 'default' : 'outline'}
              size="sm"
              onClick={() => onPeriodChange(period.value)}
            >
              {period.label}
            </Button>
          ))}
        </div>
      </div>
    </Card>
  )
}
