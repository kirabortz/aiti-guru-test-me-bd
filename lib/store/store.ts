import { configureStore } from '@reduxjs/toolkit'
import { productsApi } from '@/lib/store/api/productsApi'
import { authApi } from '@/lib/store/api/authApi'
import authReducer from '@/lib/store/slices/authSlice'
import productsReducer from '@/lib/store/slices/productsSlice'
import toastsReducer from '@/lib/store/slices/toastsSlice'

export const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
    products: productsReducer,
    toasts: toastsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware, authApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
