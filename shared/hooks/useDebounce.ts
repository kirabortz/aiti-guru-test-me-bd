import { useEffect, useState } from 'react'

const DEBOUBCE_DELAY = 700

export const useDebounce = (value: string, delay: number = DEBOUBCE_DELAY) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}
