'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'

type Status = 'completed' | 'pending' | 'cancelled'

const statusLabel: Record<Status, string> = {
  completed: 'Completed',
  pending: 'Pendente',
  cancelled: 'Cancelada',
}

const statusVariant: Record<Status, 'default' | 'secondary' | 'destructive'> = {
  completed: 'default',
  pending: 'secondary',
  cancelled: 'destructive',
}

const paymentLabel: Record<string, string> = {
  pix: 'PIX',
  credit: 'Credit',
  debit: 'Debit',
  cash: 'Dinheiro',
}

interface SaleDetailModalProps {
  sale: {
    id: string
    customer: string
    seller: string
    date: string
    amount: number
    status: Status
    paymentMethod: string
    items: number
    subtotal: number
    tax: number
    total: number
    products: Array<{
      name: string
      quantity: number
      unitPrice: number
      total: number
    }>
  } | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SaleDetailModal({ sale, open, onOpenChange }: SaleDetailModalProps) {
  if (!sale) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            {sale.id}
            <Badge variant={statusVariant[sale.status]}>{statusLabel[sale.status]}</Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5 pt-1">
          {/* Info grid */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            <div>
              <p className="text-muted-foreground text-xs mb-0.5">Customer</p>
              <p className="font-medium text-foreground">{sale.customer}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs mb-0.5">Seller</p>
              <p className="font-medium text-foreground">{sale.seller}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs mb-0.5">Data</p>
              <p className="font-medium text-foreground">{sale.date}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs mb-0.5">Payment</p>
              <p className="font-medium text-foreground">{paymentLabel[sale.paymentMethod] ?? sale.paymentMethod}</p>
            </div>
          </div>

          {/* Products */}
          <div>
            <p className="text-sm font-medium text-foreground mb-2">Products ({sale.items})</p>
            <div className="border border-border rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/50 border-b border-border">
                    <th className="text-left px-3 py-2 text-xs font-medium text-muted-foreground">Product</th>
                    <th className="text-center px-3 py-2 text-xs font-medium text-muted-foreground">Qtd</th>
                    <th className="text-right px-3 py-2 text-xs font-medium text-muted-foreground">Unit.</th>
                    <th className="text-right px-3 py-2 text-xs font-medium text-muted-foreground">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {sale.products.map((p, idx) => (
                    <tr key={idx} className="border-b border-border last:border-0">
                      <td className="px-3 py-2 text-foreground">{p.name}</td>
                      <td className="px-3 py-2 text-center text-muted-foreground">{p.quantity}</td>
                      <td className="px-3 py-2 text-right text-muted-foreground">
                        R$ {p.unitPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </td>
                      <td className="px-3 py-2 text-right font-medium text-foreground">
                        R$ {p.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Totals */}
          <div className="space-y-1.5 text-sm border-t border-border pt-3">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal</span>
              <span>R$ {sale.subtotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Taxa</span>
              <span>R$ {sale.tax.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between font-bold text-foreground text-base pt-1 border-t border-border">
              <span>Total</span>
              <span>R$ {sale.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
