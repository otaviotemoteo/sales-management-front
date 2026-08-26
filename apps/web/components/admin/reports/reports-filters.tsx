'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const periods = [
  { value: 'all', label: 'All time' },
  { value: 'today', label: 'Hoje' },
  { value: 'week', label: 'Esta semana' },
  { value: 'month', label: 'This month' },
]

const statuses = [
  { value: 'all', label: 'All statuses' },
  { value: 'CONFIRMED', label: 'Completed' },
  { value: 'PENDING', label: 'Pendente' },
  { value: 'CANCELLED', label: 'Cancelada' },
]

interface ReportsFiltersProps {
  period: string
  onPeriodChange: (value: string) => void
  seller: string
  onSellerChange: (value: string) => void
  status: string
  onStatusChange: (value: string) => void
  sellerOptions: Array<{ id: string; name: string }>
}

export function ReportsFilters({
  period,
  onPeriodChange,
  seller,
  onSellerChange,
  status,
  onStatusChange,
  sellerOptions,
}: ReportsFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <Select value={period} onValueChange={onPeriodChange}>
        <SelectTrigger className="w-full sm:w-48">
          <SelectValue placeholder="Period" />
        </SelectTrigger>
        <SelectContent>
          {periods.map((p) => (
            <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>

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
        <SelectTrigger className="w-full sm:w-48">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          {statuses.map((s) => (
            <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
