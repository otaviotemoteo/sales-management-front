'use client'

import { Card } from '@/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid } from 'recharts'

interface SalesEvolutionChartProps {
  data: Array<{
    date: string
    sales: number
    revenue: number
  }>
}

const chartConfig = {
  revenue: { label: 'Faturamento (R$)', color: 'var(--color-primary)' },
  sales: { label: 'Vendas', color: 'var(--color-chart-2)' },
}

export function SalesEvolutionChart({ data }: SalesEvolutionChartProps) {
  return (
    <Card className="p-6">
      <h3 className="font-semibold text-foreground mb-6">Evolução de Vendas</h3>
      <ChartContainer config={chartConfig} className="h-72 w-full">
        <AreaChart data={data} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="gradAdminRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gradAdminSales" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-chart-2)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="var(--color-chart-2)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12, fill: 'var(--color-muted-foreground)' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            yAxisId="revenue"
            orientation="right"
            tick={{ fontSize: 11, fill: 'var(--color-muted-foreground)' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `R$${(v / 1000).toFixed(0)}k`}
          />
          <YAxis
            yAxisId="sales"
            orientation="left"
            tick={{ fontSize: 11, fill: 'var(--color-muted-foreground)' }}
            axisLine={false}
            tickLine={false}
            allowDecimals={false}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Area
            yAxisId="revenue"
            type="monotone"
            dataKey="revenue"
            stroke="var(--color-primary)"
            strokeWidth={2}
            fill="url(#gradAdminRevenue)"
          />
          <Area
            yAxisId="sales"
            type="monotone"
            dataKey="sales"
            stroke="var(--color-chart-2)"
            strokeWidth={2}
            fill="url(#gradAdminSales)"
          />
        </AreaChart>
      </ChartContainer>
    </Card>
  )
}
