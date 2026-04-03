'use client'

import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Info } from 'lucide-react'

interface ProfileFormValues {
  fullName: string
  email: string
  phone: string
  cpf: string
  city: string
  state: string
  bio: string
}

interface ProfileFormProps {
  defaultValues?: Partial<ProfileFormValues>
}

export function ProfileForm({ defaultValues = {} }: ProfileFormProps) {
  return (
    <Card className="p-6 gap-0 h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground">Informações Pessoais</h3>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="fullName">Nome Completo</Label>
          <Input
            id="fullName"
            value={defaultValues.fullName ?? ''}
            className="mt-1.5"
            disabled
          />
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={defaultValues.email ?? ''}
            className="mt-1.5"
            disabled
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="phone">Telefone</Label>
            <Input
              id="phone"
              placeholder="—"
              value={defaultValues.phone ?? ''}
              className="mt-1.5"
              disabled
            />
          </div>
          <div>
            <Label htmlFor="cpf">CPF</Label>
            <Input
              id="cpf"
              placeholder="—"
              value={defaultValues.cpf ?? ''}
              className="mt-1.5"
              disabled
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="city">Cidade</Label>
            <Input
              id="city"
              placeholder="—"
              value={defaultValues.city ?? ''}
              className="mt-1.5"
              disabled
            />
          </div>
          <div>
            <Label htmlFor="state">Estado</Label>
            <Input
              id="state"
              placeholder="—"
              value={defaultValues.state ?? ''}
              className="mt-1.5"
              disabled
            />
          </div>
        </div>

        <div>
          <Label htmlFor="bio">Biografia</Label>
          <Textarea
            id="bio"
            placeholder="—"
            value={defaultValues.bio ?? ''}
            className="mt-1.5 resize-none"
            disabled
          />
        </div>

        <div className="flex items-center gap-2 p-3 rounded-md bg-muted text-sm text-muted-foreground">
          <Info className="w-4 h-4 shrink-0" />
          <span>Para alterar seus dados, entre em contato com o administrador.</span>
        </div>
      </div>
    </Card>
  )
}
