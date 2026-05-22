import type React from 'react'
import { SellerNavbar } from '@/components/seller/layout/seller-navbar'
import { SellerOnboardingGuard } from '@/components/onboarding/seller-onboarding-guard'

export default function SellerLayout({ children }: { children: React.ReactNode }) {
  return (
    <SellerOnboardingGuard>
      <div className="min-h-screen bg-background">
        <SellerNavbar />
        <main className="container mx-auto px-4 py-6">{children}</main>
      </div>
    </SellerOnboardingGuard>
  )
}
