import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { useAppSelector, useAppDispatch } from '@/lib/store/hooks'
import { setPage } from '@/lib/store/slices/productsSlice'

type PaginationProps = {
  total: number
}

export const Pagination: React.FC<PaginationProps> = ({ total }) => {
  const dispatch = useAppDispatch()
  const { page, limit } = useAppSelector(state => state.products)
  const { isLoading } = useAppSelector(state => state.products)

  const firstItem = page * limit - limit + 1
  const lastItem = Math.min(page * limit, total)
  const pagesCount = Math.ceil(total / limit)

  const handlePageChange = (newPage: number) => {
    dispatch(setPage(newPage))
  }

  return (
    <div className="flex justify-between align-middle text-font4">
      {!total && !isLoading && <div className="text-primary mt-2">Ничего не найденно</div>}
      {!!total && <>
        <div className="text-gray8 mt-2">Показано <span className="text-primary">{firstItem}-{lastItem}</span> из <span className="text-primary">{total}</span></div>
        <div className="mt-4 flex gap-2">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className="px-3 py-1 text-gray-500 hover:text-[var(--color-primary)] disabled:opacity-30 disabled:hover:text-gray-500 cursor-pointer"
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <div className="flex space-x-2">
            {Array.from({ length: Math.min(5, pagesCount) }, (_, i) => {
              const startPage = Math.max(1, Math.min(page - 2, pagesCount - 4))
              const pageNumber = startPage + i
              if (pageNumber <= pagesCount) {
                const isPageActive = page === pageNumber
                return (
                  <button
                    key={pageNumber}
                    onClick={() => handlePageChange(pageNumber)}
                    className={`px-1 py-1 border rounded min-w-9 ${
                      isPageActive ? 'bg-blue-300 text-white' : ''
                    }`}
                  >
                    {pageNumber}
                  </button>
                )
              }
              return null
            }).filter(Boolean)}
          </div>
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page >= pagesCount - 2}
            className="px-3 py-1 text-gray-500 hover:text-[var(--color-primary)] disabled:opacity-30 disabled:hover:text-gray-500 cursor-pointer"
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </>}
    </div>
  )
}
