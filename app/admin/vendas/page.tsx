'use client'

import { useState, useMemo } from 'react'
import { VendasStats } from '@/components/admin/vendas/vendas-stats'
import { VendasFilters } from '@/components/admin/vendas/vendas-filters'
import { VendasTable, type SaleRow } from '@/components/admin/vendas/vendas-table'
import { SaleEditDialog } from '@/components/admin/vendas/sale-edit-dialog'
import { SaleDetailModal } from '@/components/admin/vendas/sale-detail-modal'
import salesData from '@/data/mockup/sales.json'
import sellersData from '@/data/mockup/sellers.json'

type Status = 'completed' | 'pending' | 'cancelled'

// Enrich sales with seller names deterministically for mockup purposes
const sellerPool = sellersData.map((s) => ({ id: s.id, name: s.fullName.split(' ')[0] }))

const initialSales: SaleRow[] = salesData.map((sale, idx) => ({
  ...sale,
  status: sale.status as Status,
  seller: sellerPool[idx % sellerPool.length].name,
  sellerId: sellerPool[idx % sellerPool.length].id,
}))

const sellerOptions = sellersData.map((s) => ({ id: s.id, name: s.fullName }))

export default function AdminVendasPage() {
  const [sales, setSales] = useState<SaleRow[]>(initialSales)
  const [search, setSearch] = useState('')
  const [seller, setSeller] = useState('all')
  const [status, setStatus] = useState('all')
  const [editSale, setEditSale] = useState<SaleRow | null>(null)
  const [editOpen, setEditOpen] = useState(false)
  const [detailSale, setDetailSale] = useState<SaleRow | null>(null)
  const [detailOpen, setDetailOpen] = useState(false)

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return sales.filter((s) => {
      const matchSearch = !q || s.customer.toLowerCase().includes(q) || s.id.toLowerCase().includes(q)
      const matchSeller = seller === 'all' || s.sellerId === seller
      const matchStatus = status === 'all' || s.status === status
      return matchSearch && matchSeller && matchStatus
    })
  }, [sales, search, seller, status])

  const stats = useMemo(() => {
    const totalSales = filtered.length
    const totalRevenue = filtered.reduce((sum, s) => sum + s.amount, 0)
    const pendingValue = filtered.filter((s) => s.status === 'pending').reduce((sum, s) => sum + s.amount, 0)
    const completedCount = filtered.filter((s) => s.status === 'completed').length
    const completionRate = totalSales > 0 ? (completedCount / totalSales) * 100 : 0

    // Payment method breakdown
    const methodCounts: Record<string, number> = {}
    filtered.forEach((s) => { methodCounts[s.paymentMethod] = (methodCounts[s.paymentMethod] ?? 0) + 1 })
    const total = filtered.length || 1
    const paymentBreakdown = Object.entries(methodCounts).map(([name, count]) => ({
      name,
      pct: (count / total) * 100,
    }))

    return { totalSales, totalRevenue, pendingValue, completionRate, paymentBreakdown }
  }, [filtered])

  function handleStatusChange(id: string, newStatus: Status) {
    setSales((prev) => prev.map((s) => (s.id === id ? { ...s, status: newStatus } : s)))
  }

  function handleSaveEdit(id: string, updates: { amount: number; status: Status }) {
    setSales((prev) => prev.map((s) => (s.id === id ? { ...s, ...updates } : s)))
    setEditOpen(false)
    setEditSale(null)
  }

  function openEdit(sale: SaleRow) {
    setEditSale(sale)
    setEditOpen(true)
  }

  function openDetail(sale: SaleRow) {
    setDetailSale(sale)
    setDetailOpen(true)
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
