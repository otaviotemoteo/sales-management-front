'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BarChart3, Home, Users, TrendingUp, User, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

const navItems = [
  { href: '/seller', label: 'Dashboard', icon: Home },
  { href: '/seller/vendas', label: 'Vendas', icon: BarChart3 },
  { href: '/seller/clientes', label: 'Clientes', icon: Users },
  { href: '/seller/desempenho', label: 'Desempenho', icon: TrendingUp },
  { href: '/seller/perfil', label: 'Perfil', icon: User },
]

interface SellerMobileNavProps {
  open: boolean
  onClose: () => void
}

export function SellerMobileNav({ open, onClose }: SellerMobileNavProps) {
  const pathname = usePathname()

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />

      <aside className="fixed inset-y-0 left-0 w-72 max-w-full border-r border-border bg-background shadow-lg">
        <div className="flex h-16 items-center justify-between border-b border-border px-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg text-foreground">VendaFlow</span>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} aria-label="Fechar menu">
            <X className="w-5 h-5" />
          </Button>
        </div>

        <nav className="p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || pathname?.startsWith(item.href + '/')
            return (
              <Link key={item.href} href={item.href} onClick={onClose} className="block">
                <Button
                  variant={isActive ? 'default' : 'ghost'}
                  className="w-full justify-start gap-3"
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm">{item.label}</span>
                </Button>
              </Link>
            )
          })}
        </nav>
      </aside>
    </div>
  )
}
