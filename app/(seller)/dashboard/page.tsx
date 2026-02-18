'use client'

import Link from 'next/link'
import { BarChart3, Users, TrendingUp, User, ArrowRight } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
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
  { href: '/vendas', label: 'Vendas', description: 'Registrar e gerenciar vendas', icon: BarChart3, color: 'bg-blue-100 text-blue-600' },
  { href: '/clientes', label: 'Clientes', description: 'Consultar e cadastrar clientes', icon: Users, color: 'bg-green-100 text-green-600' },
  { href: '/desempenho', label: 'Desempenho', description: 'Ver métricas e gráficos', icon: TrendingUp, color: 'bg-purple-100 text-purple-600' },
  { href: '/perfil', label: 'Perfil', description: 'Gerenciar sua conta', icon: User, color: 'bg-orange-100 text-orange-600' },
]

const now = new Date()
const hour = now.getHours()
const greeting = hour < 12 ? 'Bom dia' : hour < 18 ? 'Boa tarde' : 'Boa noite'
const dateLabel = now.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })

const monthData = performanceData.month
const recentSales = salesData.slice(0, 6)

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          {greeting}, {sellerData.fullName.split(' ')[0]}!
        </h1>
        <p className="text-muted-foreground mt-1 capitalize">{dateLabel}</p>
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
              <Link href="/vendas" className="gap-1 flex items-center text-sm">
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

      <div>
        <h2 className="font-semibold text-foreground mb-4">Acesso Rápido</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickLinks.map(({ href, label, description, icon: Icon, color }) => (
            <Link key={href} href={href}>
              <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer h-full">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-foreground text-sm">{label}</h3>
                <p className="text-xs text-muted-foreground mt-1">{description}</p>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
