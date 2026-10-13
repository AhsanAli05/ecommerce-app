import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Product } from '../../api/apiCalling'
import type { RootState } from '../store'

export interface CartItem {
  product: Product
  quantity: number
}

export interface CartState {
  items: CartItem[]
  wishlist: number[]
}

const initialState: CartState = {
  items: [],
  wishlist: [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existing = state.items.find((item) => item.product.id === action.payload.id)
      if (existing) {
        existing.quantity += 1
      } else {
        state.items.push({ product: action.payload, quantity: 1 })
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.product.id !== action.payload)
    },
    updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const item = state.items.find((i) => i.product.id === action.payload.id)
      if (item) {
        if (action.payload.quantity <= 0) {
          state.items = state.items.filter((i) => i.product.id !== action.payload.id)
        } else {
          item.quantity = action.payload.quantity
        }
      }
    },
    clearCart: (state) => {
      state.items = []
    },
    toggleWishlist: (state, action: PayloadAction<number>) => {
      const exists = state.wishlist.includes(action.payload)
      if (exists) {
        state.wishlist = state.wishlist.filter((id) => id !== action.payload)
      } else {
        state.wishlist.push(action.payload)
      }
    },
  },
})

export const { addToCart, removeFromCart, updateQuantity, clearCart, toggleWishlist } =
  cartSlice.actions

export const selectCartItems = (state: RootState) => state.cart.items
export const selectCartCount = (state: RootState) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0)
export const selectCartTotal = (state: RootState) =>
  state.cart.items.reduce((total, item) => total + item.product.price * item.quantity, 0)
export const selectWishlistIds = (state: RootState) => state.cart.wishlist
export const selectWishlistCount = (state: RootState) => state.cart.wishlist.length

export default cartSlice.reducer
