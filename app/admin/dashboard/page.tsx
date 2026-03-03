'use client'

import { useState } from 'react'
import { AdminStatsOverview } from '@/components/admin/dashboard/admin-stats-overview'
import { SalesEvolutionChart } from '@/components/admin/dashboard/sales-evolution-chart'
import { SalesBySellerChart } from '@/components/admin/dashboard/sales-by-seller-chart'
import { PaymentMethodsChart } from '@/components/admin/dashboard/payment-methods-chart'
import { PendingPaymentsList } from '@/components/admin/dashboard/pending-payments-list'
import { PeriodSelector } from '@/components/seller/desempenho/period-selector'
import { TopProducts } from '@/components/seller/desempenho/top-products'
import adminData from '@/data/mockup/admin-dashboard.json'

type Period = 'day' | 'week' | 'month' | 'year'

const now = new Date()
const hour = now.getHours()
const greeting = hour < 12 ? 'Bom dia' : hour < 18 ? 'Boa tarde' : 'Boa noite'
const dateLabel = now.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })

export default function AdminDashboardPage() {
  const [period, setPeriod] = useState<Period>('month')
  const data = adminData[period]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">{greeting}, Admin!</h1>
        <p className="text-muted-foreground mt-1 capitalize">{dateLabel}</p>
      </div>

      <PeriodSelector selectedPeriod={period} onPeriodChange={setPeriod} />

      <AdminStatsOverview
        totalSales={data.totalSales}
        totalRevenue={data.totalRevenue}
        totalCustomers={data.totalCustomers}
        activeSellers={data.activeSellers}
        totalProducts={data.totalProducts}
        pendingPaymentsCount={data.pendingPaymentsCount}
        pendingPaymentsValue={data.pendingPaymentsValue}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SalesEvolutionChart data={data.chartData} />
        <SalesBySellerChart data={data.salesBySeller} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PaymentMethodsChart methods={data.paymentMethods} />
        <PendingPaymentsList payments={data.pendingPayments} />
      </div>

      <TopProducts products={data.topProducts.map((p, i) => ({ ...p, id: String(i) }))} />
    </div>
  )
}
