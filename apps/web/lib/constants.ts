export const SALE_STATUS_LABELS: Record<string, string> = {
  PENDING: 'Pendente',
  CONFIRMED: 'Concluída',
  CANCELLED: 'Cancelada',
}

export const SALE_STATUS_COLORS: Record<string, string> = {
  PENDING: 'yellow',
  CONFIRMED: 'green',
  CANCELLED: 'red',
}

export const PAYMENT_METHOD_LABELS: Record<string, string> = {
  CASH: 'Dinheiro',
  PIX: 'PIX',
  DEBIT_CARD: 'Cartão de Débito',
  CREDIT_CARD: 'Cartão de Crédito',
}

export const PAYMENT_STATUS_LABELS: Record<string, string> = {
  PAID: 'Pago',
  PENDING: 'Pendente',
}

export function formatSaleId(id: number): string {
  return `VDA-${String(id).padStart(3, '0')}`
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

export function formatDate(isoString: string): string {
  return new Intl.DateTimeFormat('pt-BR').format(new Date(isoString))
}

export function formatDateTime(isoString: string): string {
  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(new Date(isoString))
}
