'use client'

import { useState, useMemo } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { ProductCard } from '@/components/admin/produtos/product-card'
import { ProductFilters } from '@/components/admin/produtos/product-filters'
import { ProductForm } from '@/components/admin/produtos/product-form'
import productsData from '@/data/mockup/products.json'

type Product = {
  id: string
  name: string
  price: number
  category: string
  stock: number
  active: boolean
}

const initialProducts: Product[] = productsData.map((p) => ({ ...p, active: true }))

export default function ProdutosPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('Todas')
  const [newProductOpen, setNewProductOpen] = useState(false)
  const [editProduct, setEditProduct] = useState<Product | null>(null)

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return products.filter((p) => {
      const matchSearch = p.name.toLowerCase().includes(q)
      const matchCategory = category === 'Todas' || p.category === category
      return matchSearch && matchCategory
    })
  }, [products, search, category])

  function handleCreate(values: { name: string; price: number; category: string; stock: number }) {
    const newProduct: Product = {
      id: `p${String(products.length + 1).padStart(3, '0')}`,
      ...values,
      active: true,
    }
    setProducts((prev) => [newProduct, ...prev])
    setNewProductOpen(false)
  }

  function handleEdit(values: { name: string; price: number; category: string; stock: number }) {
    if (!editProduct) return
    setProducts((prev) =>
      prev.map((p) => (p.id === editProduct.id ? { ...p, ...values } : p))
    )
    setEditProduct(null)
  }

  function handleToggleActive(id: string) {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, active: !p.active } : p))
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
              id={product.id}
              name={product.name}
              category={product.category}
              price={product.price}
              stock={product.stock}
              active={product.active}
              onEdit={() => setEditProduct(product)}
              onToggleActive={() => handleToggleActive(product.id)}
            />
          ))}
        </div>
      )}

      {/* Edit Dialog */}
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
