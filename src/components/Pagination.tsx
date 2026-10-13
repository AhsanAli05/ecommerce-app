import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  totalItems: number
  pageSize: number
  onPageChange: (page: number) => void
}

export default function Pagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
}: PaginationProps) {
  if (totalItems === 0) return null

  const getPageNumbers = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    if (currentPage <= 3) {
      return [1, 2, 3, 4, '...', totalPages]
    }

    if (currentPage >= totalPages - 2) {
      return [1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages]
    }

    return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages]
  }

  const pages = getPageNumbers()
  const progressPercent = Math.min(100, Math.round(((currentPage * pageSize) / totalItems) * 100))

  return (
    <div className="pt-4 sm:pt-6 border-t border-zinc-200/60 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 w-full min-w-0">
      <div className="w-full sm:w-72 space-y-1.5 sm:space-y-2">
        <div className="flex items-center justify-between text-xs font-medium text-zinc-500">
          <span>Catalog progress</span>
          <span className="font-bold text-zinc-800">
            {Math.min(currentPage * pageSize, totalItems)} of {totalItems} products
          </span>
        </div>
        <div className="w-full h-2 rounded-full bg-zinc-200/80 overflow-hidden">
          <div
            className="h-full bg-orange-600 rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      <div className="flex items-center flex-wrap justify-center gap-1 sm:gap-1.5 self-center">
        <button
          type="button"
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="flex items-center gap-1 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 disabled:opacity-40 disabled:hover:bg-zinc-100 text-[11px] sm:text-xs font-semibold text-zinc-700 transition-colors"
        >
          <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          Previous
        </button>

        {pages.map((p, idx) => {
          if (p === '...') {
            return (
              <span key={`ellipsis-${idx}`} className="px-1 text-zinc-400 text-xs select-none">
                ...
              </span>
            )
          }

          const pageNum = Number(p)
          const isActive = currentPage === pageNum

          return (
            <button
              key={pageNum}
              type="button"
              onClick={() => onPageChange(pageNum)}
              className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl text-xs font-bold transition-all ${
                isActive
                  ? 'bg-orange-600 text-white shadow-xs'
                  : 'text-zinc-600 hover:bg-zinc-100'
              }`}
            >
              {pageNum}
            </button>
          )
        })}

        <button
          type="button"
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="flex items-center gap-1 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl border border-orange-500/80 hover:bg-orange-600 hover:text-white disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-orange-600 text-orange-600 text-[11px] sm:text-xs font-bold transition-colors"
        >
          Next
          <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>
      </div>
    </div>
  )
}
