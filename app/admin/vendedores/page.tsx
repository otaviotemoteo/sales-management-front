'use client'

import { useState, useMemo } from 'react'
import { Plus, Search, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { SellerCard } from '@/components/admin/vendedores/seller-card'
import { SellerDetailsModal } from '@/components/admin/vendedores/seller-details-modal'
import { SellerForm } from '@/components/admin/vendedores/seller-form'
import { useUsers } from '@/hooks/use-users'
import * as usersService from '@/services/users.service'
import type { UserResponse } from '@/types/auth'

type SellerView = {
  id: string
  fullName: string
  email: string
  phone: string
  status: 'active' | 'inactive'
  joinedAt: string
  stats: {
    totalSales: number
    totalRevenue: number
    totalCustomers: number
    averageTicket: number
    rating: number
  }
}

function mapUserToSeller(user: UserResponse): SellerView {
  return {
    id: String(user.id),
    fullName: user.name,
    email: user.email,
    phone: '',
    status: user.active ? 'active' : 'inactive',
    joinedAt: user.createdAt ? new Date(user.createdAt).toISOString().slice(0, 10) : '',
    stats: { totalSales: 0, totalRevenue: 0, totalCustomers: 0, averageTicket: 0, rating: 0 },
  }
}

export default function VendedoresPage() {
  const { users, isLoading, refresh } = useUsers({ role: 'SELLER', size: 100 })
  const [search, setSearch] = useState('')
  const [newSellerOpen, setNewSellerOpen] = useState(false)
  const [selectedSeller, setSelectedSeller] = useState<SellerView | null>(null)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [editSeller, setEditSeller] = useState<SellerView | null>(null)

  const sellers = useMemo(() => users.map(mapUserToSeller), [users])

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return sellers.filter(
      (s) =>
        s.fullName.toLowerCase().includes(q) ||
        s.email.toLowerCase().includes(q)
    )
  }, [sellers, search])

  async function handleCreate(values: { fullName: string; email: string; phone: string }) {
    await usersService.createUser({
      name: values.fullName,
      email: values.email,
      password: 'VendaFlow@123',
      role: 'SELLER',
    })
    setNewSellerOpen(false)
    refresh()
  }

  async function handleEdit(values: { fullName: string; email: string; phone: string }) {
    if (!editSeller) return
    const numericId = parseInt(editSeller.id, 10)
    await usersService.updateUser(numericId, {
      name: values.fullName,
      email: values.email,
    })
    setEditSeller(null)
    refresh()
  }

  async function handleToggleActive(id: string) {
    const numericId = parseInt(id, 10)
    const user = users.find(u => u.id === numericId)
    if (!user) return
    if (user.active) {
      await usersService.deleteUser(numericId)
    } else {
      await usersService.reactivateUser(numericId)
    }
    refresh()
  }

  const activeSellers = sellers.filter((s) => s.status === 'active').length

  if (isLoading && users.length === 0) {
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
          {filtered.map((s) => (
            <SellerCard
              key={s.id}
              id={s.id}
              fullName={s.fullName}
              email={s.email}
              phone={s.phone}
              status={s.status}
              stats={s.stats}
              onViewDetails={() => { setSelectedSeller(s); setDetailsOpen(true) }}
              onEdit={() => setEditSeller(s)}
              onToggleActive={() => handleToggleActive(s.id)}
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
