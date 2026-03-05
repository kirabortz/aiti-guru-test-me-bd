'use client'

import { useAppSelector, useAppDispatch } from '@/lib/store/hooks'
import { removeToast } from '@/lib/store/slices/toastsSlice'
import Toast from './Toast'

const ToastContainer: React.FC = () => {
  const toasts = useAppSelector(state => state.toasts.toasts)
  const dispatch = useAppDispatch()

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-3">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onClose={() => dispatch(removeToast(toast.id))} />
      ))}
    </div>
  )
}

export default ToastContainer
