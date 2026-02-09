'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface Product {
  id: string
  name: string
  quantity: number
  revenue: number
  growth: number
}

interface TopProductsProps {
  products: Product[]
}

export function TopProducts({ products }: TopProductsProps) {
  return (
    <Card className="p-6">
      <h3 className="font-semibold text-foreground mb-4">Top 5 Produtos</h3>
      <div className="space-y-3">
        {products.map((product) => (
          <div key={product.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
            <div className="flex-1">
              <p className="font-medium text-foreground">{product.name}</p>
              <p className="text-xs text-muted-foreground">{product.quantity} unidades</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="font-semibold text-foreground">R$ {product.revenue.toFixed(2)}</p>
                <Badge variant={product.growth > 0 ? 'default' : 'secondary'} className="text-xs">
                  {product.growth > 0 ? '+' : ''}{product.growth}%
                </Badge>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
