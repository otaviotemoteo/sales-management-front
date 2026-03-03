'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { MoreVertical, Eye, Pencil } from 'lucide-react'
import { SaleStatusSelect } from './sale-status-select'

type Status = 'completed' | 'pending' | 'cancelled'

const paymentLabel: Record<string, string> = {
  pix: 'PIX',
  credit: 'Crédito',
  debit: 'Débito',
  cash: 'Dinheiro',
}

export interface SaleRow {
  id: string
  customer: string
  seller: string
  sellerId: string
  date: string
  amount: number
  status: Status
  paymentMethod: string
  items: number
  subtotal: number
  tax: number
  total: number
  products: Array<{ name: string; quantity: number; unitPrice: number; total: number }>
}

interface VendasTableProps {
  sales: SaleRow[]
  onStatusChange: (id: string, status: Status) => void
  onEdit: (sale: SaleRow) => void
  onViewDetail: (sale: SaleRow) => void
}

export function VendasTable({ sales, onStatusChange, onEdit, onViewDetail }: VendasTableProps) {
  if (sales.length === 0) {
    return (
      <Card className="p-12 text-center">
        <p className="text-muted-foreground">Nenhuma venda encontrada para os filtros selecionados</p>
      </Card>
    )
  }

  return (
    <Card className="p-0 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="pl-4">ID</TableHead>
            <TableHead>Cliente</TableHead>
            <TableHead>Vendedor</TableHead>
            <TableHead>Data</TableHead>
            <TableHead>Pagamento</TableHead>
            <TableHead className="text-right">Valor</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="pr-4 w-12" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {sales.map((sale) => (
            <TableRow key={sale.id}>
              <TableCell className="pl-4 font-mono text-xs text-muted-foreground">{sale.id}</TableCell>
              <TableCell className="font-medium text-foreground">{sale.customer}</TableCell>
              <TableCell className="text-muted-foreground">{sale.seller}</TableCell>
              <TableCell className="text-muted-foreground">{sale.date}</TableCell>
              <TableCell className="text-muted-foreground">{paymentLabel[sale.paymentMethod] ?? sale.paymentMethod}</TableCell>
              <TableCell className="text-right font-semibold text-foreground">
                R$ {sale.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </TableCell>
              <TableCell>
                <SaleStatusSelect id={sale.id} status={sale.status} onStatusChange={onStatusChange} />
              </TableCell>
              <TableCell className="pr-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreVertical className="w-4 h-4" />
                      <span className="sr-only">Ações</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onViewDetail(sale)} className="gap-2 cursor-pointer">
                      <Eye className="w-4 h-4" />
                      Ver Detalhes
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onEdit(sale)} className="gap-2 cursor-pointer">
                      <Pencil className="w-4 h-4" />
                      Editar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  )
}
