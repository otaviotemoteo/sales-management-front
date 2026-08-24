'use client'

import { Card } from '@/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { PieChart, Pie, Cell } from 'recharts'

interface PaymentMethodsChartProps {
  methods: Array<{
    name: string
    value: number
    color: string
  }>
}

export function PaymentMethodsChart({ methods }: PaymentMethodsChartProps) {
  const chartConfig = Object.fromEntries(
    methods.map((m) => [m.name, { label: m.name, color: m.color }])
  )

  return (
    <Card className="p-6">
      <h3 className="font-semibold text-foreground mb-6">Formas de Pagamento</h3>
      <div className="flex flex-col sm:flex-row items-center gap-6">
        <ChartContainer config={chartConfig} className="h-48 w-48 shrink-0">
          <PieChart>
            <Pie data={methods} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={72} strokeWidth={2}>
              {methods.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Pie>
            <ChartTooltip content={<ChartTooltipContent />} />
          </PieChart>
        </ChartContainer>
        <div className="flex flex-col gap-2 w-full">
          {methods.map((method, idx) => (
            <div key={idx} className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full shrink-0" style={{ background: method.color }} />
                <span className="text-sm text-foreground">{method.name}</span>
              </div>
              <span className="text-sm font-semibold text-foreground">{method.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}
