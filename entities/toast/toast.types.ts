export type ToastType = 'success' | 'error'

export type Toast = {
  id: string
  type: ToastType
  message: string
  autoClose: boolean
  duration?: number
  createdAt: number
}

export type ToastStoreInterface = {
  toasts: Toast[]
  addToast: (toast: Omit<Toast, 'id' | 'createdAt'>) => void
  removeToast: (id: string) => void
  clearToasts: () => void
}
