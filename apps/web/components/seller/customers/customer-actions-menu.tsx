'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MoreVertical, Edit, Trash2 } from 'lucide-react'

interface CustomerActionsMenuProps {
  customerId: string
  onEdit?: () => void
  onDelete?: () => void
}

export function CustomerActionsMenu({
  customerId,
  onEdit,
  onDelete,
}: CustomerActionsMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <MoreVertical className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={onEdit} className="gap-2">
          <Edit className="w-4 h-4" />
          Editar
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onDelete} className="gap-2 text-destructive">
          <Trash2 className="w-4 h-4 text-red-500" />
          Deletar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
