import { WARNING_RATING } from '@/shared/constants'
import type { Product } from '@/entities/product/product.types'


type RatingTemplateProps = {
  item: Product
}

const RatingTemplate: React.FC<RatingTemplateProps> = ({ item }) => {
  if (!item.rating) return ''
  return (
    <div>
      <span className={item.rating < WARNING_RATING ? 'text-red-500 font-second' : 'font-second'}>{item.rating}</span>
      /5
    </div>    
  )
}

export default RatingTemplate