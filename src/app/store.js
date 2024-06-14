import { configureStore } from '@reduxjs/toolkit'
import adminReducer from '../features/admin/adminSlice.js'

export default configureStore({
  reducer: {
    admin: adminReducer
  },
})