import { configureStore } from '@reduxjs/toolkit'
import enrollReducer from './enroll'

export const store = configureStore({
  reducer: {
    enrollment: enrollReducer
  }
})
