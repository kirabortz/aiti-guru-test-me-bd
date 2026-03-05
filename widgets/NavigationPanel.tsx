import { SearchForm } from '@/features/searchProduct'
import { User } from '@/features/logoutUser'

type NavigationPanelProps = {
  title?: string
}

const NavigationPanel: React.FC<NavigationPanelProps> = ({ title = '' }) => {
  return (<nav className="bg-white p-[30px] flex flex-row items-center mb-10">
    <h3 className="text-2xl flex-1 mr-5">{title}</h3>
    <SearchForm />
    <div className="flex-1 ml-5">
      <div className="flex justify-end items-center">
        <User />
      </div>
    </div>
  </nav>
  )
}

export default NavigationPanel