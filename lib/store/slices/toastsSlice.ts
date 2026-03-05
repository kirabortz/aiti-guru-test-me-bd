import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { Toast } from '@/entities/toast/toast.types'

type ToastsState = {
  toasts: Toast[]
}

const initialState: ToastsState = {
  toasts: [],
}

const toastsSlice = createSlice({
  name: 'toasts',
  initialState,
  reducers: {
    addToast: (state, action: PayloadAction<Omit<Toast, 'id' | 'createdAt'>>) => {
      const newToast: Toast = {
        id: Math.random().toString(36).substr(2, 9),
        createdAt: Date.now(),
        ...action.payload,
      }
      state.toasts.push(newToast)
    },
    removeToast: (state, action: PayloadAction<string>) => {
      state.toasts = state.toasts.filter(toast => toast.id !== action.payload)
    },
    clearToasts: (state) => {
      state.toasts = []
    },
  },
})

export const { addToast, removeToast, clearToasts } = toastsSlice.actions
export default toastsSlice.reducer
