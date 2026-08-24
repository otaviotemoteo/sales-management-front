'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { BarChart3, LayoutDashboard, ShoppingCart, Package, Users, FileText, X, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useAuth } from '@/hooks/use-auth'

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/vendas', label: 'Vendas', icon: ShoppingCart },
  { href: '/admin/produtos', label: 'Produtos', icon: Package },
  { href: '/admin/vendedores', label: 'Vendedores', icon: Users },
  { href: '/admin/relatorios', label: 'Relatórios', icon: FileText },
]

interface AdminMobileNavProps {
  open: boolean
  onClose: () => void
}

export function AdminMobileNav({ open, onClose }: AdminMobileNavProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { logout } = useAuth()

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 md:hidden transition-all',
        open ? 'pointer-events-auto' : 'pointer-events-none'
      )}
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 bg-black/50 transition-opacity duration-300',
          open ? 'opacity-100' : 'opacity-0'
        )}
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 w-72 max-w-full border-r border-border bg-background shadow-lg transition-transform duration-300 ease-in-out flex flex-col',
          open ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-border px-5">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            <span className="font-bold text-lg text-foreground">VendaFlow</span>
            <span className="text-xs font-semibold bg-red-100 text-red-600 px-1.5 py-0.5 rounded">Admin</span>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} aria-label="Fechar menu">
            <X className="w-5 h-5" />
          </Button>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link key={item.href} href={item.href} onClick={onClose} className="block">
                <Button
                  variant={isActive ? 'default' : 'ghost'}
                  className="w-full justify-start gap-3 h-10"
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Button>
              </Link>
            )
          })}
        </nav>

        <div className="border-t border-border p-4">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 h-10 text-foreground/60"
            onClick={async () => { onClose(); await logout(); router.push('/login') }}
          >
            <LogOut className="w-4 h-4" />
            <span>Sair</span>
          </Button>
        </div>
      </aside>
    </div>
  )
}
