'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { BarChart3, LayoutDashboard, ShoppingCart, Package, Users, FileText, LogOut, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AdminMobileNav } from './admin-mobile-nav'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/vendas', label: 'Vendas', icon: ShoppingCart },
  { href: '/admin/produtos', label: 'Produtos', icon: Package },
  { href: '/admin/vendedores', label: 'Vendedores', icon: Users },
  { href: '/admin/relatorios', label: 'Relatórios', icon: FileText },
]

export function AdminNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      <AdminMobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />

      <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">

          <div className="flex items-center gap-6">
            <Link href="/admin/dashboard" className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              <span className="font-bold text-lg text-foreground">VendaFlow</span>
              <span className="text-xs font-semibold bg-red-100 text-red-600 px-1.5 py-0.5 rounded">Admin</span>
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
            <Link
              href="/"
              className="hidden md:flex items-center gap-2 text-sm px-3.5 py-2 rounded-md text-foreground/60 hover:text-foreground hover:bg-accent/60 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sair
            </Link>

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
