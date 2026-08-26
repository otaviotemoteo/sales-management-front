'use client'

import type { CustomerResponse } from '@/types/customer'
import { formatDate } from '@/lib/constants'

interface CustomerDetailsModalProps {
  customer: CustomerResponse
}

export function CustomerDetailsModal({ customer }: CustomerDetailsModalProps) {
  return (
    <div className="space-y-4">
      {customer.email && (
        <div>
          <p className="text-sm text-muted-foreground">Email</p>
          <p className="font-medium text-foreground">{customer.email}</p>
        </div>
      )}
      {customer.phone && (
        <div>
          <p className="text-sm text-muted-foreground">Telefone</p>
          <p className="font-medium text-foreground">{customer.phone}</p>
        </div>
      )}
      {customer.address && (
        <div>
          <p className="text-sm text-muted-foreground">Address</p>
          <p className="font-medium text-foreground">{customer.address}</p>
        </div>
      )}
      <div>
        <p className="text-sm text-muted-foreground">Cadastrado por</p>
        <p className="font-medium text-foreground">{customer.createdByUsername}</p>
      </div>
      <div>
        <p className="text-sm text-muted-foreground">Cadastrado em</p>
        <p className="font-medium text-foreground">{formatDate(customer.createdAt)}</p>
      </div>
    </div>
  )
}
