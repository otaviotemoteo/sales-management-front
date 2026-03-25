'use client'

import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { PeriodSelector } from '@/components/seller/desempenho/period-selector'
import { StatsOverview } from '@/components/seller/desempenho/stats-overview'
import { SalesChart } from '@/components/seller/desempenho/sales-chart'
import { PaymentMethodsChart } from '@/components/seller/desempenho/payment-methods-chart'
import { TopProducts } from '@/components/seller/desempenho/top-products'
import { useDashboard } from '@/hooks/use-dashboard'
import { PAYMENT_METHOD_LABELS } from '@/lib/constants'

type Period = 'day' | 'week' | 'month' | 'year'

export default function DesempenhoPage() {
  const [period, setPeriod] = useState<Period>('month')
  const { dashboard, isLoading } = useDashboard({ period })

  if (isLoading && !dashboard) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  const salesCount = dashboard?.salesCount ?? 0
  const totalAmount = dashboard?.totalSalesAmount ?? 0
  const averageTicket = salesCount > 0 ? totalAmount / salesCount : 0

  // Transform salesTrend to chart data format
  const chartData = dashboard?.salesTrend?.map(t => ({
    date: t.date,
    sales: t.count,
    revenue: t.amount,
  })) ?? []

  // Transform salesByPaymentMethod to chart format
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

  // Transform topProducts
  const topProducts = dashboard?.topProducts?.map(p => ({
    id: String(p.productId),
    name: p.productName,
    quantity: p.quantity,
    revenue: p.revenue,
    growth: 0,
  })) ?? []

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Desempenho</h1>
        <p className="text-muted-foreground mt-1">Acompanhe suas métricas e resultados</p>
      </div>

      <PeriodSelector selectedPeriod={period} onPeriodChange={setPeriod} />

      <StatsOverview
        totalSales={salesCount}
        totalRevenue={totalAmount}
        totalCustomers={0}
        averageTicket={averageTicket}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SalesChart data={chartData} />
        <PaymentMethodsChart methods={paymentMethods} />
      </div>

      <TopProducts products={topProducts} />
    </div>
  )
}
