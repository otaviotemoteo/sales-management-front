'use client'

import { useState, useMemo } from 'react'
import { Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ReportsFilters } from '@/components/admin/relatorios/reports-filters'
import { ReportSummary } from '@/components/admin/relatorios/report-summary'
import { SalesReportTable } from '@/components/admin/relatorios/sales-report-table'
import salesData from '@/data/mockup/sales.json'
import sellersData from '@/data/mockup/sellers.json'

// Assign sellers to sales deterministically for mockup purposes
const sellerNames = sellersData.filter((s) => s.status === 'active').map((s) => s.fullName.split(' ')[0])

const enrichedSales = salesData.map((sale, idx) => ({
  ...sale,
  seller: sellerNames[idx % sellerNames.length],
  sellerId: sellersData[idx % sellersData.length].id,
}))

const sellerOptions = sellersData.map((s) => ({
  id: s.id,
  name: s.fullName,
}))

export default function RelatoriosPage() {
  const [period, setPeriod] = useState('all')
  const [seller, setSeller] = useState('all')
  const [status, setStatus] = useState('all')

  const filtered = useMemo(() => {
    return enrichedSales.filter((sale) => {
      const matchSeller = seller === 'all' || sale.sellerId === seller
      const matchStatus = status === 'all' || sale.status === status
      return matchSeller && matchStatus
    })
  }, [seller, status])

  const summary = useMemo(() => {
    const totalSales = filtered.length
    const totalRevenue = filtered.reduce((sum, s) => sum + s.amount, 0)
    const completedCount = filtered.filter((s) => s.status === 'completed').length
    const pendingCount = filtered.filter((s) => s.status === 'pending').length
    return { totalSales, totalRevenue, completedCount, pendingCount }
  }, [filtered])

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
