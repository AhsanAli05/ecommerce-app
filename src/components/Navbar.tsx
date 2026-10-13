import { useState } from 'react'
import { Search, Heart, ShoppingBag, ChevronDown, User, Sparkles } from 'lucide-react'
import { useAppSelector } from '../store/hooks'
import { selectCartCount, selectWishlistCount } from '../store/slices/cartSlice'

interface NavbarProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  onOpenCart: () => void
  onToggleWishlistOnly: () => void
  isWishlistActive?: boolean
}

export default function Navbar({
  searchQuery,
  onSearchChange,
  onOpenCart,
  onToggleWishlistOnly,
  isWishlistActive = false,
}: NavbarProps) {
  const [activeTab, setActiveTab] = useState<'products' | 'categories' | 'deals'>('products')
  const cartCount = useAppSelector(selectCartCount)
  const wishlistCount = useAppSelector(selectWishlistCount)

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-zinc-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 cursor-pointer select-none">
              <div className="h-9 w-9 rounded-xl bg-orange-600 flex items-center justify-center text-white shadow-xs">
                <ShoppingBag className="w-5 h-5 stroke-[2.2]" />
              </div>
              <span className="text-xl font-black tracking-tight text-zinc-900">
                Shop<span className="text-orange-600">Dash</span>
              </span>
            </div>

            <nav className="hidden md:flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setActiveTab('products')}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  activeTab === 'products'
                    ? 'bg-amber-50 text-orange-950 font-semibold'
                    : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                Products
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('categories')}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  activeTab === 'categories'
                    ? 'bg-amber-50 text-orange-950 font-semibold'
                    : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                Categories
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('deals')}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all flex items-center gap-1 ${
                  activeTab === 'deals'
                    ? 'bg-amber-50 text-orange-950 font-semibold'
                    : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                Deals
                <Sparkles className="w-3.5 h-3.5 text-orange-500" />
              </button>
            </nav>
          </div>

          <div className="flex-1 max-w-xl mx-2 sm:mx-6">
            <div className="relative flex items-center">
              <Search className="absolute left-4 w-4 h-4 text-zinc-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search products, brands, categories..."
                className="w-full pl-11 pr-14 py-2.5 bg-[#f4f5f8] rounded-full text-sm text-zinc-800 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:bg-white transition-all border border-transparent focus:border-orange-200"
              />
              <span className="absolute right-3.5 px-2 py-0.5 rounded-md bg-zinc-200/60 text-[11px] font-semibold text-zinc-500 pointer-events-none">
                ⌘K
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onToggleWishlistOnly}
              className={`relative p-2.5 rounded-full transition-all ${
                isWishlistActive
                  ? 'bg-orange-50 text-orange-600 ring-1 ring-orange-300'
                  : 'text-zinc-700 hover:text-orange-600 hover:bg-zinc-50'
              }`}
              aria-label="Wishlist Filter"
            >
              <Heart
                className={`w-5 h-5 stroke-[1.8] ${
                  isWishlistActive ? 'fill-orange-600 text-orange-600' : ''
                }`}
              />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 h-4 min-w-4 px-1 rounded-full bg-orange-600 text-white text-[10px] font-bold flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={onOpenCart}
              className="relative p-2.5 text-zinc-700 hover:text-orange-600 hover:bg-zinc-50 rounded-full transition-colors"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.8]" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 h-4 min-w-4 px-1 rounded-full bg-orange-600 text-white text-[10px] font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            <div className="flex items-center gap-1.5 pl-1.5 cursor-pointer">
              <div className="h-9 w-9 rounded-full bg-[#8c5338] text-white flex items-center justify-center font-medium shadow-xs">
                <User className="w-4 h-4" />
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-zinc-500" />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
