import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type SortOrder = 'asc' | 'desc'

type ProductsState = {
  page: number
  limit: number
  searchQuery: string
  sortBy: string
  order: SortOrder
  selectedRows: number[]
  isAllSelected: boolean
}

const loadSortState = () => {
  if (typeof window === 'undefined') return { sortBy: '', order: 'asc' as SortOrder }
  
  const saved = localStorage.getItem('sortState')
  if (saved) {
    const { sortBy, order } = JSON.parse(saved)
    return { sortBy: sortBy || '', order: order || 'asc' }
  }
  return { sortBy: '', order: 'asc' as SortOrder }
}

const initialState: ProductsState = {
  page: 1,
  limit: 5,
  searchQuery: '',
  ...loadSortState(),
  selectedRows: [],
  isAllSelected: false,
}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
      state.page = 1
    },
    setSortBy: (state, action: PayloadAction<string>) => {
      if (state.sortBy === action.payload) {
        state.order = state.order === 'asc' ? 'desc' : 'asc'
      } else {
        state.sortBy = action.payload
        state.order = 'asc'
      }
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('sortState', JSON.stringify({ sortBy: state.sortBy, order: state.order }))
      }
    },
    toggleSelectAll: (state, action: PayloadAction<number[]>) => {
      const productIds = action.payload
      if (!state.isAllSelected) {
        const combined = [...state.selectedRows, ...productIds]
        state.selectedRows = Array.from(new Set(combined))
        state.isAllSelected = true
      } else {
        state.selectedRows = state.selectedRows.filter(id => !productIds.includes(id))
        state.isAllSelected = false
      }
    },
    toggleRowSelection: (state, action: PayloadAction<{ id: number; productIds: number[] }>) => {
      const { id, productIds } = action.payload
      if (state.selectedRows.includes(id)) {
        state.selectedRows = state.selectedRows.filter(rowId => rowId !== id)
      } else {
        state.selectedRows.push(id)
      }
      
      const allSelected = productIds.every(pid => state.selectedRows.includes(pid))
      state.isAllSelected = allSelected && productIds.length > 0
    },
    updateSelectAllState: (state, action: PayloadAction<number[]>) => {
      const productIds = action.payload
      state.isAllSelected = productIds.length > 0 && productIds.every(id => state.selectedRows.includes(id))
    },
  },
})

export const { setPage, setSearchQuery, setSortBy, toggleSelectAll, toggleRowSelection, updateSelectAllState } = productsSlice.actions
export default productsSlice.reducer
