'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import { getOnboardingCounts } from '@/lib/onboarding'

export function AdminOnboardingGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [allowed, setAllowed] = useState(false)

  useEffect(() => {
    let cancelled = false
    getOnboardingCounts()
      .then(({ productCount, sellerCount }) => {
        if (cancelled) return
        if (productCount === 0) router.replace('/onboarding/produto')
        else if (sellerCount === 0) router.replace('/onboarding/vendedor')
        else setAllowed(true)
      })
      .catch(() => {
        // On failure, don't trap the admin out of their panel.
        if (!cancelled) setAllowed(true)
      })
    return () => { cancelled = true }
  }, [router])

  if (!allowed) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return <>{children}</>
}
