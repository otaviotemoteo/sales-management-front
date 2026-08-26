import type { DashboardResponse } from '@/types/dashboard'
import { ApiError, AuthError } from '@/types/api'

export async function getDashboard(
  startDate: string,
  endDate: string,
  sellerId?: number
): Promise<DashboardResponse> {
  const params = new URLSearchParams({ startDate, endDate })
  if (sellerId != null) params.set('sellerId', String(sellerId))

  const res = await fetch(`/api/reports/dashboard?${params}`)

  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    if (res.status === 401) throw new AuthError()
    throw new ApiError(body.message || 'Could not load the dashboard', res.status)
  }

  return res.json()
}
