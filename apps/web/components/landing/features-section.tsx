'use client'

import { Card } from '@/components/ui/card'
import {
  Package,
  Users,
  BarChart3,
  DollarSign,
  TrendingUp,
  Smartphone,
  Zap,
  CheckCircle2,
  Clock,
  Shield,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useInView } from '@/hooks/use-in-view'

const features = [
  {
    icon: Package,
    title: 'Product management',
    description:
      'Add and manage products with photos, prices, categories and stock, simply and quickly.',
  },
  {
    icon: Users,
    title: 'Seller management',
    description:
      'Manage your sales team, follow individual performance, and set access permissions.',
  },
  {
    icon: BarChart3,
    title: 'Sales log',
    description:
      'Record sales quickly, with product selection, customers and payment methods built in.',
  },
  {
    icon: DollarSign,
    title: 'Closing by customer',
    description:
      'Group sales by customer, see the full history, and manage outstanding payments.',
  },
  {
    icon: TrendingUp,
    title: 'Dashboard Inteligente',
    description:
      'Real-time metrics, trend charts and detailed reports to decide on.',
  },
  {
    icon: Smartphone,
    title: 'Mobile First',
    description:
      'Interface otimizada para vendedores em campo, funciona perfeitamente em smartphones e tablets.',
  },
]

const paymentMethods = [
  { name: 'Dinheiro', icon: DollarSign },
  { name: 'PIX', icon: Zap },
  { name: 'Debit card', icon: CheckCircle2 },
  { name: 'Credit card', icon: CheckCircle2 },
]

const stats = [
  { value: '< 2s', label: 'Load time', icon: Clock },
  { value: '100%', label: 'Data security', icon: Shield },
  { value: '24/7', label: 'Disponibilidade', icon: Zap },
]

export function FeaturesSection() {
  const { ref: featuresRef, inView: featuresInView } = useInView()
  const { ref: paymentsRef, inView: paymentsInView } = useInView()
  const { ref: statsRef, inView: statsInView } = useInView()

  return (
    <>
      {/* Features Grid */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground text-balance">
            Everything you need to sell more
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Funcionalidades completas para administradores e vendedores
          </p>
        </div>

        <div ref={featuresRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <Card
              key={i}
              className={cn(
                'p-6 space-y-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl',
                featuresInView
                  ? 'animate-in fade-in-0 slide-in-from-bottom-4 duration-500 fill-mode-both'
                  : 'opacity-0'
              )}
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* Payment Methods */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground text-balance">
            Multiple payment methods
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Record sales with different payment methods and track their status
          </p>
        </div>

        <div ref={paymentsRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {paymentMethods.map((method, i) => (
            <Card
              key={i}
              className={cn(
                'p-6 text-center space-y-3 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg',
                paymentsInView
                  ? 'animate-in fade-in-0 slide-in-from-bottom-4 duration-500 fill-mode-both'
                  : 'opacity-0'
              )}
              style={{ animationDelay: `${i * 75}ms` }}
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <method.icon className="w-6 h-6 text-primary" />
              </div>
              <p className="font-semibold text-foreground">{method.name}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-20">
        <div ref={statsRef} className="grid md:grid-cols-3 gap-8 text-center">
          {stats.map((stat, i) => (
            <div
              key={i}
              className={cn(
                'space-y-3',
                statsInView
                  ? 'animate-in fade-in-0 slide-in-from-bottom-4 duration-500 fill-mode-both'
                  : 'opacity-0'
              )}
              style={{ animationDelay: `${i * 150}ms` }}
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <stat.icon className="w-8 h-8 text-primary" />
              </div>
              <p className="text-4xl font-bold text-foreground">{stat.value}</p>
              <p className="text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
