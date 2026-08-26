'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, Package } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { ProductForm } from '@/components/admin/products/product-form'
import { useAuth } from '@/hooks/use-auth'
import { useToast } from '@/hooks/use-toast'
import * as productsService from '@/services/products.service'
import { getOnboardingCounts } from '@/lib/onboarding'

export default function OnboardingProductPage() {
  const { user, isLoading: authLoading } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (authLoading) return
    if (user && user.role !== 'ADMIN') {
      router.replace('/seller/dashboard')
      return
    }
    getOnboardingCounts()
      .then(({ productCount, sellerCount }) => {
        if (productCount > 0 && sellerCount > 0) router.replace('/admin/dashboard')
        else if (productCount > 0) router.replace('/onboarding/seller-invite')
        else setReady(true)
      })
      .catch(() => setReady(true))
  }, [authLoading, user, router])

  async function handleCreate(values: { name: string; price: number; category: string; stock: number }) {
    try {
      await productsService.createProduct(values)
      toast({ title: 'Product created.' })
      router.replace('/onboarding/seller-invite')
    } catch (err) {
      toast({
        title: 'Could not create the product',
        description: err instanceof Error ? err.message : 'Tente novamente',
        variant: 'destructive',
      })
    }
  }

  if (!ready) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <Card className="p-8 space-y-6">
      <div className="space-y-2">
        <p className="text-sm font-medium text-primary">Step 1 of 2</p>
        <div className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-primary/10 text-primary">
          <Package className="w-5 h-5" />
        </div>
        <h1 className="text-2xl font-bold text-foreground">Add your first product</h1>
        <p className="text-muted-foreground">
          Let's start with the catalogue. You can add more products later.
        </p>
      </div>

      <ProductForm onSubmit={handleCreate} onCancel={() => {}} />
    </Card>
  )
}
