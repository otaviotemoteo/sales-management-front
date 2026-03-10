'use client'

import Link from 'next/link'
import { useState } from 'react'
import { BarChart3, Users, TrendingUp, User, ArrowRight, Plus } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { NewSaleForm } from '@/components/seller/vendas/new-sale-form'
import { StatsOverview } from '@/components/seller/desempenho/stats-overview'
import { TopProducts } from '@/components/seller/desempenho/top-products'
import sellerData from '@/data/mockup/seller.json'
import salesData from '@/data/mockup/sales.json'
import performanceData from '@/data/mockup/performance.json'

const statusLabel: Record<string, string> = {
  completed: 'Concluída',
  pending: 'Pendente',
  cancelled: 'Cancelada',
}

const statusVariant: Record<string, 'default' | 'secondary' | 'destructive'> = {
  completed: 'default',
  pending: 'secondary',
  cancelled: 'destructive',
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

const monthData = performanceData.month
const recentSales = salesData.slice(0, 6)

export default function DashboardPage() {
  const [newSaleOpen, setNewSaleOpen] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            {greeting}, {sellerData.fullName.split(' ')[0]}!
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
              <NewSaleForm onSubmit={() => setNewSaleOpen(false)} />
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <StatsOverview
        totalSales={monthData.totalSales}
        totalRevenue={monthData.totalRevenue}
        totalCustomers={monthData.totalCustomers}
        averageTicket={monthData.averageTicket}
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
            {recentSales.map((sale) => (
              <div key={sale.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div>
                  <p className="text-sm font-medium text-foreground">{sale.customer}</p>
                  <p className="text-xs text-muted-foreground">{sale.date}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-foreground">
                    R$ {sale.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                  <Badge variant={statusVariant[sale.status]}>
                    {statusLabel[sale.status]}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <TopProducts products={monthData.topProducts} />
      </div>
    </div>
  )
}
