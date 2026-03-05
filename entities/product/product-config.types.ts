import type { Product } from '@/entities/product/product.types'

import { ACTIONS_COL, CHECKBOX_COL } from '@/entities/product/products.constants'

export type ProductColumn = {
  name: string
  prop: keyof Product
  id: string
  width?: number
}

export type BasicColumn = {
  name?: string
  prop: typeof CHECKBOX_COL |  typeof ACTIONS_COL
  id: string
  width?: number
}

export type TableColumn = ProductColumn | BasicColumn
