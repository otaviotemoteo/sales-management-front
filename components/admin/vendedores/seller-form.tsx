'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface SellerFormValues {
  fullName: string
  email: string
  phone: string
}

interface SellerFormProps {
  initialValues?: Partial<SellerFormValues>
  onSubmit: (values: SellerFormValues) => void
  onCancel: () => void
}

export function SellerForm({ initialValues, onSubmit, onCancel }: SellerFormProps) {
  const [fullName, setFullName] = useState(initialValues?.fullName ?? '')
  const [email, setEmail] = useState(initialValues?.email ?? '')
  const [phone, setPhone] = useState(initialValues?.phone ?? '')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSubmit({ fullName, email, phone })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="seller-name">Nome completo</Label>
        <Input
          id="seller-name"
          placeholder="Ex: João da Silva"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
          className="mt-1.5"
        />
      </div>

      <div>
        <Label htmlFor="seller-email">E-mail</Label>
        <Input
          id="seller-email"
          type="email"
          placeholder="joao@vendaflow.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mt-1.5"
        />
      </div>

      <div>
        <Label htmlFor="seller-phone">Telefone</Label>
        <Input
          id="seller-phone"
          type="tel"
          placeholder="(11) 99999-9999"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          className="mt-1.5"
        />
      </div>

      <div className="flex gap-3 pt-2">
        <Button type="button" variant="outline" className="flex-1" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" className="flex-1">
          {initialValues?.fullName ? 'Salvar alterações' : 'Cadastrar vendedor'}
        </Button>
      </div>
    </form>
  )
}
