'use client'

import { useState } from 'react'
import { Plus, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { CustomerSearch } from '@/components/seller/customers/customer-search'
import { CustomerCard } from '@/components/seller/customers/customer-card'
import { CustomerForm } from '@/components/seller/customers/customer-form'
import { CustomerDetailsModal } from '@/components/seller/customers/customer-details-modal'
import { CustomerSalesHistory } from '@/components/seller/customers/customer-sales-history'
import { useCustomers } from '@/hooks/use-customers'
import type { CustomerResponse } from '@/types/customer'

export default function CustomersPage() {
  const { customers, isLoading, error, refresh, searchCustomers, createCustomer } = useCustomers({ size: 100 })
  const [isCreating, setIsCreating] = useState(false)
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
          <h1 className="text-2xl font-bold text-foreground">My customers</h1>
          <p className="text-muted-foreground mt-1">{customers.length} clientes cadastrados</p>
        </div>
        <Dialog open={newClientOpen} onOpenChange={setNewClientOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Novo Customer
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>New customer</DialogTitle>
            </DialogHeader>
            <div className="pt-2">
              <CustomerForm
                isLoading={isCreating}
                onSubmit={async (data) => {
                  setIsCreating(true)
                  try {
                    await createCustomer(data)
                    setNewClientOpen(false)
                  } catch {
                    // Error is handled by the hook
                  } finally {
                    setIsCreating(false)
                  }
                }}
              />
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
          <p className="text-muted-foreground">No customers found</p>
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
              <CustomerSalesHistory customerId={selectedCustomer.id} />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
