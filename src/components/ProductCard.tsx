import { Heart, Star, Plus } from 'lucide-react'
import type { Product } from '../api/apiCalling'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { addToCart, toggleWishlist, selectWishlistIds } from '../store/slices/cartSlice'

interface ProductCardProps {
  product: Product
  onSelect: (product: Product) => void
}

export default function ProductCard({ product, onSelect }: ProductCardProps) {
  const dispatch = useAppDispatch()
  const wishlistIds = useAppSelector(selectWishlistIds)
  const isWishlisted = wishlistIds.includes(product.id)

  const originalPrice = product.discountPercentage
    ? (product.price / (1 - product.discountPercentage / 100)).toFixed(2)
    : null

  const getTag = () => {
    if (product.rating >= 4.8) return { label: 'TOP SELLER', color: 'bg-amber-50 text-amber-800' }
    if ((product.discountPercentage ?? 0) > 15) return { label: 'PRO DEALS', color: 'bg-orange-50 text-orange-800' }
    if (product.category.toLowerCase().includes('jewel')) return { label: 'HANDCRAFTED', color: 'bg-emerald-50 text-emerald-800' }
    if (product.stock > 50) return { label: 'FAST DISPATCH', color: 'bg-amber-100/70 text-amber-900' }
    return null
  }

  const tag = getTag()

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    dispatch(toggleWishlist(product.id))
  }

  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    dispatch(addToCart(product))
  }

  return (
    <div
      onClick={() => onSelect(product)}
      className="group relative bg-white rounded-2xl border border-zinc-200/80 p-4 flex flex-col justify-between hover:shadow-lg transition-all duration-200 cursor-pointer"
    >
      <button
        type="button"
        onClick={handleWishlistClick}
        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 hover:bg-white text-zinc-400 hover:text-orange-600 transition-colors shadow-xs"
        aria-label="Toggle Wishlist"
      >
        <Heart
          className={`w-4 h-4 transition-colors ${
            isWishlisted ? 'fill-orange-600 text-orange-600' : 'text-zinc-400'
          }`}
        />
      </button>

      <div>
        <div className="w-full h-44 sm:h-48 flex items-center justify-center p-2 rounded-xl bg-[#f8f9fa] overflow-hidden mb-3">
          <img
            src={product.thumbnail || (product.images && product.images[0])}
            alt={product.title}
            className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {tag && (
          <span
            className={`inline-block text-[10px] font-extrabold tracking-wider px-2 py-0.5 rounded-sm uppercase mb-2 ${tag.color}`}
          >
            {tag.label}
          </span>
        )}

        <div className="flex items-center justify-between text-xs mb-1.5">
          <span className="uppercase text-[11px] font-bold tracking-wider text-zinc-400 truncate max-w-[130px]">
            {product.category}
          </span>
          <div className="flex items-center gap-1 text-zinc-700 font-semibold text-xs shrink-0">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{product.rating.toFixed(1)}</span>
            <span className="text-zinc-400 font-normal">({product.stock * 3 + 12})</span>
          </div>
        </div>

        <h3 className="font-bold text-zinc-900 text-sm leading-snug line-clamp-2 min-h-[2.5rem]">
          {product.title}
        </h3>
      </div>

      <div className="mt-4 pt-2 flex items-center justify-between">
        <div className="flex items-baseline gap-1.5">
          <span className="text-lg font-black text-zinc-950">
            ${product.price.toFixed(2)}
          </span>
          {originalPrice && (
            <span className="text-xs text-zinc-400 line-through">
              ${originalPrice}
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={handleAddToCartClick}
          className="relative h-9 w-9 rounded-lg border-2 border-orange-500/80 hover:bg-orange-600 text-orange-600 hover:text-white flex items-center justify-center transition-all shadow-2xs hover:shadow-xs active:scale-95"
          aria-label="Add to cart"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>
    </div>
  )
}
