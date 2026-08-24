import type React from 'react'
import { AdminNavbar } from '@/components/admin/layout/admin-navbar'
import { AdminOnboardingGuard } from '@/components/onboarding/admin-onboarding-guard'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminOnboardingGuard>
      <div className="min-h-screen bg-background">
        <AdminNavbar />
        <main className="container mx-auto px-4 py-6">{children}</main>
      </div>
    </AdminOnboardingGuard>
  )
}
