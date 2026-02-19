'use client'

import { useState, useMemo } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { CustomerSearch } from '@/components/seller/clientes/customer-search'
import { CustomerCard } from '@/components/seller/clientes/customer-card'
import { CustomerForm } from '@/components/seller/clientes/customer-form'
import { CustomerDetailsModal } from '@/components/seller/clientes/customer-details-modal'
import { CustomerSalesHistory } from '@/components/seller/clientes/customer-sales-history'
import customersData from '@/data/mockup/customers.json'
import salesData from '@/data/mockup/sales.json'

type Customer = (typeof customersData)[0]

export default function ClientesPage() {
  const [search, setSearch] = useState('')
  const [newClientOpen, setNewClientOpen] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
  const [customerDetailsOpen, setCustomerDetailsOpen] = useState(false)

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return customersData.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.city.toLowerCase().includes(q)
    )
  }, [search])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Meus Clientes</h1>
          <p className="text-muted-foreground mt-1">{customersData.length} clientes cadastrados</p>
        </div>
        <Dialog open={newClientOpen} onOpenChange={setNewClientOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Novo Cliente
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Cadastrar Novo Cliente</DialogTitle>
            </DialogHeader>
            <div className="pt-2">
              <CustomerForm onSubmit={() => setNewClientOpen(false)} />
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <CustomerSearch onSearch={setSearch} />

      {filtered.length === 0 ? (
        <Card className="p-12 text-center">
          <p className="text-muted-foreground">Nenhum cliente encontrado</p>
        </Card>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((customer) => (
            <CustomerCard
              key={customer.id}
              id={customer.id}
              name={customer.name}
              email={customer.email}
              phone={customer.phone}
              city={customer.city}
              totalSpent={customer.totalSpent}
              lastPurchase={customer.lastPurchase}
              onView={() => { setSelectedCustomer(customer); setCustomerDetailsOpen(true) }}
            />
          ))}
        </div>
      )}

      <Dialog open={customerDetailsOpen} onOpenChange={setCustomerDetailsOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedCustomer?.name}</DialogTitle>
          </DialogHeader>
          {selectedCustomer && (
            <div className="space-y-4 pt-2">
              <CustomerDetailsModal
                customer={{ ...selectedCustomer, notes: selectedCustomer.notes ?? undefined }}
              />
              <CustomerSalesHistory
                sales={salesData
                  .filter((s) => s.customerId === selectedCustomer.id)
                  .map((s) => ({
                    id: s.id,
                    date: s.date,
                    amount: s.amount,
                    status: s.status as 'pending' | 'completed' | 'cancelled',
                  }))}
                customerId={selectedCustomer.id}
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
