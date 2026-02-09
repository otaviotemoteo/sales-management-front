'use client'

import { Card } from '@/components/ui/card'

interface SalesChartProps {
  data: Array<{
    date: string
    sales: number
    revenue: number
  }>
}

export function SalesChart({ data }: SalesChartProps) {
  return (
    <Card className="p-6">
      <h3 className="font-semibold text-foreground mb-6">Vendas por Período</h3>
      <div className="w-full h-96 flex items-center justify-center text-muted-foreground">
        {/* Placeholder for chart library (recharts, chart.js, etc.) */}
        <p>Gráfico de vendas será exibido aqui</p>
      </div>
    </Card>
  )
}
