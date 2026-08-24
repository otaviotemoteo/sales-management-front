'use client'

import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import type { CreateCustomerRequest } from '@/types/customer'

interface CustomerFormProps {
  onSubmit?: (data: CreateCustomerRequest) => void
  defaultValues?: Partial<CreateCustomerRequest & { city?: string; state?: string; zip?: string }>
  isLoading?: boolean
}

export function CustomerForm({ onSubmit, defaultValues, isLoading }: CustomerFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const name = (fd.get('name') as string)?.trim()
    const email = (fd.get('email') as string)?.trim() || undefined
    const phone = (fd.get('phone') as string)?.trim() || undefined
    const city = (fd.get('city') as string)?.trim()
    const state = (fd.get('state') as string)?.trim()
    const zip = (fd.get('zip') as string)?.trim()
    const address = [city, state, zip].filter(Boolean).join(', ') || undefined

    if (!name) return

    onSubmit?.({ name, email, phone, address })
  }

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              name="name"
              placeholder="Nome do cliente"
              defaultValue={defaultValues?.name}
              required
              className="mt-1.5"
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="email@example.com"
              defaultValue={defaultValues?.email}
              className="mt-1.5"
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="phone">Telefone</Label>
            <Input
              id="phone"
              name="phone"
              placeholder="(00) 00000-0000"
              defaultValue={defaultValues?.phone}
              className="mt-1.5"
            />
          </div>
          <div>
            <Label htmlFor="city">Cidade</Label>
            <Input
              id="city"
              name="city"
              placeholder="São Paulo"
              defaultValue={defaultValues?.city}
              className="mt-1.5"
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="state">Estado</Label>
            <Input
              id="state"
              name="state"
              placeholder="SP"
              defaultValue={defaultValues?.state}
              className="mt-1.5"
            />
          </div>
          <div>
            <Label htmlFor="zip">CEP</Label>
            <Input
              id="zip"
              name="zip"
              placeholder="00000-000"
              defaultValue={defaultValues?.zip}
              className="mt-1.5"
            />
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Salvando...' : 'Salvar Cliente'}
        </Button>
      </form>
    </Card>
  )
}
