'use client'

import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import AddProductForm from './AddProductForm'

const AddProduct: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleAddClick = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      <button
        type="button"
        onClick={handleAddClick}
        className="text-sm bg-blue-600 text-white font-bold py-3 px-5 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-200 disabled:cursor-not-allowed transition"
      >
        <FontAwesomeIcon icon={faPlusCircle} className="mr-2" />Добавить
      </button>
      
      <AddProductForm 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
      />
    </>
  )
}

export default AddProduct