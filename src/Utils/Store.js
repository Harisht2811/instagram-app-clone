import { configureStore } from '@reduxjs/toolkit'
import  useReducer  from './Createslice'

export default configureStore({
  reducer: {
    user:useReducer,
  },
})