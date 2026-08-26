'use client'

import { Card } from '@/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts'

interface SalesBySellerChartProps {
  data: Array<{
    name: string
    sales: number
    revenue: number
  }>
}

const chartConfig = {
  revenue: { label: 'Faturamento (R$)', color: 'var(--color-primary)' },
  sales: { label: 'Sales', color: 'var(--color-chart-2)' },
}

export function SalesBySellerChart({ data }: SalesBySellerChartProps) {
  return (
    <Card className="p-6">
      <h3 className="font-semibold text-foreground mb-6">Sales by seller</h3>
      <ChartContainer config={chartConfig} className="h-72 w-full">
        <BarChart data={data} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
          <XAxis
            dataKey="name"
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
          <Bar yAxisId="revenue" dataKey="revenue" fill="var(--color-primary)" radius={[4, 4, 0, 0]} opacity={0.85} />
          <Bar yAxisId="sales" dataKey="sales" fill="var(--color-chart-2)" radius={[4, 4, 0, 0]} opacity={0.85} />
        </BarChart>
      </ChartContainer>
    </Card>
  )
}
