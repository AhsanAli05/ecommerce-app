import { combineReducers } from '@reduxjs/toolkit'
import productsReducer from '../slices/productsSlice'

const rootReducer = combineReducers({
  products: productsReducer,
})

export default rootReducer
