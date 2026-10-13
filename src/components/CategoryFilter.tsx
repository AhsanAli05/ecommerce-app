import { ArrowUpDown, Grid, List } from 'lucide-react'

export interface CategoryTab {
  id: string
  label: string
}

interface CategoryFilterProps {
  tabs: CategoryTab[]
  selectedCategory: string
  onSelectCategory: (id: string) => void
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating'
  onSortChange: (sort: 'featured' | 'price-asc' | 'price-desc' | 'rating') => void
  viewMode: 'grid' | 'list'
  onViewModeChange: (mode: 'grid' | 'list') => void
}

export default function CategoryFilter({
  tabs,
  selectedCategory,
  onSelectCategory,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-zinc-200/60 pb-6">
      <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
        {tabs.map((tab) => {
          const isActive = selectedCategory === tab.id
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onSelectCategory(tab.id)}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-orange-600 text-white shadow-xs'
                  : 'bg-[#eceef5] hover:bg-zinc-200 text-zinc-700'
              }`}
            >
              {tab.label}
            </button>
          )
        })}
      </div>

      <div className="flex items-center gap-3 self-end lg:self-auto shrink-0">
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) =>
              onSortChange(
                e.target.value as 'featured' | 'price-asc' | 'price-desc' | 'rating',
              )
            }
            className="appearance-none bg-[#eceef5] hover:bg-zinc-200 text-zinc-800 text-xs sm:text-sm font-semibold rounded-full pl-9 pr-8 py-2 cursor-pointer focus:outline-none transition-colors"
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
          <ArrowUpDown className="w-3.5 h-3.5 text-zinc-600 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        <div className="flex items-center bg-[#eceef5] p-1 rounded-xl">
          <button
            type="button"
            onClick={() => onViewModeChange('grid')}
            className={`p-1.5 rounded-lg transition-all ${
              viewMode === 'grid'
                ? 'bg-white text-orange-600 shadow-xs'
                : 'text-zinc-500 hover:text-zinc-800'
            }`}
            aria-label="Grid view"
          >
            <Grid className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => onViewModeChange('list')}
            className={`p-1.5 rounded-lg transition-all ${
              viewMode === 'list'
                ? 'bg-white text-orange-600 shadow-xs'
                : 'text-zinc-500 hover:text-zinc-800'
            }`}
            aria-label="List view"
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
