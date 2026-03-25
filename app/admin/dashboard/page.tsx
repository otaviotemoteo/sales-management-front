'use client'

import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { AdminStatsOverview } from '@/components/admin/dashboard/admin-stats-overview'
import { SalesEvolutionChart } from '@/components/admin/dashboard/sales-evolution-chart'
import { PaymentMethodsChart } from '@/components/admin/dashboard/payment-methods-chart'
import { PendingPaymentsList } from '@/components/admin/dashboard/pending-payments-list'
import { PeriodSelector } from '@/components/seller/desempenho/period-selector'
import { TopProducts } from '@/components/seller/desempenho/top-products'
import { useDashboard } from '@/hooks/use-dashboard'
import { PAYMENT_METHOD_LABELS } from '@/lib/constants'
import { useAuth } from '@/hooks/use-auth'

type Period = 'day' | 'week' | 'month' | 'year'

const now = new Date()
const hour = now.getHours()
const greeting = hour < 12 ? 'Bom dia' : hour < 18 ? 'Boa tarde' : 'Boa noite'
const dateLabel = now.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })

export default function AdminDashboardPage() {
  const { user } = useAuth()
  const [period, setPeriod] = useState<Period>('month')
  const { dashboard, isLoading } = useDashboard({ period })

  if (isLoading && !dashboard) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  const chartData = dashboard?.salesTrend?.map(t => ({
    date: t.date,
    sales: t.count,
    revenue: t.amount,
  })) ?? []

  const paymentMethods = dashboard?.salesByPaymentMethod
    ? Object.entries(dashboard.salesByPaymentMethod).map(([method, count]) => {
        const total = Object.values(dashboard.salesByPaymentMethod).reduce((a, b) => a + b, 0)
        return {
          method: PAYMENT_METHOD_LABELS[method] ?? method,
          count,
          percentage: total > 0 ? Math.round((count / total) * 100) : 0,
        }
      })
    : []

  const topProducts = dashboard?.topProducts?.map((p, i) => ({
    id: String(p.productId ?? i),
    name: p.productName,
    quantity: p.quantity,
    revenue: p.revenue,
    growth: 0,
  })) ?? []

  const firstName = user?.name?.split(' ')[0] ?? 'Admin'

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">{greeting}, {firstName}!</h1>
        <p className="text-muted-foreground mt-1 capitalize">{dateLabel}</p>
      </div>

      <PeriodSelector selectedPeriod={period} onPeriodChange={setPeriod} />

      <AdminStatsOverview
        totalSales={dashboard?.salesCount ?? 0}
        totalRevenue={dashboard?.totalSalesAmount ?? 0}
        totalCustomers={0}
        activeSellers={0}
        totalProducts={0}
        pendingPaymentsCount={dashboard?.pendingPaymentsCount ?? 0}
        pendingPaymentsValue={dashboard?.pendingPaymentsAmount ?? 0}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SalesEvolutionChart data={chartData} />
        <div />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PaymentMethodsChart methods={paymentMethods} />
        <PendingPaymentsList payments={[]} />
      </div>

      <TopProducts products={topProducts} />
    </div>
  )
}
