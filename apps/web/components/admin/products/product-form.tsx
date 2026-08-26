'use client'

import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const categories = ['Computing', 'Peripherals', 'Audio', 'Armazenamento', 'Componentes', 'Furniture']

/** Treats the typed digits as cents and renders BRL like "1.234,56". */
function formatCurrencyInput(value: string): string {
  const digits = value.replace(/\D/g, '')
  if (!digits) return ''
  return (parseInt(digits, 10) / 100).toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

function parseCurrencyInput(masked: string): number {
  const digits = masked.replace(/\D/g, '')
  return digits ? parseInt(digits, 10) / 100 : 0
}

function priceToMasked(price?: number): string {
  if (price == null) return ''
  return price.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

interface ProductFormValues {
  name: string
  price: number
  category: string
  stock: number
}

interface ProductFormProps {
  initialValues?: Partial<ProductFormValues>
  onSubmit: (values: ProductFormValues) => void | Promise<void>
  onCancel: () => void
}

export function ProductForm({ initialValues, onSubmit, onCancel }: ProductFormProps) {
  const [name, setName] = useState(initialValues?.name ?? '')
  const [price, setPrice] = useState(priceToMasked(initialValues?.price))
  const [category, setCategory] = useState(initialValues?.category ?? '')
  const [stock, setStock] = useState(String(initialValues?.stock ?? ''))
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await onSubmit({
        name,
        price: parseCurrencyInput(price),
        category,
        stock: Number(stock),
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="prod-name">Product name</Label>
        <Input
          id="prod-name"
          placeholder="Ex: Notebook Dell Inspiron 15"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mt-1.5"
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="prod-price">Price</Label>
          <Input
            id="prod-price"
            type="text"
            inputMode="numeric"
            placeholder="0,00"
            value={price}
            onChange={(e) => setPrice(formatCurrencyInput(e.target.value))}
            required
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="prod-stock">Estoque</Label>
          <Input
            id="prod-stock"
            type="number"
            min="0"
            placeholder="0"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
            className="mt-1.5"
          />
        </div>
      </div>

      <div>
        <Label>Categoria</Label>
        <Select value={category} onValueChange={setCategory} required>
          <SelectTrigger className="mt-1.5">
            <SelectValue placeholder="Selecione uma categoria" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-3 pt-2">
        <Button type="button" variant="outline" className="flex-1" onClick={onCancel} disabled={isSubmitting}>
          Cancelar
        </Button>
        <Button type="submit" className="flex-1" disabled={isSubmitting}>
          {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
          {initialValues?.name ? 'Save changes' : 'Add product'}
        </Button>
      </div>
    </form>
  )
}
