'use client'

import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import { useDebounce } from '@/shared/hooks/useDebounce'
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks'
import { setSearchQuery } from '@/lib/store/slices/productsSlice'

const SearchForm: React.FC = () => {
  const dispatch = useAppDispatch()
  const [inputValue, setInputValue] = useState('')
  const debouncedSearchQuery = useDebounce(inputValue)

  useEffect(() => {
    dispatch(setSearchQuery(debouncedSearchQuery.trim()))
  }, [debouncedSearchQuery, dispatch])

  const handleClear = () => {
    setInputValue('')
    dispatch(setSearchQuery(''))
  }

  return (
    <div className="w-[300px] md:w-[1000px] relative">
      <input
        type="text"
        className="bg-gray3 border border-gray3 rounded px-5 py-2 w-full"
        placeholder="Найти"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      {inputValue.trim() && <FontAwesomeIcon
        icon={faTimes}
        className="text-gray-500 hover:text-[var(--color-primary)] absolute top-3 right-3 cursor-pointer"
        onClick={handleClear}
      />}
    </div>
  )
}

export default SearchForm