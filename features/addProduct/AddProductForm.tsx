'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faXmark } from '@fortawesome/free-solid-svg-icons'

import type { Product } from '@/entities/product/product.types'
import { useAppDispatch } from '@/lib/store/hooks'
import { addToast } from '@/lib/store/slices/toastsSlice'
import { ToastType } from '@/entities/toast/toast.types'

type AddProductFormProps = {
  isOpen: boolean
  onClose: () => void
}

const AddProductForm: React.FC<AddProductFormProps> = ({ isOpen, onClose }) => {
  const dispatch = useAppDispatch()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    const formData = new FormData(e.currentTarget)
    const newProduct: Omit<Product, 'id'> = {
      title: formData.get('title') as string,
      category: formData.get('category') as string,
      price: Number(formData.get('price')),
      brand: formData.get('brand') as string,
      sku: formData.get('sku') as string,
      thumbnail: '',
      rating: 0,
    }

    dispatch(addToast({
      type: 'success' as ToastType,
      message: `Добавлен товар: ${newProduct.title}`,
      autoClose: true,
      duration: 15 * 1000,
    }))
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="flex justify-between items-center py-4 px-8 border-b">
          <h2 className="text-xl font-bold text-gray-800">Добавить товар</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <FontAwesomeIcon icon={faXmark} size="lg" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className=" py-4 px-8 space-y-4">
          <div>
            <label htmlFor="title" className="block font-medium text-gray-700 mb-1">
              Наименование
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md  focus:border-blue-500"
              placeholder="Введите наименование товара"
            />
          </div>

          <div>
            <label htmlFor="category" className="block  font-medium text-gray-700 mb-1">
              Категория
            </label>
            <input
              type="text"
              id="category"
              name="category"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md  focus:border-blue-500"
              placeholder="Введите категорию"
            />
          </div>

          <div>
            <label htmlFor="brand" className="block  font-medium text-gray-700 mb-1">
              Вендор
            </label>
            <input
              type="text"
              id="brand"
              name="brand"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md  focus:border-blue-500"
              placeholder="Введите вендора"
            />
          </div>

          <div>
            <label htmlFor="sku" className="block  font-medium text-gray-700 mb-1">
              Артикул
            </label>
            <input
              type="text"
              id="sku"
              name="sku"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md  focus:border-blue-500"
              placeholder="Введите артикул"
            />
          </div>

          <div>
            <label htmlFor="price" className="block  font-medium text-gray-700 mb-1">
              Цена
            </label>
            <input
              type="number"
              id="price"
              name="price"
              required
              min="0"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-md  focus:border-blue-500"
              placeholder="Введите цену"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="text-sm font-bold py-3 px-5 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none "
            >
              Отмена
            </button>
            <button
                type="submit"
                className="text-sm font-bold bg-blue-600 text-white py-3 px-5 rounded-lg hover:bg-blue-700  focus:ring-offset-2 disabled:bg-gray-200 disabled:cursor-not-allowed transition"
            >
            <FontAwesomeIcon icon={faPlusCircle} className="mr-2" />Добавить
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddProductForm
