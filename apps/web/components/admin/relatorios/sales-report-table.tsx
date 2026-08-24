'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  SALE_STATUS_LABELS,
  PAYMENT_METHOD_LABELS,
  formatCurrency,
} from '@/lib/constants'
import type { SaleStatus, PaymentMethod } from '@/types/sale'

const statusVariant: Record<SaleStatus, 'default' | 'secondary' | 'destructive'> = {
  CONFIRMED: 'default',
  PENDING: 'secondary',
  CANCELLED: 'destructive',
}

interface SaleRow {
  id: string
  customer: string
  seller: string
  date: string
  amount: number
  paymentMethod: PaymentMethod
  status: SaleStatus
}

interface SalesReportTableProps {
  sales: SaleRow[]
}

export function SalesReportTable({ sales }: SalesReportTableProps) {
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
            <TableHead className="text-center w-36">Valor</TableHead>
            <TableHead className="w-40 px-6">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sales.map((sale) => (
            <TableRow key={sale.id}>
              <TableCell className="pl-4 font-mono text-xs text-muted-foreground">{sale.id}</TableCell>
              <TableCell className="font-medium text-foreground">{sale.customer}</TableCell>
              <TableCell className="text-muted-foreground">{sale.seller}</TableCell>
              <TableCell className="text-muted-foreground">{sale.date}</TableCell>
              <TableCell className="text-muted-foreground">
                {PAYMENT_METHOD_LABELS[sale.paymentMethod] ?? sale.paymentMethod}
              </TableCell>
              <TableCell className="text-center font-semibold text-foreground whitespace-nowrap">
                {formatCurrency(sale.amount)}
              </TableCell>
              <TableCell className="px-6">
                <Badge variant={statusVariant[sale.status] ?? 'secondary'}>
                  {SALE_STATUS_LABELS[sale.status] ?? sale.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  )
}
