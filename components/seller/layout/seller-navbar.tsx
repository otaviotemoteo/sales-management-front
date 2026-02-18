'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { BarChart3, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SellerMobileNav } from './seller-mobile-nav'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/vendedor/dashboard', label: 'Dashboard' },
  { href: '/vendedor/vendas', label: 'Vendas' },
  { href: '/vendedor/clientes', label: 'Clientes' },
  { href: '/vendedor/desempenho', label: 'Desempenho' },
  { href: '/vendedor/perfil', label: 'Perfil' },
]

export function SellerNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      <SellerMobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />

      <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Link href="/vendedor/dashboard" className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary-foreground" />
              <span className="font-bold text-lg text-foreground">VendaFlow</span>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'text-sm px-3 py-2 rounded-md transition-colors',
                      isActive
                        ? 'bg-primary text-primary-foreground font-medium'
                        : 'text-foreground/70 hover:text-foreground hover:bg-accent/50'
                    )}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-2">
              <Link href="/" className="flex items-center gap-2">
              <span className="text-md text-foreground">Sair</span>
            </Link>
            </div>

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
