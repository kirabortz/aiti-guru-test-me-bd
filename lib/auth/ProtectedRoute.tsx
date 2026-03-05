'use client'

import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useAppSelector } from '@/lib/store/hooks'

type ProtectedRouteProps = {
  children: React.ReactNode
  redirectPath?: string
}

export function ProtectedRoute({ children, redirectPath = '/login' }: ProtectedRouteProps) {
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated)
  const router = useRouter()
  const currentPath = usePathname()

  useEffect(() => {
    if (!isAuthenticated) {
      const redirectUrl = `${redirectPath}?redirect=${encodeURIComponent(currentPath)}`
      router.replace(redirectUrl)
    }
  }, [isAuthenticated, currentPath, redirectPath, router])

  if (!isAuthenticated) {
    return null
  }

  return <>{children}</>
}
