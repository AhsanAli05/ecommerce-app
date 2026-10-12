import axios from 'axios'

export interface Product {
  id: number
  title: string
  description: string
  category: string
  price: number
  discountPercentage?: number
  rating: number
  stock: number
  brand?: string
  images: string[]
  thumbnail: string
}

export interface ProductsResponse {
  products: Product[]
  total: number
  skip: number
  limit: number
}

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://dummyjson.com',
  timeout: 10000,
})

export const getAllProducts = async (signal?: AbortSignal): Promise<Product[]> => {
  const response = await apiClient.get<ProductsResponse>('/products', {
    params: { limit: 0 },
    signal,
  })
  return response.data.products
}
