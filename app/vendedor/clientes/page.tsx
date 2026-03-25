'use client'

import { useState } from 'react'
import { Plus, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { CustomerSearch } from '@/components/seller/clientes/customer-search'
import { CustomerCard } from '@/components/seller/clientes/customer-card'
import { CustomerForm } from '@/components/seller/clientes/customer-form'
import { CustomerDetailsModal } from '@/components/seller/clientes/customer-details-modal'
import { CustomerSalesHistory } from '@/components/seller/clientes/customer-sales-history'
import { useCustomers } from '@/hooks/use-customers'
import type { CustomerResponse } from '@/types/customer'

export default function ClientesPage() {
  const { customers, isLoading, error, refresh, searchCustomers } = useCustomers({ size: 100 })
  const [newClientOpen, setNewClientOpen] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerResponse | null>(null)
  const [customerDetailsOpen, setCustomerDetailsOpen] = useState(false)

  const handleSearch = (query: string) => {
    if (query.trim()) {
      searchCustomers(query)
    } else {
      refresh()
    }
  }

  if (isLoading && customers.length === 0) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Meus Clientes</h1>
          <p className="text-muted-foreground mt-1">{customers.length} clientes cadastrados</p>
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
              <CustomerForm onSubmit={() => { setNewClientOpen(false); refresh() }} />
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <CustomerSearch onSearch={handleSearch} />

      {error && (
        <Card className="p-6 text-center">
          <p className="text-destructive">{error}</p>
          <Button variant="outline" size="sm" className="mt-2" onClick={refresh}>Tentar novamente</Button>
        </Card>
      )}

      {!error && customers.length === 0 ? (
        <Card className="p-12 text-center">
          <p className="text-muted-foreground">Nenhum cliente encontrado</p>
        </Card>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {customers.map((customer) => (
            <CustomerCard
              key={customer.id}
              customer={customer}
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
              <CustomerDetailsModal customer={selectedCustomer} />
              <CustomerSalesHistory
                sales={[]}
                customerId={selectedCustomer.id}
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
