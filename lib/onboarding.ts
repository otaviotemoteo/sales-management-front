import * as productsService from '@/services/products.service'
import * as usersService from '@/services/users.service'

export interface OnboardingCounts {
  productCount: number
  sellerCount: number
}

/** Admin onboarding state is derived from data: it's complete once there is
 *  at least one product AND one seller. */
export async function getOnboardingCounts(): Promise<OnboardingCounts> {
  const [products, sellers] = await Promise.all([
    productsService.getProducts({ size: 1 }),
    usersService.getUsersByRole('SELLER', { size: 1 }),
  ])
  return {
    productCount: products.totalElements,
    sellerCount: sellers.totalElements,
  }
}
