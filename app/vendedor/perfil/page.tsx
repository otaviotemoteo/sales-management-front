'use client'

import { ProfileAvatar } from '@/components/seller/perfil/profile-avatar'
import { ProfileForm } from '@/components/seller/perfil/profile-form'
import { ProfileStats } from '@/components/seller/perfil/profile-stats'
import { ChangePasswordForm } from '@/components/seller/perfil/change-password-form'
import sellerData from '@/data/mockup/seller.json'

export default function PerfilPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Meu Perfil</h1>
        <p className="text-muted-foreground mt-1">Gerencie suas informações pessoais</p>
      </div>

      <ProfileStats
        totalSales={sellerData.totalSales}
        totalRevenue={sellerData.totalRevenue}
        averageRating={sellerData.averageRating}
        joinDate={sellerData.joinDate}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ProfileAvatar
          name={sellerData.fullName}
          email={sellerData.email}
          phone={sellerData.phone}
          cpf={sellerData.cpf}
          city={sellerData.city}
          state={sellerData.state}
          bio={sellerData.bio}
          joinDate={sellerData.joinDate}
          avatarUrl={sellerData.avatarUrl ?? undefined}
        />
        <div className="lg:col-span-2">
          <ProfileForm
            defaultValues={{
              fullName: sellerData.fullName,
              email: sellerData.email,
              phone: sellerData.phone,
              cpf: sellerData.cpf,
              city: sellerData.city,
              state: sellerData.state,
              bio: sellerData.bio,
            }}
          />
        </div>
      </div>

      <ChangePasswordForm />
    </div>
  )
}
