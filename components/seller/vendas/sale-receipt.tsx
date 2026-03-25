'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Printer, Download } from 'lucide-react'
import type { SaleResponse } from '@/types/sale'
import { PAYMENT_METHOD_LABELS, formatSaleId, formatDate, formatCurrency } from '@/lib/constants'

interface SaleReceiptProps {
  sale: SaleResponse
}

export function SaleReceipt({ sale }: SaleReceiptProps) {
  return (
    <Card className="p-4 w-full">
      <div className="text-center mb-6 pb-6 border-b border-border">
        <h2 className="text-2xl font-bold text-foreground">VendaFlow</h2>
        <p className="text-sm text-muted-foreground">Recibo de Venda</p>
      </div>

      <div className="space-y-4 mb-6 pb-6 border-b border-border">
        <div className="text-sm">
          <p className="text-muted-foreground">Venda #</p>
          <p className="font-semibold text-foreground">{formatSaleId(sale.id)}</p>
        </div>
        <div className="text-sm">
          <p className="text-muted-foreground">Cliente</p>
          <p className="font-semibold text-foreground">{sale.customer.name}</p>
        </div>
        <div className="text-sm">
          <p className="text-muted-foreground">Data/Hora</p>
          <p className="font-semibold text-foreground">{formatDate(sale.saleDate)}</p>
        </div>
      </div>

      <div className="space-y-2 mb-6 pb-6 border-b border-border text-sm">
        {sale.items.map((item) => (
          <div key={item.id} className="flex justify-between">
            <span className="text-foreground">
              {item.quantity > 1 ? `${item.quantity}x ` : ''}{item.product.name}
            </span>
            <span className="text-foreground">{formatCurrency(item.totalPrice)}</span>
          </div>
        ))}
      </div>

      <div className="space-y-2 mb-6 text-sm">
        <div className="flex justify-between text-muted-foreground">
          <span>Subtotal:</span>
          <span>{formatCurrency(sale.totalAmount)}</span>
        </div>
        {sale.discount > 0 && (
          <div className="flex justify-between text-muted-foreground">
            <span>Desconto:</span>
            <span>-{formatCurrency(sale.discount)}</span>
          </div>
        )}
        <div className="flex justify-between text-lg font-bold border-t border-border pt-2">
          <span className="text-foreground">Total:</span>
          <span className="text-foreground">{formatCurrency(sale.finalAmount)}</span>
        </div>
      </div>

      <div className="text-center mb-6 text-sm">
        <p className="text-muted-foreground">
          Pagamento: <span className="font-semibold text-foreground">{PAYMENT_METHOD_LABELS[sale.paymentMethod] ?? sale.paymentMethod}</span>
        </p>
      </div>

      <div className="flex gap-2">
        <Button variant="outline" className="flex-1 gap-2">
          <Printer className="w-4 h-4" />
          Imprimir
        </Button>
        <Button className="flex-1 gap-2">
          <Download className="w-4 h-4" />
          Baixar
        </Button>
      </div>
    </Card>
  )
}
