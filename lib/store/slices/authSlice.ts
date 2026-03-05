import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { AuthUser } from '@/entities/auth/auth.types'

type AuthState = {
  isAuthenticated: boolean
  user: AuthUser | null
  rememberMe: boolean
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  rememberMe: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<{ user: AuthUser; rememberMe: boolean; accessToken: string; refreshToken: string }>) => {
      state.isAuthenticated = true
      state.user = action.payload.user
      state.rememberMe = action.payload.rememberMe

      if (typeof window !== 'undefined') {
        const storage = action.payload.rememberMe ? localStorage : sessionStorage
        storage.setItem('accessToken', action.payload.accessToken)
        storage.setItem('refreshToken', action.payload.refreshToken)
        storage.setItem('username', action.payload.user.username)
        storage.setItem('userId', action.payload.user.id.toString())
      }
    },
    loadAuthFromStorage: (state) => {
      if (typeof window !== 'undefined') {
        const savedAccessToken = localStorage.getItem('accessToken')
        const savedRefreshToken = localStorage.getItem('refreshToken')
        const sessionAccessToken = sessionStorage.getItem('accessToken')
        const sessionRefreshToken = sessionStorage.getItem('refreshToken')

        if (savedAccessToken && savedRefreshToken) {
          state.user = {
            id: parseInt(localStorage.getItem('userId') || '0'),
            username: localStorage.getItem('username') || '',
          }
          state.isAuthenticated = true
          state.rememberMe = true
        } else if (sessionAccessToken && sessionRefreshToken) {
          state.user = {
            id: parseInt(sessionStorage.getItem('userId') || '0'),
            username: sessionStorage.getItem('username') || '',
          }
          state.isAuthenticated = true
          state.rememberMe = false
        }
      }
    },
    logout: (state) => {
      state.isAuthenticated = false
      state.user = null
      state.rememberMe = false

      if (typeof window !== 'undefined') {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('username')
        localStorage.removeItem('userId')
        sessionStorage.removeItem('accessToken')
        sessionStorage.removeItem('refreshToken')
        sessionStorage.removeItem('username')
        sessionStorage.removeItem('userId')
      }
    },
  },
})

export const { setAuth, logout, loadAuthFromStorage } = authSlice.actions
export default authSlice.reducer
