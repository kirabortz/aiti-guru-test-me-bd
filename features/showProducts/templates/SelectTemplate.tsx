'use client'

import { useAppSelector, useAppDispatch } from '@/lib/store/hooks'
import { toggleSelectAll, toggleRowSelection } from '@/lib/store/slices/productsSlice'
import { useGetProductsQuery } from '@/lib/store/api/productsApi'
import type { Product } from '@/entities/product/product.types'

type SelectTemplateProps = {
  item?: Product
  isSelectAll?: boolean
}

const SelectTemplate: React.FC<SelectTemplateProps> = ({ item, isSelectAll = false }) => {
  const dispatch = useAppDispatch()
  const { page, limit, searchQuery, sortBy, order, selectedRows, isAllSelected } = useAppSelector(
    state => state.products
  )
  
  const { data } = useGetProductsQuery({
    skip: (page - 1) * limit,
    limit,
    q: searchQuery,
    sortBy,
    order,
  })

  const isChecked = item ? selectedRows.includes(item.id) : isAllSelected

  const handleClick = () => {
    if (item && !isSelectAll) {
      const productIds = data?.products.map((p) => p.id) || []
      dispatch(toggleRowSelection({ id: item.id, productIds }))
    } else {
      const productIds = data?.products.map((p) => p.id) || []
      dispatch(toggleSelectAll(productIds))
    }
  }
  
  return (
    <div 
      className={`w-[22px] h-[22px] border-2 border-gray-300 rounded cursor-pointer
        ${isChecked ? ' bg-[var(--primary-blue-color)]' : 'bg-white'}
      `}
      onClick={handleClick}
    >
      <input
        type="checkbox"
        className="w-[22px] h-[22px] hidden"
        defaultChecked={isChecked}
      />
    </div>
  )
}

export default SelectTemplate
