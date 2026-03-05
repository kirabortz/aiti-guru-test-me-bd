import { NextRequest, NextResponse } from 'next/server'

import { handleApiError } from '@/lib/errorHandler'
import { API_URL } from '@/shared/constants'
import type { ProductsResponse } from '@/entities/product/product.types'

export async function GET(request: NextRequest) {
  try {
    const searchParams = new URLSearchParams(request.nextUrl.searchParams)
    searchParams.set('select', 'title,brand,sku,rating,price,category,thumbnail')
    let url = `${API_URL}/products`
    if (searchParams.get('q')) {
      url += '/search';
    }
    const response = await fetch(`${url}?${searchParams}`)
    const data: ProductsResponse = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    return handleApiError(error)
  }
}
