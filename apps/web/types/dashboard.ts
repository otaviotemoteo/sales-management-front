export interface TopProductDTO {
  productId: number
  productName: string
  quantity: number
  revenue: number
}

export interface SalesTrendDTO {
  date: string
  amount: number
  count: number
}

export interface DashboardResponse {
  totalSalesAmount: number
  salesCount: number
  pendingPaymentsAmount: number
  pendingPaymentsCount: number
  topProducts: TopProductDTO[]
  salesByPaymentMethod: Record<string, number>
  salesTrend: SalesTrendDTO[]
}

export interface SellerStatsResponse {
  totalSales: number
  totalRevenue: number
  totalCustomers: number
  averageTicket: number
}
