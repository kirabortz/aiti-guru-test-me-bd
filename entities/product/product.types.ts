export type Product = {
  id: number
  title: string
  category: string
  thumbnail: string
  brand: string
  sku: string
  rating: number
  price: number
}

export type ProductsResponse = {
  products: Product[]
  total: number
  skip: number
  limit: number
}
