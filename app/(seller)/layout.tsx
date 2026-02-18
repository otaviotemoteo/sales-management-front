import type React from 'react'
import { SellerNavbar } from '@/components/seller/layout/seller-navbar'

export default function SellerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <SellerNavbar />
      <main className="container mx-auto px-4 py-6">{children}</main>
    </div>
  )
}
