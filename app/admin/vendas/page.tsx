'use client'

import { useState, useMemo } from 'react'
import { Loader2 } from 'lucide-react'
import { VendasStats } from '@/components/admin/vendas/vendas-stats'
import { VendasFilters } from '@/components/admin/vendas/vendas-filters'
import { VendasTable, type SaleRow } from '@/components/admin/vendas/vendas-table'
import { SaleEditDialog } from '@/components/admin/vendas/sale-edit-dialog'
import { SaleDetailModal } from '@/components/admin/vendas/sale-detail-modal'
import { useSales } from '@/hooks/use-sales'
import { useUsers } from '@/hooks/use-users'
import { formatSaleId, formatDate } from '@/lib/constants'
import type { SaleResponse } from '@/types/sale'

type Status = 'completed' | 'pending' | 'cancelled'

const STATUS_TO_MOCK: Record<string, Status> = {
  CONFIRMED: 'completed',
  PENDING: 'pending',
  CANCELLED: 'cancelled',
}

const PAYMENT_TO_MOCK: Record<string, string> = {
  PIX: 'pix',
  CREDIT_CARD: 'credit',
  DEBIT_CARD: 'debit',
  CASH: 'cash',
}

function mapSaleToRow(sale: SaleResponse): SaleRow {
  return {
    id: formatSaleId(sale.id),
    customer: sale.customer?.name ?? 'Cliente',
    seller: sale.seller?.name?.split(' ')[0] ?? 'Vendedor',
    sellerId: String(sale.seller?.id ?? ''),
    date: formatDate(sale.saleDate),
    amount: sale.finalAmount,
    status: STATUS_TO_MOCK[sale.status] ?? 'pending',
    paymentMethod: PAYMENT_TO_MOCK[sale.paymentMethod] ?? sale.paymentMethod,
    items: sale.items?.length ?? 0,
    subtotal: sale.totalAmount,
    tax: sale.discount ?? 0,
    total: sale.finalAmount,
    products: sale.items?.map(i => ({
      name: i.product?.name ?? 'Produto',
      quantity: i.quantity,
      unitPrice: i.unitPrice,
      total: i.totalPrice,
    })) ?? [],
  }
}

export default function AdminVendasPage() {
  const { sales, isLoading, refresh } = useSales({ own: false, size: 100 })
  const { users: sellers } = useUsers({ role: 'SELLER', size: 100 })
  const [search, setSearch] = useState('')
  const [seller, setSeller] = useState('all')
  const [status, setStatus] = useState('all')
  const [editSale, setEditSale] = useState<SaleRow | null>(null)
  const [editOpen, setEditOpen] = useState(false)
  const [detailSale, setDetailSale] = useState<SaleRow | null>(null)
  const [detailOpen, setDetailOpen] = useState(false)

  const saleRows = useMemo(() => sales.map(mapSaleToRow), [sales])

  const sellerOptions = useMemo(() =>
    sellers.map(s => ({ id: String(s.id), name: s.name })),
    [sellers]
  )

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return saleRows.filter((s) => {
      const matchSearch = !q || s.customer.toLowerCase().includes(q) || s.id.toLowerCase().includes(q)
      const matchSeller = seller === 'all' || s.sellerId === seller
      const matchStatus = status === 'all' || s.status === status
      return matchSearch && matchSeller && matchStatus
    })
  }, [saleRows, search, seller, status])

  const stats = useMemo(() => {
    const totalSales = filtered.length
    const totalRevenue = filtered.reduce((sum, s) => sum + s.amount, 0)
    const pendingValue = filtered.filter((s) => s.status === 'pending').reduce((sum, s) => sum + s.amount, 0)
    const completedCount = filtered.filter((s) => s.status === 'completed').length
    const completionRate = totalSales > 0 ? (completedCount / totalSales) * 100 : 0

    const methodCounts: Record<string, number> = {}
    filtered.forEach((s) => { methodCounts[s.paymentMethod] = (methodCounts[s.paymentMethod] ?? 0) + 1 })
    const total = filtered.length || 1
    const paymentBreakdown = Object.entries(methodCounts).map(([name, count]) => ({
      name,
      pct: (count / total) * 100,
    }))

    return { totalSales, totalRevenue, pendingValue, completionRate, paymentBreakdown }
  }, [filtered])

  function handleStatusChange(_id: string, _newStatus: Status) {
    refresh()
  }

  function handleSaveEdit(_id: string, _updates: { amount: number; status: Status }) {
    setEditOpen(false)
    setEditSale(null)
    refresh()
  }

  function openEdit(sale: SaleRow) {
    setEditSale(sale)
    setEditOpen(true)
  }

  function openDetail(sale: SaleRow) {
    setDetailSale(sale)
    setDetailOpen(true)
  }

  if (isLoading && sales.length === 0) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Vendas</h1>
        <p className="text-muted-foreground mt-1">Visão completa e controle de todas as vendas</p>
      </div>

      <VendasStats
        totalSales={stats.totalSales}
        totalRevenue={stats.totalRevenue}
        pendingValue={stats.pendingValue}
        completionRate={stats.completionRate}
        paymentBreakdown={stats.paymentBreakdown}
      />

      <VendasFilters
        search={search}
        onSearch={setSearch}
        seller={seller}
        onSellerChange={setSeller}
        status={status}
        onStatusChange={setStatus}
        sellerOptions={sellerOptions}
        resultCount={filtered.length}
      />

      <VendasTable
        sales={filtered}
        onStatusChange={handleStatusChange}
        onEdit={openEdit}
        onViewDetail={openDetail}
      />

      <SaleEditDialog
        sale={editSale}
        open={editOpen}
        onOpenChange={(open) => {
          setEditOpen(open)
          if (!open) setEditSale(null)
        }}
        onSave={handleSaveEdit}
      />

      <SaleDetailModal
        sale={detailSale}
        open={detailOpen}
        onOpenChange={(open) => {
          setDetailOpen(open)
          if (!open) setDetailSale(null)
        }}
      />
    </div>
  )
}
