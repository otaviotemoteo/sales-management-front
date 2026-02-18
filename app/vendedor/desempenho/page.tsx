'use client'

import { useState } from 'react'
import { PeriodSelector } from '@/components/seller/desempenho/period-selector'
import { StatsOverview } from '@/components/seller/desempenho/stats-overview'
import { SalesChart } from '@/components/seller/desempenho/sales-chart'
import { PaymentMethodsChart } from '@/components/seller/desempenho/payment-methods-chart'
import { TopProducts } from '@/components/seller/desempenho/top-products'
import { PerformanceCard } from '@/components/seller/desempenho/performance-card'
import performanceData from '@/data/mockup/performance.json'

type Period = 'day' | 'week' | 'month' | 'year'

export default function DesempenhoPage() {
  const [period, setPeriod] = useState<Period>('month')
  const data = performanceData[period]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Desempenho</h1>
        <p className="text-muted-foreground mt-1">Acompanhe suas métricas e resultados</p>
      </div>

      <PeriodSelector selectedPeriod={period} onPeriodChange={setPeriod} />

      <StatsOverview
        totalSales={data.totalSales}
        totalRevenue={data.totalRevenue}
        totalCustomers={data.totalCustomers}
        averageTicket={data.averageTicket}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SalesChart data={data.chartData} />
        <PaymentMethodsChart methods={data.paymentMethods} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {data.performanceCards.map((card) => (
          <PerformanceCard
            key={card.title}
            title={card.title}
            value={card.value}
            change={card.change}
            changeType={card.changeType as 'increase' | 'decrease'}
          />
        ))}
      </div>

      <TopProducts products={data.topProducts} />
    </div>
  )
}
