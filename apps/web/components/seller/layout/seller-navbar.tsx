'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { BarChart3, Home, Users, TrendingUp, User, LogOut, Menu, ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SellerMobileNav } from './seller-mobile-nav'
import { cn } from '@/lib/utils'
import { useAuth } from '@/hooks/use-auth'

const navItems = [
  { href: '/vendedor/dashboard', label: 'Dashboard', icon: Home },
  { href: '/vendedor/vendas', label: 'Vendas', icon: ShoppingCart },
  { href: '/vendedor/clientes', label: 'Clientes', icon: Users },
  { href: '/vendedor/desempenho', label: 'Desempenho', icon: TrendingUp },
  { href: '/vendedor/perfil', label: 'Perfil', icon: User },
]

export function SellerNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { logout } = useAuth()

  return (
    <>
      <SellerMobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />

      <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">

          <div className="flex items-center gap-6">
            <Link href="/vendedor/dashboard" className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              <span className="font-bold text-lg text-foreground">VendaFlow</span>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'flex items-center gap-2 text-sm px-3.5 py-2 rounded-md transition-colors',
                      isActive
                        ? 'bg-primary text-primary-foreground font-medium'
                        : 'text-foreground/60 hover:text-foreground hover:bg-accent/60'
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                )
              })}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={async () => { await logout(); router.push('/login') }}
              className="hidden md:flex items-center gap-2 text-sm px-3.5 py-2 rounded-md text-foreground/60 hover:text-foreground hover:bg-accent/60 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sair
            </button>

            <div className="md:hidden">
              <Button variant="ghost" size="sm" onClick={() => setMobileOpen(true)}>
                <Menu className="w-5 h-5" />
              </Button>
            </div>
          </div>

        </div>
      </nav>
    </>
  )
}
