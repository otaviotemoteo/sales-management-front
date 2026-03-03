'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Package } from 'lucide-react'
import { ProductActionsMenu } from './product-actions-menu'

interface ProductCardProps {
  id: string
  name: string
  category: string
  price: number
  stock: number
  active?: boolean
  onEdit: () => void
  onToggleActive: () => void
}

function stockColor(stock: number) {
  if (stock <= 5) return 'text-red-600 bg-red-50'
  if (stock <= 15) return 'text-yellow-600 bg-yellow-50'
  return 'text-green-600 bg-green-50'
}

function stockLabel(stock: number) {
  if (stock <= 5) return 'Estoque crítico'
  if (stock <= 15) return 'Estoque baixo'
  return 'Em estoque'
}

export function ProductCard({ id, name, category, price, stock, active = true, onEdit, onToggleActive }: ProductCardProps) {
  return (
    <Card className="p-4 hover:shadow-md transition-shadow flex flex-col">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
            <Package className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold text-foreground text-sm leading-tight truncate">{name}</h3>
            <Badge variant="secondary" className="text-xs mt-1">{category}</Badge>
          </div>
        </div>
        <ProductActionsMenu active={active} onEdit={onEdit} onToggleActive={onToggleActive} />
      </div>

      <div className="pt-3 border-t border-border flex justify-between items-end mb-3">
        <div>
          <p className="text-xs text-muted-foreground mb-0.5">Preço</p>
          <p className="text-lg font-bold text-foreground">
            R$ {price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted-foreground mb-0.5">Estoque</p>
          <p className="text-lg font-bold text-foreground">{stock}</p>
        </div>
      </div>

      <div className="mt-auto">
        <span className={`text-xs font-medium px-2 py-1 rounded-md ${stockColor(stock)}`}>
          {stockLabel(stock)}
        </span>
        {!active && (
          <Badge variant="destructive" className="ml-2 text-xs">Inativo</Badge>
        )}
      </div>
    </Card>
  )
}
