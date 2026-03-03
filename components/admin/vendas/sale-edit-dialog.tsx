'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

type Status = 'completed' | 'pending' | 'cancelled'

interface SaleEditDialogProps {
  sale: {
    id: string
    amount: number
    status: Status
  } | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (id: string, updates: { amount: number; status: Status }) => void
}

export function SaleEditDialog({ sale, open, onOpenChange, onSave }: SaleEditDialogProps) {
  const [amount, setAmount] = useState(String(sale?.amount ?? ''))
  const [status, setStatus] = useState<Status>(sale?.status ?? 'completed')

  // Sync state when sale changes
  if (sale && String(sale.amount) !== amount && !open) {
    setAmount(String(sale.amount))
    setStatus(sale.status)
  }

  function handleOpen(isOpen: boolean) {
    if (isOpen && sale) {
      setAmount(String(sale.amount))
      setStatus(sale.status)
    }
    onOpenChange(isOpen)
  }

  function handleSave() {
    if (!sale) return
    onSave(sale.id, { amount: Number(amount), status })
  }

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Editar Venda {sale?.id}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-2">
          <div>
            <Label htmlFor="edit-amount">Valor (R$)</Label>
            <Input
              id="edit-amount"
              type="number"
              step="0.01"
              min="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="mt-1.5"
            />
          </div>
          <div>
            <Label>Status</Label>
            <Select value={status} onValueChange={(v) => setStatus(v as Status)}>
              <SelectTrigger className="mt-1.5">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="completed">Concluída</SelectItem>
                <SelectItem value="pending">Pendente</SelectItem>
                <SelectItem value="cancelled">Cancelada</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-3 pt-1">
            <Button variant="outline" className="flex-1" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button className="flex-1" onClick={handleSave}>
              Salvar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
