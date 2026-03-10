'use client'

import { useState, useMemo } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { SalesFilters } from '@/components/seller/vendas/sales-filters'
import { SaleStatusFilter } from '@/components/seller/vendas/sale-status-filter'
import { SaleCard } from '@/components/seller/vendas/sale-card'
import { SaleActionsMenu } from '@/components/seller/vendas/sale-actions-menu'
import { NewSaleForm } from '@/components/seller/vendas/new-sale-form'
import { SaleReceipt } from '@/components/seller/vendas/sale-receipt'
import { Card } from '@/components/ui/card'
import salesData from '@/data/mockup/sales.json'

type Status = 'all' | 'completed' | 'pending' | 'cancelled'

const tabs: { value: Status; label: string }[] = [
  { value: 'all', label: 'Todas' },
  { value: 'completed', label: 'Concluídas' },
  { value: 'pending', label: 'Pendentes' },
  { value: 'cancelled', label: 'Canceladas' },
]

export default function VendasPage() {
  const [search, setSearch] = useState('')
  const [activeTab, setActiveTab] = useState<Status>('all')
  const [selectedSale, setSelectedSale] = useState<(typeof salesData)[0] | null>(null)
  const [saleDetailsOpen, setSaleDetailsOpen] = useState(false)
  const [newSaleOpen, setNewSaleOpen] = useState(false)

  const filtered = useMemo(() => {
    return salesData.filter((s) => {
      const matchesSearch = s.customer.toLowerCase().includes(search.toLowerCase()) || s.id.toLowerCase().includes(search.toLowerCase())
      const matchesTab = activeTab === 'all' || s.status === activeTab
      return matchesSearch && matchesTab
    })
  }, [search, activeTab])

  const counts = useMemo(() => ({
    all: salesData.length,
    completed: salesData.filter((s) => s.status === 'completed').length,
    pending: salesData.filter((s) => s.status === 'pending').length,
    cancelled: salesData.filter((s) => s.status === 'cancelled').length,
  }), [])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Minhas Vendas</h1>
          <p className="text-muted-foreground mt-1">{salesData.length} vendas registradas</p>
        </div>
        <Dialog open={newSaleOpen} onOpenChange={setNewSaleOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Nova Venda
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Registrar Nova Venda</DialogTitle>
            </DialogHeader>
            <div className="pt-2">
              <NewSaleForm onSubmit={() => setNewSaleOpen(false)} />
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <SalesFilters onSearch={setSearch} />

      <SaleStatusFilter
        value={activeTab}
        onChange={setActiveTab}
        tabs={tabs}
        counts={counts}
      />

      {filtered.length === 0 ? (
        <Card className="p-12 text-center">
          <p className="text-muted-foreground">Nenhuma venda encontrada</p>
        </Card>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((sale) => (
            <div key={sale.id} className="relative">
              <SaleCard
                id={sale.id}
                customer={sale.customer}
                date={sale.date}
                amount={sale.amount}
                status={sale.status as 'pending' | 'completed' | 'cancelled'}
                paymentMethod={sale.paymentMethod}
                products={sale.products}
                onView={() => { setSelectedSale(sale); setSaleDetailsOpen(true) }}
              />
              <div className="absolute top-3 right-3">
                <SaleActionsMenu
                  saleId={sale.id}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={saleDetailsOpen} onOpenChange={setSaleDetailsOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Detalhes da Venda</DialogTitle>
          </DialogHeader>
          {selectedSale && (
            <SaleReceipt
              saleId={selectedSale.id}
              customer={selectedSale.customer}
              date={selectedSale.date}
              items={selectedSale.products}
              subtotal={selectedSale.subtotal}
              tax={selectedSale.tax}
              total={selectedSale.total}
              paymentMethod={selectedSale.paymentMethod}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}