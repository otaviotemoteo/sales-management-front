'use client'

import { useState, useMemo } from 'react'
import { Plus, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { ProductCard } from '@/components/admin/produtos/product-card'
import { ProductFilters } from '@/components/admin/produtos/product-filters'
import { ProductForm } from '@/components/admin/produtos/product-form'
import { useProducts } from '@/hooks/use-products'
import * as productsService from '@/services/products.service'

export default function ProdutosPage() {
  const { products, isLoading, refresh } = useProducts({ size: 100 })
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('Todas')
  const [newProductOpen, setNewProductOpen] = useState(false)
  const [editProduct, setEditProduct] = useState<{
    id: string
    name: string
    price: number
    category: string
    stock: number
  } | null>(null)

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return products.filter((p) => {
      const matchSearch = p.name.toLowerCase().includes(q)
      const matchCategory = category === 'Todas' || p.category === category
      return matchSearch && matchCategory
    })
  }, [products, search, category])

  async function handleCreate(values: { name: string; price: number; category: string; stock: number }) {
    await productsService.createProduct(values)
    setNewProductOpen(false)
    refresh()
  }

  async function handleEdit(values: { name: string; price: number; category: string; stock: number }) {
    if (!editProduct) return
    const numericId = parseInt(editProduct.id, 10)
    await productsService.updateProduct(numericId, values)
    setEditProduct(null)
    refresh()
  }

  async function handleToggleActive(id: string) {
    const numericId = parseInt(id, 10)
    const product = products.find(p => p.id === numericId)
    if (product) {
      await productsService.updateProduct(numericId, { active: !product.active })
      refresh()
    }
  }

  if (isLoading && products.length === 0) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Produtos</h1>
          <p className="text-muted-foreground mt-1">{products.length} produtos cadastrados</p>
        </div>
        <Dialog open={newProductOpen} onOpenChange={setNewProductOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Novo Produto
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Cadastrar Novo Produto</DialogTitle>
            </DialogHeader>
            <div className="pt-2">
              <ProductForm onSubmit={handleCreate} onCancel={() => setNewProductOpen(false)} />
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <ProductFilters
        search={search}
        onSearch={setSearch}
        category={category}
        onCategoryChange={setCategory}
      />

      {filtered.length === 0 ? (
        <Card className="p-12 text-center">
          <p className="text-muted-foreground">Nenhum produto encontrado</p>
        </Card>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((product) => (
            <ProductCard
              key={product.id}
              id={String(product.id)}
              name={product.name}
              category={product.category}
              price={product.price}
              stock={product.stock}
              active={product.active}
              onEdit={() => setEditProduct({
                id: String(product.id),
                name: product.name,
                price: product.price,
                category: product.category,
                stock: product.stock,
              })}
              onToggleActive={() => handleToggleActive(String(product.id))}
            />
          ))}
        </div>
      )}

      <Dialog open={!!editProduct} onOpenChange={(open) => { if (!open) setEditProduct(null) }}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Editar Produto</DialogTitle>
          </DialogHeader>
          <div className="pt-2">
            {editProduct && (
              <ProductForm
                initialValues={editProduct}
                onSubmit={handleEdit}
                onCancel={() => setEditProduct(null)}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
