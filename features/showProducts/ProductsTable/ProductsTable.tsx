'use client'

import { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

import { productsConfig } from '../products.config'
import HeaderCell from './HeaderCell'
import Cell from './Cell'
import { Pagination } from './Pagination'

import { useAppSelector, useAppDispatch } from '@/lib/store/hooks'
import { useGetProductsQuery } from '@/lib/store/api/productsApi'
import { updateSelectAllState } from '@/lib/store/slices/productsSlice'
import type { TableColumn } from '@/entities/product/product-config.types'
import type { Product } from '@/entities/product/product.types'
import { getEmptyProducts } from '@/entities/product/products.utils'

export const ProductsTable: React.FC = () => {
  const dispatch = useAppDispatch()
  const { page, limit, searchQuery, sortBy, order, selectedRows } = useAppSelector(state => state.products)
  
  const { data, isLoading, error } = useGetProductsQuery({
    skip: (page - 1) * limit,
    limit,
    q: searchQuery,
    sortBy,
    order,
  })

  const products: Product[] = isLoading ? getEmptyProducts(limit) : (data?.products || [])
  const total = data?.total || 0

  useEffect(() => {
    if (products.length > 0) {
      dispatch(updateSelectAllState(products.map(p => p.id)))
    }
  }, [products, dispatch])

  return (
    <>
      <div className="relative">
        <table className="min-w-full">
          <thead>
            <tr className="border-b-2 border-t-transparent border-r-transparent border-b-gray border-l-4 border-l-transparent">
              {productsConfig.map((col: TableColumn) => (
                <HeaderCell
                  key={`${col.id}`}
                  col={col}
                />
              ))}
            </tr>
          </thead>
          <tbody>
            {products?.map((product: Product, rowIndex) => (
              <tr
                key={product.id ?? `${rowIndex}-empty`}
                className={`border-b-2 border-t-transparent border-r-transparent border-b-gray border-l-4 
                  ${selectedRows.includes(product.id) ? 'border-l-[var(--primary-blue-color)]' : 'border-l-transparent'}
                `}
              >
                {productsConfig.map(({ prop, id }: TableColumn) => (
                  <Cell
                    key={`${product.id || rowIndex}-${id}`}
                    item={product}
                    prop={prop}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {isLoading && (
          <div className="absolute inset-0 bg-gray-300/30 flex items-center justify-center">
            <div className="flex items-center justify-center space-x-2 text-gray-500 text-xl">
              <FontAwesomeIcon icon={faSpinner} spin />
              <span className="text-lg font-medium">Загрузка результатов...</span>
            </div>
          </div>
        )}
        
        {error && (
          <div className="absolute inset-0 bg-red-300/30 bg-opacommand-80 flex items-center justify-center">
            <div className="text-white text-center">
              <h3 className="text-xl font-semibold mb-2">Ошибка загрузки</h3>
              <p className="text-white">{error.toString()}</p>
            </div>
          </div>
        )}
      </div>
      <Pagination total={total} />
    </>
  )
}
