import { X } from 'lucide-react'

interface ActiveFiltersProps {
  showWishlistOnly: boolean
  wishlistCount: number
  onClearWishlist: () => void
  departmentFilter: string
  onClearDepartment: () => void
  minRating: number | null
  onClearRating: () => void
  onResetAll: () => void
}

export default function ActiveFilters({
  showWishlistOnly,
  wishlistCount,
  onClearWishlist,
  departmentFilter,
  onClearDepartment,
  minRating,
  onClearRating,
  onResetAll,
}: ActiveFiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 pt-1">
      <span className="text-xs font-bold text-zinc-400 tracking-wider">ACTIVE:</span>
      {showWishlistOnly && (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-xs font-semibold text-orange-700 shadow-2xs">
          Wishlist Only ({wishlistCount})
          <button
            type="button"
            onClick={onClearWishlist}
            className="hover:text-black"
          >
            <X className="w-3 h-3" />
          </button>
        </span>
      )}
      {departmentFilter && (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-zinc-200 text-xs font-medium text-zinc-700 shadow-2xs">
          {departmentFilter}
          <button
            type="button"
            onClick={onClearDepartment}
            className="hover:text-black"
          >
            <X className="w-3 h-3" />
          </button>
        </span>
      )}
      {minRating !== null && (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-zinc-200 text-xs font-medium text-zinc-700 shadow-2xs">
          Rating: {minRating}+
          <button
            type="button"
            onClick={onClearRating}
            className="hover:text-black"
          >
            <X className="w-3 h-3" />
          </button>
        </span>
      )}
      <button
        type="button"
        onClick={onResetAll}
        className="text-xs font-bold text-orange-600 hover:text-orange-700 ml-2"
      >
        Reset All
      </button>
    </div>
  )
}
