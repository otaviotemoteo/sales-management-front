'use client'

import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'

interface SaleItem {
  id: string
  productName: string
  quantity: number
  price: number
}

interface NewSaleFormProps {
  onSubmit?: (data: any) => void
}

export function NewSaleForm({ onSubmit }: NewSaleFormProps) {
  const [items, setItems] = useState<SaleItem[]>([])

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <Label htmlFor="customer">Cliente</Label>
          <Input id="customer" placeholder="Selecione ou crie um cliente" className="mt-1.5" />
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <Label>Itens da Venda</Label>
            <Button size="sm" variant="outline" className="gap-2">
              <Plus className="w-4 h-4" />
              Adicionar Produto
            </Button>
          </div>

          {items.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-6">
              Nenhum produto adicionado ainda
            </p>
          ) : (
            <div className="space-y-2">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-2 p-2 border border-border rounded">
                  <span className="flex-1">{item.productName}</span>
                  <span className="text-sm">{item.quantity}x</span>
                  <span className="font-semibold">R$ {(item.price * item.quantity).toFixed(2)}</span>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="pt-4 border-t border-border space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal:</span>
            <span className="font-semibold">R$ 0.00</span>
          </div>
          <div className="flex justify-between text-lg font-bold">
            <span>Total:</span>
            <span>R$ 0.00</span>
          </div>
        </div>

        <Button className="w-full">Finalizar Venda</Button>
      </div>
    </Card>
  )
}
