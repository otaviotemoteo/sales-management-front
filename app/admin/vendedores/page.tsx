'use client'

import { useState, useMemo } from 'react'
import { Plus, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { SellerCard } from '@/components/admin/vendedores/seller-card'
import { SellerDetailsModal } from '@/components/admin/vendedores/seller-details-modal'
import { SellerForm } from '@/components/admin/vendedores/seller-form'
import sellersData from '@/data/mockup/sellers.json'

type Seller = (typeof sellersData)[0] & { status: 'active' | 'inactive' }

const initialSellers: Seller[] = sellersData.map((s) => ({
  ...s,
  status: s.status as 'active' | 'inactive',
}))

export default function VendedoresPage() {
  const [sellers, setSellers] = useState<Seller[]>(initialSellers)
  const [search, setSearch] = useState('')
  const [newSellerOpen, setNewSellerOpen] = useState(false)
  const [selectedSeller, setSelectedSeller] = useState<Seller | null>(null)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [editSeller, setEditSeller] = useState<Seller | null>(null)

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return sellers.filter(
      (s) =>
        s.fullName.toLowerCase().includes(q) ||
        s.email.toLowerCase().includes(q)
    )
  }, [sellers, search])

  function handleCreate(values: { fullName: string; email: string; phone: string }) {
    const newSeller: Seller = {
      id: `s${String(sellers.length + 1).padStart(3, '0')}`,
      ...values,
      status: 'active',
      joinedAt: new Date().toISOString().slice(0, 10),
      stats: { totalSales: 0, totalRevenue: 0, totalCustomers: 0, averageTicket: 0, rating: 0 },
    }
    setSellers((prev) => [newSeller, ...prev])
    setNewSellerOpen(false)
  }

  function handleEdit(values: { fullName: string; email: string; phone: string }) {
    if (!editSeller) return
    setSellers((prev) =>
      prev.map((s) => (s.id === editSeller.id ? { ...s, ...values } : s))
    )
    setEditSeller(null)
  }

  function handleToggleActive(id: string) {
    setSellers((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: s.status === 'active' ? 'inactive' : 'active' } : s))
    )
  }

  const activeSellers = sellers.filter((s) => s.status === 'active').length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Vendedores</h1>
          <p className="text-muted-foreground mt-1">
            {sellers.length} cadastrados · {activeSellers} ativos
          </p>
        </div>
        <Dialog open={newSellerOpen} onOpenChange={setNewSellerOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Novo Vendedor
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Cadastrar Novo Vendedor</DialogTitle>
            </DialogHeader>
            <div className="pt-2">
              <SellerForm onSubmit={handleCreate} onCancel={() => setNewSellerOpen(false)} />
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Buscar vendedor..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {filtered.length === 0 ? (
        <Card className="p-12 text-center">
          <p className="text-muted-foreground">Nenhum vendedor encontrado</p>
        </Card>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((seller) => (
            <SellerCard
              key={seller.id}
              id={seller.id}
              fullName={seller.fullName}
              email={seller.email}
              phone={seller.phone}
              status={seller.status}
              stats={seller.stats}
              onViewDetails={() => { setSelectedSeller(seller); setDetailsOpen(true) }}
              onEdit={() => setEditSeller(seller)}
              onToggleActive={() => handleToggleActive(seller.id)}
            />
          ))}
        </div>
      )}

      {/* Details Dialog */}
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Detalhes do Vendedor</DialogTitle>
          </DialogHeader>
          {selectedSeller && (
            <div className="pt-2">
              <SellerDetailsModal seller={selectedSeller} />
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={!!editSeller} onOpenChange={(open) => { if (!open) setEditSeller(null) }}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Editar Vendedor</DialogTitle>
          </DialogHeader>
          <div className="pt-2">
            {editSeller && (
              <SellerForm
                initialValues={editSeller}
                onSubmit={handleEdit}
                onCancel={() => setEditSeller(null)}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
