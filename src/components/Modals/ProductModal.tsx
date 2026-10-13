import { X, Star, ShoppingBag, Heart, CheckCircle2, AlertCircle } from 'lucide-react'
import type { Product } from '../../api/apiCalling'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { addToCart, toggleWishlist, selectWishlistIds } from '../../store/slices/cartSlice'

interface ProductModalProps {
  product: Product | null
  onClose: () => void
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const dispatch = useAppDispatch()
  const wishlistIds = useAppSelector(selectWishlistIds)

  if (!product) return null

  const isWishlisted = wishlistIds.includes(product.id)

  const handleAddToCart = () => {
    dispatch(addToCart(product))
    onClose()
  }

  const handleToggleWishlist = () => {
    dispatch(toggleWishlist(product.id))
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-zinc-100"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 p-1.5 sm:p-2 rounded-full bg-zinc-100/80 hover:bg-zinc-200 text-zinc-600 transition-colors shadow-xs"
          aria-label="Close"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="bg-zinc-50 p-4 sm:p-8 flex items-center justify-center">
            <img
              src={product.images[0] || product.thumbnail}
              alt={product.title}
              className="max-h-52 sm:max-h-72 max-w-full object-contain"
            />
          </div>

          <div className="p-4 sm:p-6 md:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-3 mb-2 pr-10 sm:pr-12">
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-orange-600">
                  {product.category}
                </span>
                <div className="flex items-center gap-1 text-xs sm:text-sm font-bold text-zinc-800">
                  <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-amber-400 text-amber-400" />
                  <span>{product.rating.toFixed(1)}</span>
                </div>
              </div>

              <h2 className="text-lg sm:text-xl font-extrabold text-zinc-900 leading-snug mb-2 sm:mb-3">
                {product.title}
              </h2>

              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed mb-4 sm:mb-6">
                {product.description}
              </p>

              <div className="flex items-center gap-2 mb-4 sm:mb-6 text-[11px] sm:text-xs font-medium">
                {product.stock > 0 ? (
                  <span className="inline-flex items-center gap-1.5 text-emerald-700 bg-emerald-50 px-2.5 sm:px-3 py-1 rounded-full">
                    <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    In Stock ({product.stock} units)
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-rose-700 bg-rose-50 px-2.5 sm:px-3 py-1 rounded-full">
                    <AlertCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    Out of Stock
                  </span>
                )}
              </div>
            </div>

            <div>
              <div className="flex items-baseline gap-2 mb-3 sm:mb-4">
                <span className="text-2xl sm:text-3xl font-black text-zinc-950">
                  ${product.price.toFixed(2)}
                </span>
                {product.discountPercentage && (
                  <span className="text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-sm bg-orange-100 text-orange-700">
                    {product.discountPercentage.toFixed(0)}% OFF
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2.5 sm:gap-3">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="flex-1 py-2.5 sm:py-3 px-4 sm:px-5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-all active:scale-95"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Add to Cart
                </button>
                <button
                  type="button"
                  onClick={handleToggleWishlist}
                  className={`p-2.5 sm:p-3 rounded-xl border border-zinc-200 transition-colors ${isWishlisted ? 'bg-orange-50 text-orange-600 border-orange-200' : 'text-zinc-600 hover:bg-zinc-50'
                    }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-4 h-4 sm:w-5 sm:h-5 ${isWishlisted ? 'fill-orange-600' : ''}`} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
