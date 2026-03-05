import type { Product } from '@/entities/product/product.types';

export function getEmptyProducts(limit: number): Product[]  {
  return Array(limit).fill({})
}
