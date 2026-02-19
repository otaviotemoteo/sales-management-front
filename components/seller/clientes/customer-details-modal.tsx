'use client'

interface CustomerDetailsModalProps {
  customer: {
    id: string
    name: string
    email: string
    phone: string
    city: string
    state: string
    zip: string
    notes?: string
    createdAt: string
  }
}

export function CustomerDetailsModal({ customer }: CustomerDetailsModalProps) {
  return (
    <div className="space-y-4">
      <div>
        <p className="text-sm text-muted-foreground">Email</p>
        <p className="font-medium text-foreground">{customer.email}</p>
      </div>
      <div>
        <p className="text-sm text-muted-foreground">Telefone</p>
        <p className="font-medium text-foreground">{customer.phone}</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-muted-foreground">Cidade</p>
          <p className="font-medium text-foreground">{customer.city}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Estado</p>
          <p className="font-medium text-foreground">{customer.state}</p>
        </div>
      </div>
      <div>
        <p className="text-sm text-muted-foreground">CEP</p>
        <p className="font-medium text-foreground">{customer.zip}</p>
      </div>
      {customer.notes && (
        <div>
          <p className="text-sm text-muted-foreground">Observações</p>
          <p className="font-medium text-foreground">{customer.notes}</p>
        </div>
      )}
      <div>
        <p className="text-sm text-muted-foreground">Cadastrado em</p>
        <p className="font-medium text-foreground">{customer.createdAt}</p>
      </div>
    </div>
  )
}
