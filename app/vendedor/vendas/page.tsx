'use client'

import { useState, useMemo } from 'react'
import { Plus, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { SalesFilters } from '@/components/seller/vendas/sales-filters'
import { SaleStatusFilter } from '@/components/seller/vendas/sale-status-filter'
import { SaleCard } from '@/components/seller/vendas/sale-card'
import { SaleActionsMenu } from '@/components/seller/vendas/sale-actions-menu'
import { NewSaleForm } from '@/components/seller/vendas/new-sale-form'
import { SaleReceipt } from '@/components/seller/vendas/sale-receipt'
import { Card } from '@/components/ui/card'
import { useSales } from '@/hooks/use-sales'
import { useToast } from '@/hooks/use-toast'
import type { SaleResponse } from '@/types/sale'
import { SALE_STATUS_LABELS, formatSaleId } from '@/lib/constants'

type Status = 'all' | 'CONFIRMED' | 'PENDING' | 'CANCELLED'

const tabs: { value: Status; label: string }[] = [
  { value: 'all', label: 'Todas' },
  { value: 'CONFIRMED', label: 'Concluídas' },
  { value: 'PENDING', label: 'Pendentes' },
  { value: 'CANCELLED', label: 'Canceladas' },
]

export default function VendasPage() {
  const { toast } = useToast()
  const { sales, isLoading, error, refresh, cancelSale } = useSales({ own: true, size: 100 })
  const [search, setSearch] = useState('')
  const [activeTab, setActiveTab] = useState<Status>('all')
  const [selectedSale, setSelectedSale] = useState<SaleResponse | null>(null)
  const [saleDetailsOpen, setSaleDetailsOpen] = useState(false)
  const [newSaleOpen, setNewSaleOpen] = useState(false)

  const filtered = useMemo(() => {
    return sales.filter((s) => {
      const matchesSearch =
        (s.customer?.name ?? '').toLowerCase().includes(search.toLowerCase()) ||
        formatSaleId(s.id).toLowerCase().includes(search.toLowerCase())
      const matchesTab = activeTab === 'all' || s.status === activeTab
      return matchesSearch && matchesTab
    })
  }, [sales, search, activeTab])

  const counts = useMemo(() => ({
    all: sales.length,
    CONFIRMED: sales.filter((s) => s.status === 'CONFIRMED').length,
    PENDING: sales.filter((s) => s.status === 'PENDING').length,
    CANCELLED: sales.filter((s) => s.status === 'CANCELLED').length,
  }), [sales])

  if (isLoading && sales.length === 0) {
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
          <h1 className="text-2xl font-bold text-foreground">Minhas Vendas</h1>
          <p className="text-muted-foreground mt-1">{sales.length} vendas registradas</p>
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
              <NewSaleForm onSuccess={() => { setNewSaleOpen(false); refresh() }} />
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <SalesFilters onSearch={setSearch} />

      <SaleStatusFilter
        value={activeTab}
        onChange={(v) => setActiveTab(v as Status)}
        tabs={tabs}
        counts={counts}
      />

      {error && (
        <Card className="p-6 text-center">
          <p className="text-destructive">{error}</p>
          <Button variant="outline" size="sm" className="mt-2" onClick={refresh}>Tentar novamente</Button>
        </Card>
      )}

      {!error && filtered.length === 0 ? (
        <Card className="p-12 text-center">
          <p className="text-muted-foreground">Nenhuma venda encontrada</p>
        </Card>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((sale) => (
            <div key={sale.id} className="relative">
              <SaleCard
                sale={sale}
                onView={() => { setSelectedSale(sale); setSaleDetailsOpen(true) }}
              />
              <div className="absolute top-3 right-3">
                <SaleActionsMenu
                  saleId={String(sale.id)}
                  onEdit={() => { setSelectedSale(sale); setSaleDetailsOpen(true) }}
                  onDownload={() => { setSelectedSale(sale); setSaleDetailsOpen(true) }}
                  onDelete={async () => {
                    try {
                      await cancelSale(sale.id)
                      toast({ title: 'Venda cancelada com sucesso' })
                    } catch {
                      toast({ title: 'Erro ao cancelar venda', variant: 'destructive' })
                    }
                  }}
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
          {selectedSale && <SaleReceipt sale={selectedSale} />}
        </DialogContent>
      </Dialog>
    </div>
  )
}
