'use client'

import { Card } from '@/components/ui/card'
import { Shield, Users, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useInView } from '@/hooks/use-in-view'

const adminFeatures = [
  'A dashboard with the overall metrics',
  'Product and category management',
  'Seller and permission management',
  'Detailed reports by period',
  'Data export to PDF',
  'Full audit logs',
]

const sellerFeatures = [
  'Quick sale entry',
  'New customer registration',
  'Your own sales history',
  'Acompanhamento de metas',
  'Interface mobile otimizada',
  'Payment notifications',
]

export function ModulesSection() {
  const { ref, inView } = useInView()

  return (
    <section className="container mx-auto px-4 py-20">
      <div ref={ref} className="grid lg:grid-cols-2 gap-12">
        <Card
          className={cn(
            'p-8 space-y-6 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 transition-all duration-300 hover:scale-[1.01] hover:shadow-xl',
            inView
              ? 'animate-in fade-in-0 slide-in-from-bottom-4 duration-700 fill-mode-both'
              : 'opacity-0'
          )}
          style={{ animationDelay: '0ms' }}
        >
          <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
            <Shield className="w-6 h-6 text-primary-foreground" />
          </div>
          <h3 className="text-2xl font-bold text-foreground">
            Para Administradores
          </h3>
          <ul className="space-y-3">
            {adminFeatures.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card
          className={cn(
            'p-8 space-y-6 bg-gradient-to-br from-accent/5 to-accent/10 border-accent/20 transition-all duration-300 hover:scale-[1.01] hover:shadow-xl',
            inView
              ? 'animate-in fade-in-0 slide-in-from-bottom-4 duration-700 fill-mode-both'
              : 'opacity-0'
          )}
          style={{ animationDelay: '150ms' }}
        >
          <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
            <Users className="w-6 h-6 text-accent-foreground" />
          </div>
          <h3 className="text-2xl font-bold text-foreground">
            Para Sellers
          </h3>
          <ul className="space-y-3">
            {sellerFeatures.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-accent-foreground mt-0.5 flex-shrink-0" />
                <span className="text-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </section>
  )
}
