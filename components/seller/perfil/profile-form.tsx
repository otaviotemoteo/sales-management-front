'use client'

import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

interface ProfileFormProps {
  onSubmit?: (data: any) => void
  defaultValues?: any
  isLoading?: boolean
}

export function ProfileForm({ onSubmit, defaultValues, isLoading }: ProfileFormProps) {
  return (
    <Card className="p-6">
      <form onSubmit={(e) => { e.preventDefault(); onSubmit?.({}); }} className="space-y-4">
        <div>
          <Label htmlFor="fullName">Nome Completo</Label>
          <Input
            id="fullName"
            placeholder="Seu nome"
            defaultValue={defaultValues?.fullName}
            className="mt-1.5"
          />
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="seu@email.com"
            defaultValue={defaultValues?.email}
            className="mt-1.5"
            disabled
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="phone">Telefone</Label>
            <Input
              id="phone"
              placeholder="(00) 00000-0000"
              defaultValue={defaultValues?.phone}
              className="mt-1.5"
            />
          </div>
          <div>
            <Label htmlFor="cpf">CPF</Label>
            <Input
              id="cpf"
              placeholder="000.000.000-00"
              defaultValue={defaultValues?.cpf}
              className="mt-1.5"
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="city">Cidade</Label>
            <Input
              id="city"
              placeholder="São Paulo"
              defaultValue={defaultValues?.city}
              className="mt-1.5"
            />
          </div>
          <div>
            <Label htmlFor="state">Estado</Label>
            <Input
              id="state"
              placeholder="SP"
              defaultValue={defaultValues?.state}
              className="mt-1.5"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="bio">Biografia</Label>
          <Textarea
            id="bio"
            placeholder="Conte um pouco sobre você..."
            defaultValue={defaultValues?.bio}
            className="mt-1.5"
          />
        </div>

        <Button className="w-full" disabled={isLoading}>
          {isLoading ? 'Salvando...' : 'Salvar Alterações'}
        </Button>
      </form>
    </Card>
  )
}
