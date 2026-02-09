'use client'

import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

interface CustomerFormProps {
  onSubmit?: (data: any) => void
  defaultValues?: any
  isLoading?: boolean
}

export function CustomerForm({ onSubmit, defaultValues, isLoading }: CustomerFormProps) {
  return (
    <Card className="p-6">
      <form onSubmit={(e) => { e.preventDefault(); onSubmit?.({}); }} className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              placeholder="Nome do cliente"
              defaultValue={defaultValues?.name}
              className="mt-1.5"
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
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
              placeholder="(00) 00000-0000"
              defaultValue={defaultValues?.phone}
              className="mt-1.5"
            />
          </div>
          <div>
            <Label htmlFor="city">Cidade</Label>
            <Input
              id="city"
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
              placeholder="SP"
              defaultValue={defaultValues?.state}
              className="mt-1.5"
            />
          </div>
          <div>
            <Label htmlFor="zip">CEP</Label>
            <Input
              id="zip"
              placeholder="00000-000"
              defaultValue={defaultValues?.zip}
              className="mt-1.5"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="notes">Observações</Label>
          <Textarea
            id="notes"
            placeholder="Adicione observações sobre o cliente..."
            defaultValue={defaultValues?.notes}
            className="mt-1.5"
          />
        </div>

        <Button className="w-full" disabled={isLoading}>
          {isLoading ? 'Salvando...' : 'Salvar Cliente'}
        </Button>
      </form>
    </Card>
  )
}
