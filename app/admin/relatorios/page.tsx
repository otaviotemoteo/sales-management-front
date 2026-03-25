'use client'

import { useState, useMemo } from 'react'
import { Download, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ReportsFilters } from '@/components/admin/relatorios/reports-filters'
import { ReportSummary } from '@/components/admin/relatorios/report-summary'
import { SalesReportTable } from '@/components/admin/relatorios/sales-report-table'
import { useSales } from '@/hooks/use-sales'
import { useUsers } from '@/hooks/use-users'
import { formatSaleId, formatDate } from '@/lib/constants'

const STATUS_TO_MOCK: Record<string, string> = {
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

export default function RelatoriosPage() {
  const { sales, isLoading } = useSales({ own: false, size: 100 })
  const { users: sellers } = useUsers({ role: 'SELLER', size: 100 })
  const [period, setPeriod] = useState('all')
  const [seller, setSeller] = useState('all')
  const [status, setStatus] = useState('all')

  const sellerOptions = useMemo(() =>
    sellers.map(s => ({ id: String(s.id), name: s.name })),
    [sellers]
  )

  const mappedSales = useMemo(() =>
    sales.map(sale => ({
      id: formatSaleId(sale.id),
      customer: sale.customer?.name ?? 'Cliente',
      seller: sale.seller?.name?.split(' ')[0] ?? 'Vendedor',
      sellerId: String(sale.seller?.id ?? ''),
      date: formatDate(sale.saleDate),
      amount: sale.finalAmount,
      paymentMethod: PAYMENT_TO_MOCK[sale.paymentMethod] ?? sale.paymentMethod,
      status: STATUS_TO_MOCK[sale.status] ?? sale.status,
    })),
    [sales]
  )

  const filtered = useMemo(() => {
    return mappedSales.filter((sale) => {
      const matchSeller = seller === 'all' || sale.sellerId === seller
      const matchStatus = status === 'all' || sale.status === status
      return matchSeller && matchStatus
    })
  }, [mappedSales, seller, status])

  const summary = useMemo(() => {
    const totalSales = filtered.length
    const totalRevenue = filtered.reduce((sum, s) => sum + s.amount, 0)
    const completedCount = filtered.filter((s) => s.status === 'completed').length
    const pendingCount = filtered.filter((s) => s.status === 'pending').length
    return { totalSales, totalRevenue, completedCount, pendingCount }
  }, [filtered])

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
          <h1 className="text-2xl font-bold text-foreground">Relatórios</h1>
          <p className="text-muted-foreground mt-1">Visão geral de todas as vendas</p>
        </div>
        <Button variant="outline" className="gap-2" disabled>
          <Download className="w-4 h-4" />
          Exportar
        </Button>
      </div>

      <ReportsFilters
        period={period}
        onPeriodChange={setPeriod}
        seller={seller}
        onSellerChange={setSeller}
        status={status}
        onStatusChange={setStatus}
        sellerOptions={sellerOptions}
      />

      <ReportSummary
        totalSales={summary.totalSales}
        totalRevenue={summary.totalRevenue}
        completedCount={summary.completedCount}
        pendingCount={summary.pendingCount}
      />

      <SalesReportTable
        sales={filtered.map((s) => ({
          id: s.id,
          customer: s.customer,
          seller: s.seller,
          date: s.date,
          amount: s.amount,
          paymentMethod: s.paymentMethod,
          status: s.status,
        }))}
      />
    </div>
  )
}
