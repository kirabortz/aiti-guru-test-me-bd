import Image from 'next/image'

import { THUMBBNAIL_URL } from '@/shared/constants'

import type { Product } from '@/entities/product/product.types'

type ProductTemplateProps = {
  item: Product
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({ item }) => {
  const proxyUrl = item.thumbnail?.replace(THUMBBNAIL_URL, '/api/dummy-image')
  return (
    <div className="flex min-h-[48px]">
      <div className="w-12 h-12 bg-gray6 border border-gray7 rounded-lg overflow-hidden mr-4">
        {proxyUrl && <Image src={proxyUrl} alt={item.title} width={48} height={48} className="object-cover" />}
      </div>
      <div>
        <div className="text-primary text-base font-bold">{item.title}</div>
        <div className="text-gray8 text-sm">{item.category}</div>
      </div>
      
    </div>
  )
}

export default ProductTemplate