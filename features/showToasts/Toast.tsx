'use client'

import type { Toast } from '@/entities/toast/toast.types'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type ToastProps = {
  toast: Toast
  onClose: () => void
}

const Toast: React.FC<ToastProps> = ({ toast, onClose }) => {
  const { type, message } = toast

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 w-80 max-w-xs text-white rounded-lg shadow-lg p-4 transition-all duration-300`
        + ` ${type === 'success' ? 'bg-green-500' : ''}`
        + ` ${type === 'error' ? 'bg-red-500' : ''}`
      }
    >
      <div className="flex items-center justify-between text-sm font-medium">
        <div>
            {message}
        </div>
        <button
            onClick={onClose}
            className="px-3 py-1 text-white cursor-pointer"
          >
            <FontAwesomeIcon icon={faClose} />
          </button>
      </div>
    </div>
  )
}

export default Toast
