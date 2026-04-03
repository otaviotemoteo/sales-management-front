'use client'

import Link from 'next/link'
import { useState } from 'react'
import { BarChart3, Users, TrendingUp, User, ArrowRight, Plus, Loader2 } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { NewSaleForm } from '@/components/seller/vendas/new-sale-form'
import { StatsOverview } from '@/components/seller/desempenho/stats-overview'
import { TopProducts } from '@/components/seller/desempenho/top-products'
import { useAuth } from '@/hooks/use-auth'
import { useSales } from '@/hooks/use-sales'
import { useDashboard } from '@/hooks/use-dashboard'
import { useCustomers } from '@/hooks/use-customers'
import { SALE_STATUS_LABELS, formatDate, formatCurrency } from '@/lib/constants'

const statusVariant: Record<string, 'default' | 'secondary' | 'destructive'> = {
  CONFIRMED: 'default',
  PENDING: 'secondary',
  CANCELLED: 'destructive',
}

const quickLinks = [
  { href: '/vendedor/vendas', label: 'Vendas', description: 'Registrar e gerenciar vendas', icon: BarChart3, color: 'bg-blue-100 text-blue-600' },
  { href: '/vendedor/clientes', label: 'Clientes', description: 'Consultar e cadastrar clientes', icon: Users, color: 'bg-green-100 text-green-600' },
  { href: '/vendedor/desempenho', label: 'Desempenho', description: 'Ver métricas e gráficos', icon: TrendingUp, color: 'bg-purple-100 text-purple-600' },
  { href: '/vendedor/perfil', label: 'Perfil', description: 'Gerenciar sua conta', icon: User, color: 'bg-orange-100 text-orange-600' },
]

const now = new Date()
const hour = now.getHours()
const greeting = hour < 12 ? 'Bom dia' : hour < 18 ? 'Boa tarde' : 'Boa noite'
const dateLabel = now.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })

export default function DashboardPage() {
  const { user } = useAuth()
  const { sales, isLoading: salesLoading, refresh: refreshSales } = useSales({ own: true, size: 6 })
  const { dashboard, isLoading: dashLoading } = useDashboard({ period: 'month' })
  const { pagination: customersPag } = useCustomers({ size: 1 })
  const [newSaleOpen, setNewSaleOpen] = useState(false)

  const isLoading = salesLoading || dashLoading

  if (isLoading && !dashboard && sales.length === 0) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  const firstName = user?.name?.split(' ')[0] ?? 'Vendedor'

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            {greeting}, {firstName}!
          </h1>
          <p className="text-muted-foreground mt-1 capitalize">{dateLabel}</p>
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
              <NewSaleForm onSuccess={() => { setNewSaleOpen(false); refreshSales() }} />
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <StatsOverview
        totalSales={dashboard?.salesCount ?? 0}
        totalRevenue={dashboard?.totalSalesAmount ?? 0}
        totalCustomers={customersPag?.totalElements ?? 0}
        averageTicket={dashboard && dashboard.salesCount > 0 ? dashboard.totalSalesAmount / dashboard.salesCount : 0}
      />

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-foreground">Vendas Recentes</h2>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/vendedor/vendas" className="gap-1 flex items-center text-sm">
                Ver todas <ArrowRight className="w-3 h-3" />
              </Link>
            </Button>
          </div>
          <div className="space-y-3">
            {sales.map((sale) => (
              <div key={sale.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div>
                  <p className="text-sm font-medium text-foreground">{sale.customer.name}</p>
                  <p className="text-xs text-muted-foreground">{formatDate(sale.saleDate)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-foreground">
                    {formatCurrency(sale.finalAmount)}
                  </span>
                  <Badge variant={statusVariant[sale.status] ?? 'secondary'}>
                    {SALE_STATUS_LABELS[sale.status] ?? sale.status}
                  </Badge>
                </div>
              </div>
            ))}
            {sales.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">Nenhuma venda recente</p>
            )}
          </div>
        </Card>

        <TopProducts products={dashboard?.topProducts?.map(p => ({
          id: String(p.productId),
          name: p.productName,
          quantity: p.quantity,
          revenue: p.revenue,
          growth: 0,
        })) ?? []} />
      </div>
    </div>
  )
}
