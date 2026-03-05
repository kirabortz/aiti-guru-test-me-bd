'use client'

import { useEffect, useRef, useState } from 'react'
import { Provider } from 'react-redux'
import { store } from './store'
import { loadAuthFromStorage } from './slices/authSlice'

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    store.dispatch(loadAuthFromStorage())
  }, [])

  if (!isClient) {
    return null
  }
  return <Provider store={store}>{children}</Provider>
}