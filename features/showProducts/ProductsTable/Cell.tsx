'use client'

import ProductTemplate from '../templates/ProductTemplate'
import RatingTemplate from '../templates/RatingTemplate'
import SelectTemplate from '../templates/SelectTemplate'

import type { Product } from '@/entities/product/product.types'
import { BRAND_COL, CHECKBOX_COL, PRICE_COL, RATING_COL, SKU_COL, TITLE_COL } from '@/entities/product/products.constants'
import PriceTemplate from '../templates/PriceTemplate'

type CellProps = {
  item: Product
  prop: string
  className?: string
}

const Cell: React.FC<CellProps> = ({ item, prop, className = "py-3 px-[9px] first:pl-[14px] last:pl-[18px] align-middle" }) => {
  if (prop === TITLE_COL) {
    return (
      <td className={className}>
        <ProductTemplate item={item} />
      </td>
    )
  }
  if (prop === RATING_COL) {
    return (
      <td className={className}>
        <RatingTemplate item={item} />
      </td>
    
    )
  }

  if (prop === CHECKBOX_COL) {
    return (
      <td className={className}>
        <SelectTemplate item={item} />
      </td>
    )
  }

  if (prop === PRICE_COL) {
    return (
      <td className={className}>
        <PriceTemplate item={item} />
      </td>
    )
  }

  const boldClass = [BRAND_COL].includes(prop) ? 'font-bold' : ''
  const fontClass = [BRAND_COL, SKU_COL].includes(prop) ? 'font-second' : ''
  return (
    <td className={`${className} ${boldClass} ${fontClass}`}>
      {item[prop as keyof Product]}
    </td>
  )
}

export default Cell;