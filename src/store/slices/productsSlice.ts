import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { getAllProducts, type Product } from '../../api/apiCalling'
import type { RootState } from '../store'

export interface ProductsState {
  items: Product[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: ProductsState = {
  items: [],
  status: 'idle',
  error: null,
}

export const fetchProducts = createAsyncThunk<Product[], void, { rejectValue: string }>(
  'products/fetchProducts',
  async (_, { signal, rejectWithValue }) => {
    try {
      return await getAllProducts(signal)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (!error.response) {
          return rejectWithValue('Network error. Please check your internet connection.')
        }
        return rejectWithValue(`Request failed with status ${error.response.status}`)
      }
      return rejectWithValue(
        error instanceof Error ? error.message : 'An unexpected error occurred.',
      )
    }
  },
)

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload ?? action.error.message ?? 'An unexpected error occurred.'
      })
  },
})

export const selectProducts = (state: RootState) => state.products.items
export const selectProductsStatus = (state: RootState) => state.products.status
export const selectProductsError = (state: RootState) => state.products.error

export default productsSlice.reducer
