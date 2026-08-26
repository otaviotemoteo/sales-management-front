'use client'

interface SaleItemRowProps {
  productName: string
  quantity: number
  unitPrice: number
  total: number
}

export function SaleItemRow({ productName, quantity, unitPrice, total }: SaleItemRowProps) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-border last:border-b-0">
      <div className="flex-1">
        <p className="font-medium text-foreground">{productName}</p>
      </div>
      <div className="flex gap-4">
        <div className="text-right">
          <p className="text-sm text-muted-foreground">{quantity}x</p>
          <p className="text-xs text-muted-foreground">R$ {unitPrice.toFixed(2)}</p>
        </div>
        <div className="w-24 text-right">
          <p className="font-semibold text-foreground">R$ {total.toFixed(2)}</p>
        </div>
      </div>
    </div>
  )
}
