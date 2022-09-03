import { configureStore } from '@reduxjs/toolkit'
import todoAppReducer from './TodoAppRedux/todoAppSlice'

export const store = configureStore({
  reducer: {
    todoApp: todoAppReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
