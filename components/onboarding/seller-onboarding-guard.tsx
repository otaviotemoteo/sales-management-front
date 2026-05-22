'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import { useAuth } from '@/hooks/use-auth'

export function SellerOnboardingGuard({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  const mustOnboard = !!user?.mustSetPassword

  useEffect(() => {
    if (!isLoading && mustOnboard) {
      router.replace('/onboarding/seller')
    }
  }, [isLoading, mustOnboard, router])

  if (isLoading || mustOnboard) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return <>{children}</>
}
