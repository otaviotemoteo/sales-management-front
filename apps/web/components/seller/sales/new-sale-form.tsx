'use client'

import { useState, useEffect, useRef } from 'react'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Plus, Trash2, Loader2, ChevronsUpDown, Check } from 'lucide-react'
import { PaymentMethodSelector } from './payment-method-selector'
import { cn } from '@/lib/utils'
import { formatCurrency } from '@/lib/constants'
import * as customersService from '@/services/customers.service'
import * as productsService from '@/services/products.service'
import * as salesService from '@/services/sales.service'
import type { CustomerResponse } from '@/types/customer'
import type { ProductResponse } from '@/types/product'
import type { PaymentMethod, PaymentStatus, CreateSaleRequest } from '@/types/sale'
import { useToast } from '@/hooks/use-toast'

interface CartItem {
  productId: number
  productName: string
  quantity: number
  unitPrice: number
  stock: number
}

interface NewSaleFormProps {
  onSuccess?: () => void
}

export function NewSaleForm({ onSuccess }: NewSaleFormProps) {
  const { toast } = useToast()

  // Customer state
  const [customerOpen, setCustomerOpen] = useState(false)
  const [customerSearch, setCustomerSearch] = useState('')
  const [customerResults, setCustomerResults] = useState<CustomerResponse[]>([])
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerResponse | null>(null)
  const [customerLoading, setCustomerLoading] = useState(false)

  // Product state
  const [productOpen, setProductOpen] = useState(false)
  const [productSearch, setProductSearch] = useState('')
  const [productResults, setProductResults] = useState<ProductResponse[]>([])
  const [productLoading, setProductLoading] = useState(false)

  // Cart state
  const [items, setItems] = useState<CartItem[]>([])

  // Payment state
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('PIX')
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('PENDING')

  // Other
  const [discount, setDiscount] = useState(0)
  const [notes, setNotes] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Debounce refs
  const customerTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const productTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Customer search with debounce
  useEffect(() => {
    if (customerTimer.current) clearTimeout(customerTimer.current)
    if (!customerSearch.trim()) {
      setCustomerResults([])
      return
    }
    customerTimer.current = setTimeout(async () => {
      setCustomerLoading(true)
      try {
        const result = await customersService.searchCustomers(customerSearch, { size: 10 })
        setCustomerResults(result.content)
      } catch {
        setCustomerResults([])
      } finally {
        setCustomerLoading(false)
      }
    }, 300)
    return () => { if (customerTimer.current) clearTimeout(customerTimer.current) }
  }, [customerSearch])

  // Product search with debounce
  useEffect(() => {
    if (productTimer.current) clearTimeout(productTimer.current)
    if (!productSearch.trim()) {
      setProductResults([])
      return
    }
    productTimer.current = setTimeout(async () => {
      setProductLoading(true)
      try {
        const result = await productsService.searchProducts(productSearch, { size: 10 })
        setProductResults(result.content.filter(p => p.active && p.stock > 0))
      } catch {
        setProductResults([])
      } finally {
        setProductLoading(false)
      }
    }, 300)
    return () => { if (productTimer.current) clearTimeout(productTimer.current) }
  }, [productSearch])

  const addProduct = (product: ProductResponse) => {
    setItems(prev => {
      const existing = prev.find(i => i.productId === product.id)
      if (existing) {
        return prev.map(i =>
          i.productId === product.id
            ? { ...i, quantity: Math.min(i.quantity + 1, i.stock) }
            : i
        )
      }
      return [...prev, {
        productId: product.id,
        productName: product.name,
        quantity: 1,
        unitPrice: product.price,
        stock: product.stock,
      }]
    })
    setProductOpen(false)
    setProductSearch('')
  }

  const updateQuantity = (productId: number, quantity: number) => {
    setItems(prev => prev.map(i =>
      i.productId === productId
        ? { ...i, quantity: Math.max(1, Math.min(quantity, i.stock)) }
        : i
    ))
  }

  const removeItem = (productId: number) => {
    setItems(prev => prev.filter(i => i.productId !== productId))
  }

  const subtotal = items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0)
  const total = Math.max(0, subtotal - discount)

  const canSubmit = selectedCustomer && items.length > 0 && !isSubmitting

  const handleSubmit = async () => {
    if (!selectedCustomer || items.length === 0) return

    setIsSubmitting(true)
    try {
      const request: CreateSaleRequest = {
        customerId: selectedCustomer.id,
        items: items.map(i => ({
          productId: i.productId,
          quantity: i.quantity,
          unitPrice: i.unitPrice,
        })),
        paymentMethod,
        paymentStatus,
        discount,
        notes: notes.trim() || undefined,
      }
      await salesService.createSale(request)
      toast({ title: 'Sale recorded.' })
      onSuccess?.()
    } catch (err) {
      toast({
        title: 'Could not record the sale',
        description: err instanceof Error ? err.message : 'Tente novamente',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Customer Selection */}
      <Card className="p-6">
        <Label className="mb-2 block">Customer</Label>
        <Popover open={customerOpen} onOpenChange={setCustomerOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={customerOpen}
              className="w-full justify-between font-normal"
            >
              {selectedCustomer ? selectedCustomer.name : 'Search customers...'}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
            <Command shouldFilter={false}>
              <CommandInput
                placeholder="Type the customer's name..."
                value={customerSearch}
                onValueChange={setCustomerSearch}
              />
              <CommandList>
                {customerLoading && (
                  <div className="flex items-center justify-center py-4">
                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                  </div>
                )}
                {!customerLoading && customerSearch.trim() && customerResults.length === 0 && (
                  <CommandEmpty>No customers found</CommandEmpty>
                )}
                {!customerLoading && customerResults.length > 0 && (
                  <CommandGroup>
                    {customerResults.map(c => (
                      <CommandItem
                        key={c.id}
                        value={String(c.id)}
                        onSelect={() => {
                          setSelectedCustomer(c)
                          setCustomerOpen(false)
                          setCustomerSearch('')
                        }}
                      >
                        <Check className={cn('mr-2 h-4 w-4', selectedCustomer?.id === c.id ? 'opacity-100' : 'opacity-0')} />
                        <div>
                          <p className="text-sm font-medium">{c.name}</p>
                          {c.phone && <p className="text-xs text-muted-foreground">{c.phone}</p>}
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )}
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </Card>

      {/* Product Selection & Cart */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <Label>Sale items</Label>
          <Popover open={productOpen} onOpenChange={setProductOpen}>
            <PopoverTrigger asChild>
              <Button size="sm" variant="outline" className="gap-2">
                <Plus className="w-4 h-4" />
                Adicionar Product
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
              <Command shouldFilter={false}>
                <CommandInput
                  placeholder="Search products..."
                  value={productSearch}
                  onValueChange={setProductSearch}
                />
                <CommandList>
                  {productLoading && (
                    <div className="flex items-center justify-center py-4">
                      <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                    </div>
                  )}
                  {!productLoading && productSearch.trim() && productResults.length === 0 && (
                    <CommandEmpty>No products found</CommandEmpty>
                  )}
                  {!productLoading && productResults.length > 0 && (
                    <CommandGroup>
                      {productResults.map(p => (
                        <CommandItem
                          key={p.id}
                          value={String(p.id)}
                          onSelect={() => addProduct(p)}
                        >
                          <div className="flex-1">
                            <p className="text-sm font-medium">{p.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {formatCurrency(p.price)} &middot; Estoque: {p.stock}
                            </p>
                          </div>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  )}
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        {items.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-6">
            Nenhum produto adicionado ainda
          </p>
        ) : (
          <div className="space-y-2">
            {items.map((item) => (
              <div key={item.productId} className="flex items-center gap-2 p-3 border border-border rounded-lg">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{item.productName}</p>
                  <p className="text-xs text-muted-foreground">{formatCurrency(item.unitPrice)} un.</p>
                </div>
                <Input
                  type="number"
                  min={1}
                  max={item.stock}
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.productId, parseInt(e.target.value) || 1)}
                  className="w-16 text-center"
                />
                <span className="text-sm font-semibold w-24 text-right">
                  {formatCurrency(item.unitPrice * item.quantity)}
                </span>
                <Button variant="ghost" size="icon" onClick={() => removeItem(item.productId)}>
                  <Trash2 className="w-4 h-4 text-destructive" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Payment Method */}
      <PaymentMethodSelector selected={paymentMethod} onChange={(m) => setPaymentMethod(m as PaymentMethod)} />

      {/* Payment Status */}
      <Card className="p-6">
        <Label className="mb-3 block">Payment status</Label>
        <div className="flex gap-3">
          <Button
            variant={paymentStatus === 'PENDING' ? 'default' : 'outline'}
            className="flex-1"
            onClick={() => setPaymentStatus('PENDING')}
          >
            Pendente
          </Button>
          <Button
            variant={paymentStatus === 'PAID' ? 'default' : 'outline'}
            className="flex-1"
            onClick={() => setPaymentStatus('PAID')}
          >
            Pago
          </Button>
        </div>
      </Card>

      {/* Discount & Notes */}
      <Card className="p-6 space-y-4">
        <div>
          <Label htmlFor="discount">Desconto (R$)</Label>
          <Input
            id="discount"
            type="number"
            min={0}
            max={subtotal}
            step={0.01}
            value={discount || ''}
            onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
            placeholder="0.00"
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Notes about this sale..."
            className="mt-1.5"
          />
        </div>
      </Card>

      {/* Totals & Submit */}
      <Card className="p-6">
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal:</span>
            <span className="font-semibold">{formatCurrency(subtotal)}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Desconto:</span>
              <span className="font-semibold text-destructive">-{formatCurrency(discount)}</span>
            </div>
          )}
          <div className="flex justify-between text-lg font-bold pt-2 border-t border-border">
            <span>Total:</span>
            <span>{formatCurrency(total)}</span>
          </div>
        </div>

        <Button
          className="w-full mt-4"
          disabled={!canSubmit}
          onClick={handleSubmit}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Processando...
            </>
          ) : (
            'Complete sale'
          )}
        </Button>
      </Card>
    </div>
  )
}
