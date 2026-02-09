'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { DollarSign, Zap, CreditCard, Banknote } from 'lucide-react'

const paymentMethods = [
  { id: 'cash', label: 'Dinheiro', icon: DollarSign },
  { id: 'pix', label: 'PIX', icon: Zap },
  { id: 'debit', label: 'Débito', icon: CreditCard },
  { id: 'credit', label: 'Crédito', icon: Banknote },
]

interface PaymentMethodSelectorProps {
  selected?: string
  onChange?: (method: string) => void
}

export function PaymentMethodSelector({ selected, onChange }: PaymentMethodSelectorProps) {
  return (
    <Card className="p-6">
      <h3 className="font-semibold text-foreground mb-4">Forma de Pagamento</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {paymentMethods.map((method) => {
          const Icon = method.icon
          return (
            <Button
              key={method.id}
              variant={selected === method.id ? 'default' : 'outline'}
              className="flex flex-col gap-2 h-auto py-4"
              onClick={() => onChange?.(method.id)}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs">{method.label}</span>
            </Button>
          )
        })}
      </div>
    </Card>
  )
}
