'use client'

import { Card } from '@/components/ui/card'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'

interface SalesStatus {
  status: string
  count: number
  percentage: number
}

interface SalesStatusChartProps {
  statuses: SalesStatus[]
}

const COLORS: Record<string, string> = {
  'Completed': '#22c55e',
  'Pendente': '#eab308',
  'Cancelada': '#ef4444',
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const d = payload[0].payload
    return (
      <div className="bg-background border border-border rounded-md px-3 py-2 text-sm shadow-md">
        <p className="font-medium text-foreground">{d.status}</p>
        <p className="text-muted-foreground">{d.count} vendas ({d.percentage}%)</p>
      </div>
    )
  }
  return null
}

export function SalesStatusChart({ statuses }: SalesStatusChartProps) {
  const total = statuses.reduce((acc, s) => acc + s.count, 0)

  return (
    <Card className="p-6">
      <h3 className="font-semibold text-foreground mb-1">Sales status</h3>
      <p className="text-sm text-muted-foreground mb-4">{total} sales in the period</p>

      <div className="flex items-center gap-6">
        <div className="shrink-0">
          <ResponsiveContainer width={140} height={140}>
            <PieChart>
              <Pie
                data={statuses}
                dataKey="count"
                nameKey="status"
                cx="50%"
                cy="50%"
                innerRadius={42}
                outerRadius={65}
                strokeWidth={2}
                stroke="var(--background)"
              >
                {statuses.map((entry) => (
                  <Cell key={entry.status} fill={COLORS[entry.status] ?? '#94a3b8'} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex-1 space-y-3">
          {statuses.map((entry) => (
            <div key={entry.status} className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: COLORS[entry.status] ?? '#94a3b8' }}
                />
                <span className="text-sm text-foreground">{entry.status}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">{entry.count}</span>
                <span className="font-semibold text-foreground w-9 text-right">{entry.percentage}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}
