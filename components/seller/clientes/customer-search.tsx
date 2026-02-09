'use client'

import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

interface CustomerSearchProps {
  onSearch?: (query: string) => void
  placeholder?: string
}

export function CustomerSearch({
  onSearch,
  placeholder = 'Buscar clientes...',
}: CustomerSearchProps) {
  return (
    <div className="relative">
      <Search className="absolute left-2.5 top-2.5 w-4 h-4 text-muted-foreground" />
      <Input
        placeholder={placeholder}
        className="pl-8"
        onChange={(e) => onSearch?.(e.target.value)}
      />
    </div>
  )
}
