import { configureStore } from '@reduxjs/toolkit'
import employeeSlice from '@/features/employee/employeeSlice'
import authSlice from '@/features/auth/authSlice'

export const store = configureStore({
  reducer: { employeeSlice, authSlice },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
