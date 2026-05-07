'use client'

import { useState, useMemo } from 'react'
import { Download, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ReportsFilters } from '@/components/admin/relatorios/reports-filters'
import { ReportSummary } from '@/components/admin/relatorios/report-summary'
import { SalesReportTable } from '@/components/admin/relatorios/sales-report-table'
import { useSales } from '@/hooks/use-sales'
import { useUsers } from '@/hooks/use-users'
import {
  formatSaleId,
  formatDate,
  formatCurrency,
  SALE_STATUS_LABELS,
  PAYMENT_METHOD_LABELS,
} from '@/lib/constants'
import type { PaymentMethod, SaleStatus } from '@/types/sale'

interface ReportRow {
  id: string
  customer: string
  seller: string
  sellerId: string
  date: string
  amount: number
  paymentMethod: PaymentMethod
  status: SaleStatus
}

function escapeCsv(value: string): string {
  if (/[",\n;]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`
  }
  return value
}

function downloadCsv(rows: ReportRow[]) {
  const header = ['ID', 'Cliente', 'Vendedor', 'Data', 'Pagamento', 'Valor', 'Status']
  const lines = [
    header.join(';'),
    ...rows.map((r) =>
      [
        r.id,
        r.customer,
        r.seller,
        r.date,
        PAYMENT_METHOD_LABELS[r.paymentMethod] ?? r.paymentMethod,
        formatCurrency(r.amount),
        SALE_STATUS_LABELS[r.status] ?? r.status,
      ]
        .map((v) => escapeCsv(String(v)))
        .join(';'),
    ),
  ]
  const csv = '﻿' + lines.join('\n')
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `relatorios-vendas-${new Date().toISOString().slice(0, 10)}.csv`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
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

  const mappedSales = useMemo<ReportRow[]>(() =>
    sales.map(sale => ({
      id: formatSaleId(sale.id),
      customer: sale.customer?.name ?? 'Cliente',
      seller: sale.seller?.name?.split(' ')[0] ?? 'Vendedor',
      sellerId: String(sale.seller?.id ?? ''),
      date: formatDate(sale.saleDate),
      amount: sale.finalAmount,
      paymentMethod: sale.paymentMethod,
      status: sale.status,
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
    const completedCount = filtered.filter((s) => s.status === 'CONFIRMED').length
    const pendingCount = filtered.filter((s) => s.status === 'PENDING').length
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
        <Button
          variant="outline"
          className="gap-2"
          onClick={() => downloadCsv(filtered)}
          disabled={filtered.length === 0}
        >
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
