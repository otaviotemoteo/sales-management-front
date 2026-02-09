'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MoreVertical, Eye, Edit, Trash2, Download } from 'lucide-react'

interface SaleActionsMenuProps {
  saleId: string
  onView?: () => void
  onEdit?: () => void
  onDownload?: () => void
  onDelete?: () => void
}

export function SaleActionsMenu({
  saleId,
  onView,
  onEdit,
  onDownload,
  onDelete,
}: SaleActionsMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <MoreVertical className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={onView} className="gap-2">
          <Eye className="w-4 h-4" />
          Ver Detalhes
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onEdit} className="gap-2">
          <Edit className="w-4 h-4" />
          Editar
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onDownload} className="gap-2">
          <Download className="w-4 h-4" />
          Baixar Recibo
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onDelete} className="gap-2 text-destructive">
          <Trash2 className="w-4 h-4" />
          Deletar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
