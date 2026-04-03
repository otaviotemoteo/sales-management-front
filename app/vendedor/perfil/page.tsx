'use client'

import { Loader2 } from 'lucide-react'
import { ProfileAvatar } from '@/components/seller/perfil/profile-avatar'
import { ProfileForm } from '@/components/seller/perfil/profile-form'
import { ProfileStats } from '@/components/seller/perfil/profile-stats'
import { ChangePasswordForm } from '@/components/seller/perfil/change-password-form'
import { useAuth } from '@/hooks/use-auth'
import { useDashboard } from '@/hooks/use-dashboard'

export default function PerfilPage() {
  const { user, isLoading: authLoading } = useAuth()
  const { dashboard } = useDashboard({ period: 'year' })

  if (authLoading || !user) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Meu Perfil</h1>
        <p className="text-muted-foreground mt-1">Suas informações pessoais</p>
      </div>

      <ProfileStats
        totalSales={dashboard?.salesCount ?? 0}
        totalRevenue={dashboard?.totalSalesAmount ?? 0}
        averageRating={0}
        joinDate={user.createdAt ? new Date(user.createdAt).toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' }) : ''}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ProfileAvatar
          name={user.name}
          email={user.email}
          phone=""
          cpf=""
          city=""
          state=""
          bio=""
          joinDate={user.createdAt ? new Date(user.createdAt).toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' }) : ''}
          avatarUrl={undefined}
        />
        <div className="lg:col-span-2">
          <ProfileForm
            defaultValues={{
              fullName: user.name,
              email: user.email,
              phone: '',
              cpf: '',
              city: '',
              state: '',
              bio: '',
            }}
          />
        </div>
      </div>

      <div className="lg:col-span-2">
        <ChangePasswordForm />
      </div>
    </div>
  )
}
