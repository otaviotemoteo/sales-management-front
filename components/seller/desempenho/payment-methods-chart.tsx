'use client'

import { Card } from '@/components/ui/card'

interface PaymentMethod {
  method: string
  count: number
  percentage: number
}

interface PaymentMethodsChartProps {
  methods: PaymentMethod[]
}

export function PaymentMethodsChart({ methods }: PaymentMethodsChartProps) {
  return (
    <Card className="p-6">
      <h3 className="font-semibold text-foreground mb-4">Formas de Pagamento</h3>
      <div className="space-y-4">
        {methods.map((method) => (
          <div key={method.method}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">{method.method}</span>
              <span className="text-sm font-semibold text-foreground">{method.percentage}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all"
                style={{ width: `${method.percentage}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1">{method.count} transações</p>
          </div>
        ))}
      </div>
    </Card>
  )
}
