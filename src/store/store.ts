import { configureStore } from '@reduxjs/toolkit'
import { userPageSlice } from './reducers/userPageReducer'
import { useDispatch as useDispatchOrigin } from 'react-redux'

export const store = configureStore({
  reducer: {
    users: userPageSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useDispatch = useDispatchOrigin.withTypes<AppDispatch>()
