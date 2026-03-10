'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Pencil } from 'lucide-react'

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
  onSubmit?: (data: ProfileFormValues) => void
  defaultValues?: Partial<ProfileFormValues>
  isLoading?: boolean
}

export function ProfileForm({ onSubmit, defaultValues = {}, isLoading }: ProfileFormProps) {
  const initial: ProfileFormValues = {
    fullName: defaultValues.fullName ?? '',
    email: defaultValues.email ?? '',
    phone: defaultValues.phone ?? '',
    cpf: defaultValues.cpf ?? '',
    city: defaultValues.city ?? '',
    state: defaultValues.state ?? '',
    bio: defaultValues.bio ?? '',
  }

  const [isEditing, setIsEditing] = useState(false)
  const [values, setValues] = useState<ProfileFormValues>(initial)

  const handleCancel = () => {
    setValues(initial)
    setIsEditing(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit?.(values)
    setIsEditing(false)
  }

  const set = (field: keyof ProfileFormValues) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setValues((v) => ({ ...v, [field]: e.target.value }))

  return (
    <Card className="p-6 gap-0 h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground">Informações Pessoais</h3>
        {isEditing && (
          <div className="flex gap-2">
            <Button type="button" variant="outline" size="sm" onClick={handleCancel}>
              Cancelar
            </Button>
            <Button form="profile-form" type="submit" size="sm" disabled={isLoading}>
              {isLoading ? 'Salvando...' : 'Salvar Alterações'}
            </Button>
          </div>
        )}
      </div>

      <div className="relative">
        <div className={isEditing ? '' : 'blur-sm pointer-events-none select-none'}>
          <form id="profile-form" onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="fullName">Nome Completo</Label>
              <Input
                id="fullName"
                placeholder="Seu nome"
                value={values.fullName}
                onChange={set('fullName')}
                className="mt-1.5"
              />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={values.email}
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
                  value={values.phone}
                  onChange={set('phone')}
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="cpf">CPF</Label>
                <Input
                  id="cpf"
                  placeholder="000.000.000-00"
                  value={values.cpf}
                  onChange={set('cpf')}
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
                  value={values.city}
                  onChange={set('city')}
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="state">Estado</Label>
                <Input
                  id="state"
                  placeholder="SP"
                  value={values.state}
                  onChange={set('state')}
                  className="mt-1.5"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="bio">Biografia</Label>
              <Textarea
                id="bio"
                placeholder="Conte um pouco sobre você..."
                value={values.bio}
                onChange={set('bio')}
                className="mt-1.5 resize-none"
              />
            </div>

          </form>
        </div>

        {!isEditing && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Button size="lg" className="gap-2 shadow-md" onClick={() => setIsEditing(true)}>
              <Pencil className="w-4 h-4" />
              Editar Informações
            </Button>
          </div>
        )}
      </div>
    </Card>
  )
}
