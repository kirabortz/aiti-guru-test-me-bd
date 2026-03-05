import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { AuthResponse } from '@/entities/auth/auth.types'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, { username: string; password: string }>({
      query: (credentials) => ({
        url: '/auth',
        method: 'POST',
        body: credentials,
      }),
    }),
    checkAuth: builder.query<AuthResponse, void>({
      query: () => '/auth',
    }),
  }),
})

export const { useLoginMutation, useCheckAuthQuery } = authApi
