import { ProductsTable } from '@/features/showProducts/ProductsTable'
import NavigationPanel from '@/widgets/NavigationPanel'

import { Panel } from '@/shared/ui/Panel'
import { AddProduct } from '@/features/addProduct'

const ProductsPageContent: React.FC = () => {
  return (<>
      <NavigationPanel title="Товары" />
      <Panel>
        <div className="flex justify-between">
          <h2 className="flex-1 text-18px font-bold">Все позиции</h2>
          <div>
            <AddProduct />
          </div>
        </div>
        <ProductsTable />
      </Panel>
    </>
  )
}

export default ProductsPageContent