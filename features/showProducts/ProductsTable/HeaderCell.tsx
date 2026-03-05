'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons'

import SelectTemplate from '../templates/SelectTemplate'

import { useAppSelector, useAppDispatch } from '@/lib/store/hooks'
import { setSortBy } from '@/lib/store/slices/productsSlice'
import { ACTIONS_COL, CHECKBOX_COL } from '@/entities/product/products.constants'
import type { TableColumn } from '@/entities/product/product-config.types'
import type { Product } from '@/entities/product/product.types'

type HeaderCellProps = {
  col: TableColumn
  className?: string
}

const HeaderCell: React.FC<HeaderCellProps> = ({ col, className = "py-3 px-[9px] text-gray8 font-bold first:pl-[14px] last:pl-[18px]"}) => {
  const dispatch = useAppDispatch()
  const { sortBy, order } = useAppSelector(state => state.products)
  const { prop, name, width } = col

  if (prop !== CHECKBOX_COL && prop !== ACTIONS_COL) {
    const isSorted = sortBy === prop
    const isAsc = order === 'asc'
    const handleSortClick = () => {
      dispatch(setSortBy(prop))
    }

    return (
      <th
        className={`${className} cursor-pointer`}
        onClick={handleSortClick}
        style={{ width: width ?? `${width}px` }}
      >
        {name as keyof Product}
        {isSorted && (
          <FontAwesomeIcon
            icon={isAsc ? faCaretUp : faCaretDown}
            className="text-gray-700 ml-1"
          />
        )}
      </th>
    )
  }

  if (prop === CHECKBOX_COL) {
    return (
      <th
        className={`${className}`}
        style={{ width: width ?? `${width}px` }}
      >
        <SelectTemplate isSelectAll />
      </th>
    )
  }

  return (
    <th
      className={`${className}`}
      style={{ width: width ?? `${width}px` }}
    >
      {name}
    </th>
  )
}

export default HeaderCell
