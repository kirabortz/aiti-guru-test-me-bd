import type { Product } from '@/entities/product/product.types'

type PriceTemplateProps = {
  item: Product
}

const PriceTemplate: React.FC<PriceTemplateProps> = ({ item }) => {
  if (!item.price) return ''
  const itemStr = item.price.toString()
  const [integerPart, fractionalPart] = itemStr.split('.');
    
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    

  return <span className="font-mono">
      {formattedInteger}<span className="text-gray-400">,{fractionalPart}</span>
  </span>
}

export default PriceTemplate