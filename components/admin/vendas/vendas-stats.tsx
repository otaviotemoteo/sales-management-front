'use client'

import { Card } from '@/components/ui/card'
import { ShoppingCart, DollarSign, Clock, TrendingUp } from 'lucide-react'

interface VendasStatsProps {
  totalSales: number
  totalRevenue: number
  pendingValue: number
  completionRate: number
  paymentBreakdown: Array<{ name: string; pct: number }>
}

const paymentColors: Record<string, string> = {
  pix: 'bg-primary',
  credit: 'bg-chart-2',
  debit: 'bg-chart-3',
  cash: 'bg-chart-4',
}

const paymentLabels: Record<string, string> = {
  pix: 'PIX',
  credit: 'Crédito',
  debit: 'Débito',
  cash: 'Dinheiro',
}

export function VendasStats({ totalSales, totalRevenue, pendingValue, completionRate, paymentBreakdown }: VendasStatsProps) {
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
      icon: Clock,
      label: 'Valor Pendente',
      value: `R$ ${pendingValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
      color: 'bg-yellow-100 text-yellow-600',
    },
    {
      icon: TrendingUp,
      label: 'Taxa de Conclusão',
      value: `${completionRate.toFixed(1)}%`,
      color: 'bg-emerald-100 text-emerald-600',
    },
  ]

  return (
    <div className="space-y-4">
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

      {paymentBreakdown.length > 0 && (
        <Card className="p-4">
          <p className="text-sm font-medium text-foreground mb-3">Formas de Pagamento</p>
          {/* Stacked bar */}
          <div className="flex h-3 w-full rounded-full overflow-hidden gap-px mb-3">
            {paymentBreakdown.map((method) => (
              <div
                key={method.name}
                className={`${paymentColors[method.name] ?? 'bg-muted'} transition-all`}
                style={{ width: `${method.pct}%` }}
              />
            ))}
          </div>
          {/* Legend */}
          <div className="flex flex-wrap gap-x-5 gap-y-1.5">
            {paymentBreakdown.map((method) => (
              <div key={method.name} className="flex items-center gap-1.5">
                <span className={`w-2.5 h-2.5 rounded-sm shrink-0 ${paymentColors[method.name] ?? 'bg-muted'}`} />
                <span className="text-xs text-muted-foreground">
                  {paymentLabels[method.name] ?? method.name}
                </span>
                <span className="text-xs font-semibold text-foreground">{method.pct.toFixed(0)}%</span>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}
