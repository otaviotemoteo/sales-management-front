'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

type Status = 'completed' | 'pending' | 'cancelled'

const statusLabel: Record<Status, string> = {
  completed: 'Completed',
  pending: 'Pendente',
  cancelled: 'Cancelada',
}

const statusClasses: Record<Status, string> = {
  completed: 'text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full',
  pending: 'text-yellow-700 bg-yellow-100 px-2 py-0.5 rounded-full',
  cancelled: 'text-red-700 bg-red-100 px-2 py-0.5 rounded-full',
}

interface SaleStatusSelectProps {
  id: string
  status: Status
  onStatusChange: (id: string, status: Status) => void
}

export function SaleStatusSelect({ id, status, onStatusChange }: SaleStatusSelectProps) {
  return (
    <Select
      value={status}
      onValueChange={(v) => onStatusChange(id, v as Status)}
    >
      <SelectTrigger className="h-auto w-auto border-0 bg-transparent p-0 shadow-none focus:ring-0 [&>svg]:hidden">
        <SelectValue>
          <span className={`text-xs font-medium ${statusClasses[status]}`}>
            {statusLabel[status]}
          </span>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="completed">
          <span className="text-emerald-700">Completed</span>
        </SelectItem>
        <SelectItem value="pending">
          <span className="text-yellow-700">Pendente</span>
        </SelectItem>
        <SelectItem value="cancelled">
          <span className="text-red-700">Cancelada</span>
        </SelectItem>
      </SelectContent>
    </Select>
  )
}
