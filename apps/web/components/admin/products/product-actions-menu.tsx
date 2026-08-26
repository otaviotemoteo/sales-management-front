'use client'

import { MoreVertical, Pencil, PowerOff, Power } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface ProductActionsMenuProps {
  active: boolean
  onEdit: () => void
  onToggleActive: () => void
}

export function ProductActionsMenu({ active, onEdit, onToggleActive }: ProductActionsMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <MoreVertical className="w-4 h-4" />
          <span className="sr-only">Abrir menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={onEdit} className="gap-2 cursor-pointer">
          <Pencil className="w-4 h-4" />
          Editar
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onToggleActive} className="gap-2 cursor-pointer">
          {active ? (
            <>
              <PowerOff className="w-4 h-4 text-red-500" />
              <span className="text-red-500">Desativar</span>
            </>
          ) : (
            <>
              <Power className="w-4 h-4 text-green-600" />
              <span className="text-green-600">Ativar</span>
            </>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
