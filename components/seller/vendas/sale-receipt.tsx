'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Printer, Download } from 'lucide-react'

interface SaleReceiptProps {
  saleId: string
  customer: string
  date: string
  items: Array<{
    name: string
    quantity: number
    unitPrice: number
    total: number
  }>
  subtotal: number
  tax: number
  total: number
  paymentMethod: string
}

export function SaleReceipt({
  saleId,
  customer,
  date,
  items,
  subtotal,
  tax,
  total,
  paymentMethod,
}: SaleReceiptProps) {
  return (
    <Card className="p-8 max-w-md mx-auto bg-white">
      <div className="text-center mb-6 pb-6 border-b border-border">
        <h2 className="text-2xl font-bold text-foreground">VendaFlow</h2>
        <p className="text-sm text-muted-foreground">Recibo de Venda</p>
      </div>

      <div className="space-y-4 mb-6 pb-6 border-b border-border">
        <div className="text-sm">
          <p className="text-muted-foreground">Venda #</p>
          <p className="font-semibold text-foreground">{saleId}</p>
        </div>
        <div className="text-sm">
          <p className="text-muted-foreground">Cliente</p>
          <p className="font-semibold text-foreground">{customer}</p>
        </div>
        <div className="text-sm">
          <p className="text-muted-foreground">Data/Hora</p>
          <p className="font-semibold text-foreground">{date}</p>
        </div>
      </div>

      <div className="space-y-2 mb-6 pb-6 border-b border-border text-sm">
        {items.map((item, idx) => (
          <div key={idx} className="flex justify-between">
            <span className="text-foreground">{item.name}</span>
            <span className="text-foreground">R$ {item.total.toFixed(2)}</span>
          </div>
        ))}
      </div>

      <div className="space-y-2 mb-6 text-sm">
        <div className="flex justify-between text-muted-foreground">
          <span>Subtotal:</span>
          <span>R$ {subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-muted-foreground">
          <span>Taxas:</span>
          <span>R$ {tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-lg font-bold border-t border-border pt-2">
          <span className="text-foreground">Total:</span>
          <span className="text-foreground">R$ {total.toFixed(2)}</span>
        </div>
      </div>

      <div className="text-center mb-6 text-sm">
        <p className="text-muted-foreground">Pagamento: <span className="font-semibold text-foreground">{paymentMethod}</span></p>
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
