import { useEffect, useState, useMemo } from 'react'
import { CheckCircle2, RotateCcw, AlertTriangle } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import {
  fetchProducts,
  selectProducts,
  selectProductsStatus,
  selectProductsError,
} from '../store/slices/productsSlice'
import { selectWishlistIds } from '../store/slices/cartSlice'
import type { Product } from '../api/apiCalling'
import Navbar from '../components/Navbar'
import ProductCard from '../components/ProductCard'
import ProductSkeleton from '../components/ProductSkeleton'
import CategoryFilter, { type CategoryTab } from '../components/CategoryFilter'
import ActiveFilters from '../components/ActiveFilters'
import Pagination from '../components/Pagination'
import ProductModal from '../components/Modals/ProductModal'
import CartDrawer from '../components/CartDrawer'
import Footer from '../components/Footer'

const CATEGORY_TABS: CategoryTab[] = [
  { id: 'all', label: 'All Products' },
  { id: 'electronics', label: 'Electronics' },
  { id: 'jewelery', label: 'Jewelery' },
  { id: "men's clothing", label: "Men's Clothing" },
  { id: "women's clothing", label: "Women's Clothing" },
]

export default function Dashboard() {
  const dispatch = useAppDispatch()
  const rawProducts = useAppSelector(selectProducts)
  const status = useAppSelector(selectProductsStatus)
  const error = useAppSelector(selectProductsError)
  const wishlistIds = useAppSelector(selectWishlistIds)

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [minRating, setMinRating] = useState<number | null>(4.0)
  const [departmentFilter, setDepartmentFilter] = useState('All Departments')
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [showWishlistOnly, setShowWishlistOnly] = useState(false)

  const pageSize = 8

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts())
    }
  }, [dispatch, status])

  const filteredProducts = useMemo(() => {
    let result = [...rawProducts]

    if (showWishlistOnly) {
      result = result.filter((p) => wishlistIds.includes(p.id))
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim()
      result = result.filter((p) => p.title.toLowerCase().includes(q))
    }

    if (selectedCategory !== 'all') {
      result = result.filter((p) => {
        const cat = p.category.toLowerCase()
        if (selectedCategory === 'electronics') {
          return cat.includes('electronic') || cat.includes('laptop') || cat.includes('smart')
        }
        if (selectedCategory === 'jewelery') {
          return cat.includes('jewel') || cat.includes('watch')
        }
        if (selectedCategory === "men's clothing") {
          return (cat.includes('men') && !cat.includes('women')) || cat.includes('shirt')
        }
        if (selectedCategory === "women's clothing") {
          return cat.includes('women') || cat.includes('dress') || cat.includes('beauty')
        }
        return cat.includes(selectedCategory.toLowerCase())
      })
    }

    if (minRating !== null) {
      result = result.filter((p) => p.rating >= minRating)
    }

    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price)
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price)
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating)
    }

    return result
  }, [rawProducts, showWishlistOnly, wishlistIds, searchQuery, selectedCategory, minRating, sortBy])

  const totalPages = Math.ceil(filteredProducts.length / pageSize) || 1
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize
    return filteredProducts.slice(startIndex, startIndex + pageSize)
  }, [filteredProducts, currentPage])

  const handleResetFilters = () => {
    setSearchQuery('')
    setSelectedCategory('all')
    setMinRating(null)
    setDepartmentFilter('All Departments')
    setSortBy('featured')
    setShowWishlistOnly(false)
    setCurrentPage(1)
  }

  return (
    <div className="min-h-screen bg-[#fafbfc] text-zinc-900 flex flex-col font-sans">
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={(q) => {
          setSearchQuery(q)
          setCurrentPage(1)
        }}
        onOpenCart={() => setIsCartOpen(true)}
        onToggleWishlistOnly={() => {
          setShowWishlistOnly((prev) => !prev)
          setCurrentPage(1)
        }}
        isWishlistActive={showWishlistOnly}
      />

      <main className="flex-1 max-w-7xl 2xl:max-w-[1536px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8 min-w-0">
        <CategoryFilter
          tabs={CATEGORY_TABS}
          selectedCategory={selectedCategory}
          onSelectCategory={(id) => {
            setSelectedCategory(id)
            setCurrentPage(1)
          }}
          sortBy={sortBy}
          onSortChange={(sort) => {
            setSortBy(sort)
            setCurrentPage(1)
          }}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />

        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-950 font-serif">
                {showWishlistOnly ? 'Saved Wishlist' : 'Curated Catalog'}
              </h1>
              <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-orange-100 text-orange-700 text-[11px] sm:text-xs font-black tracking-wider uppercase">
                {showWishlistOnly ? 'Favorites' : 'In Stock'}
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-zinc-500 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                Showing <strong className="text-zinc-900">{filteredProducts.length}</strong> of{' '}
                <strong className="text-zinc-900">{rawProducts.length || 128}</strong> verified items
              </span>
            </div>
          </div>

          <ActiveFilters
            showWishlistOnly={showWishlistOnly}
            wishlistCount={wishlistIds.length}
            onClearWishlist={() => {
              setShowWishlistOnly(false)
              setCurrentPage(1)
            }}
            departmentFilter={departmentFilter}
            onClearDepartment={() => {
              setDepartmentFilter('')
              setCurrentPage(1)
            }}
            minRating={minRating}
            onClearRating={() => {
              setMinRating(null)
              setCurrentPage(1)
            }}
            onResetAll={handleResetFilters}
          />
        </div>

        {(status === 'loading' || status === 'idle') && (
          <ProductSkeleton count={pageSize} />
        )}

        {status === 'failed' && (
          <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-rose-50/70 border border-rose-200 text-center max-w-lg mx-auto space-y-4 my-8 sm:my-12">
            <AlertTriangle className="w-10 h-10 text-rose-500 mx-auto" />
            <h3 className="text-lg font-bold text-rose-950">Failed to load catalog</h3>
            <p className="text-xs text-rose-700 leading-relaxed">{error}</p>
            <button
              type="button"
              onClick={() => dispatch(fetchProducts())}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-xs transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Try Again
            </button>
          </div>
        )}

        {status === 'succeeded' && filteredProducts.length === 0 && (
          <div className="p-8 sm:p-12 text-center bg-white rounded-2xl sm:rounded-3xl border border-zinc-100 shadow-xs max-w-md mx-auto my-8 sm:my-12 space-y-4">
            <p className="text-base font-bold text-zinc-900">
              {showWishlistOnly ? 'Your wishlist is currently empty' : 'No products match your criteria'}
            </p>
            <p className="text-xs text-zinc-500">
              {showWishlistOnly
                ? 'Save your favorite items by clicking the heart icon on any product card.'
                : 'Try adjusting your search terms, changing categories, or clearing active filters.'}
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="px-5 py-2.5 rounded-full bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold shadow-xs transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

        {status === 'succeeded' && paginatedProducts.length > 0 && (
          <div
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-4 gap-3 sm:gap-6'
                : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6'
            }
          >
            {paginatedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={(p) => setSelectedProduct(p)}
              />
            ))}
          </div>
        )}

        {status === 'succeeded' && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filteredProducts.length}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
          />
        )}
      </main>

      <Footer />

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </div>
  )
}
