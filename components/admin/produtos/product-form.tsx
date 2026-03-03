'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const categories = ['Informática', 'Periféricos', 'Áudio', 'Armazenamento', 'Componentes', 'Mobiliário']

interface ProductFormValues {
  name: string
  price: number
  category: string
  stock: number
}

interface ProductFormProps {
  initialValues?: Partial<ProductFormValues>
  onSubmit: (values: ProductFormValues) => void
  onCancel: () => void
}

export function ProductForm({ initialValues, onSubmit, onCancel }: ProductFormProps) {
  const [name, setName] = useState(initialValues?.name ?? '')
  const [price, setPrice] = useState(String(initialValues?.price ?? ''))
  const [category, setCategory] = useState(initialValues?.category ?? '')
  const [stock, setStock] = useState(String(initialValues?.stock ?? ''))

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSubmit({
      name,
      price: Number(price),
      category,
      stock: Number(stock),
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="prod-name">Nome do produto</Label>
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
          <Label htmlFor="prod-price">Preço (R$)</Label>
          <Input
            id="prod-price"
            type="number"
            step="0.01"
            min="0"
            placeholder="0,00"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
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
        <Button type="button" variant="outline" className="flex-1" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" className="flex-1">
          {initialValues?.name ? 'Salvar alterações' : 'Cadastrar produto'}
        </Button>
      </div>
    </form>
  )
}
