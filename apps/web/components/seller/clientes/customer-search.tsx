'use client'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Search, Filter } from 'lucide-react'

interface CustomerSearchProps {
  onSearch?: (query: string) => void
  onFilterChange?: (filters: unknown) => void
  placeholder?: string
}

export function CustomerSearch({
  onSearch,
  onFilterChange,
  placeholder = 'Buscar por cliente...',
}: CustomerSearchProps) {
  return (
    <Card className="p-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-2.5 top-2.5 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder={placeholder}
            className="pl-8"
            onChange={(e) => onSearch?.(e.target.value)}
          />
        </div>
        <Button variant="outline" className="gap-2" onClick={() => onFilterChange?.({})}>
          <Filter className="w-4 h-4" />
          Filtros
        </Button>
      </div>
    </Card>
  )
}
