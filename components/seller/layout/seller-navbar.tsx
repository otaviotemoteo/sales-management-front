'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SellerMobileNav } from './seller-mobile-nav'

const navItems = [
  { href: '/seller', label: 'Dashboard' },
  { href: '/seller/vendas', label: 'Vendas' },
  { href: '/seller/clientes', label: 'Clientes' },
  { href: '/seller/desempenho', label: 'Desempenho' },
  { href: '/seller/perfil', label: 'Perfil' },
]

export function SellerNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      <SellerMobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />

      <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Link href="/seller" className="flex items-center gap-2">
              <span className="font-bold text-lg text-foreground">VendaFlow</span>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-foreground/80 hover:text-foreground px-3 py-2 rounded-md"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-2">
              <Button variant="ghost" size="sm">Ajuda</Button>
              <Button variant="ghost" size="sm">Conta</Button>
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
