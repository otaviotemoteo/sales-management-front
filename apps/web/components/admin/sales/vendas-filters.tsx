'use client'

import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface SalesFiltersProps {
  search: string
  onSearch: (value: string) => void
  seller: string
  onSellerChange: (value: string) => void
  status: string
  onStatusChange: (value: string) => void
  sellerOptions: Array<{ id: string; name: string }>
  resultCount: number
}

const statuses = [
  { value: 'all', label: 'All statuses' },
  { value: 'completed', label: 'Completed' },
  { value: 'pending', label: 'Pendente' },
  { value: 'cancelled', label: 'Cancelada' },
]

export function SalesFilters({
  search,
  onSearch,
  seller,
  onSellerChange,
  status,
  onStatusChange,
  sellerOptions,
  resultCount,
}: SalesFiltersProps) {
  return (
    <div className="space-y-2">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by customer or id..."
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        <Select value={seller} onValueChange={onSellerChange}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Seller" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All sellers</SelectItem>
            {sellerOptions.map((s) => (
              <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={status} onValueChange={onStatusChange}>
          <SelectTrigger className="w-full sm:w-44">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            {statuses.map((s) => (
              <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <p className="text-xs text-muted-foreground px-0.5">
        {resultCount} {resultCount === 1 ? 'sale found' : 'sales found'}
      </p>
    </div>
  )
}
