'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock } from 'lucide-react'

interface PendingPayment {
  id: string
  customer: string
  seller: string
  amount: number
  date: string
}

interface PendingPaymentsListProps {
  payments: PendingPayment[]
}

export function PendingPaymentsList({ payments }: PendingPaymentsListProps) {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-4 h-4 text-red-500" />
        <h3 className="font-semibold text-foreground">Pagamentos Pendentes</h3>
        <Badge variant="destructive" className="ml-auto text-xs">{payments.length}</Badge>
      </div>
      {payments.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-8">Nenhum pagamento pendente</p>
      ) : (
        <div className="space-y-3">
          {payments.map((payment) => (
            <div key={payment.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{payment.customer}</p>
                <p className="text-xs text-muted-foreground">
                  {payment.id} · {payment.seller}
                </p>
              </div>
              <div className="text-right shrink-0 ml-3">
                <p className="text-sm font-semibold text-foreground">
                  R$ {payment.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
                <p className="text-xs text-muted-foreground">{payment.date}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  )
}
