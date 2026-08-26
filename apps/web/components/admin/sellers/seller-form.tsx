'use client'

import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface SellerFormValues {
  fullName: string
  email: string
}

interface SellerFormProps {
  initialValues?: Partial<SellerFormValues>
  onSubmit: (values: SellerFormValues) => void | Promise<void>
  onCancel: () => void
}

export function SellerForm({ initialValues, onSubmit, onCancel }: SellerFormProps) {
  const [fullName, setFullName] = useState(initialValues?.fullName ?? '')
  const [email, setEmail] = useState(initialValues?.email ?? '')
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await onSubmit({ fullName, email })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="seller-name">Nome completo</Label>
        <Input
          id="seller-name"
          placeholder="e.g. John Smith"
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
          placeholder="john@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mt-1.5"
        />
      </div>

      <div className="flex gap-3 pt-2">
        <Button type="button" variant="outline" className="flex-1" onClick={onCancel} disabled={isSubmitting}>
          Cancelar
        </Button>
        <Button type="submit" className="flex-1" disabled={isSubmitting}>
          {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
          {initialValues?.fullName ? 'Save changes' : 'Add seller'}
        </Button>
      </div>
    </form>
  )
}
