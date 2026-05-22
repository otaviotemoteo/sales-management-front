'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, Users } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { SellerForm } from '@/components/admin/vendedores/seller-form'
import { useAuth } from '@/hooks/use-auth'
import { useToast } from '@/hooks/use-toast'
import * as usersService from '@/services/users.service'
import { getOnboardingCounts } from '@/lib/onboarding'

export default function OnboardingVendedorPage() {
  const { user, isLoading: authLoading } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (authLoading) return
    if (user && user.role !== 'ADMIN') {
      router.replace('/vendedor/dashboard')
      return
    }
    getOnboardingCounts()
      .then(({ productCount, sellerCount }) => {
        if (productCount === 0) router.replace('/onboarding/produto')
        else if (sellerCount > 0) router.replace('/admin/dashboard')
        else setReady(true)
      })
      .catch(() => setReady(true))
  }, [authLoading, user, router])

  async function handleCreate(values: { fullName: string; email: string; phone: string }) {
    try {
      await usersService.createUser({
        name: values.fullName,
        email: values.email,
        role: 'SELLER',
      })
      toast({ title: 'Vendedor criado!' })
      router.replace('/onboarding/concluido')
    } catch (err) {
      toast({
        title: 'Erro ao criar vendedor',
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
        <p className="text-sm font-medium text-primary">Passo 2 de 2</p>
        <div className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-primary/10 text-primary">
          <Users className="w-5 h-5" />
        </div>
        <h1 className="text-2xl font-bold text-foreground">Cadastre seu primeiro vendedor</h1>
        <p className="text-muted-foreground">
          O vendedor acessará pelo e-mail e definirá a própria senha no primeiro acesso.
        </p>
      </div>

      <SellerForm onSubmit={handleCreate} onCancel={() => {}} />
    </Card>
  )
}
