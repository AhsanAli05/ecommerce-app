import { combineReducers } from '@reduxjs/toolkit'
import productsReducer from '../slices/productsSlice'
import cartReducer from '../slices/cartSlice'

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
})

export default rootReducer
