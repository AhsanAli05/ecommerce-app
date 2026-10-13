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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-zinc-100"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-600 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="bg-zinc-50 p-8 flex items-center justify-center">
            <img
              src={product.images[0] || product.thumbnail}
              alt={product.title}
              className="max-h-72 max-w-full object-contain"
            />
          </div>

          <div className="p-6 md:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-orange-600">
                  {product.category}
                </span>
                <div className="flex items-center gap-1 text-sm font-bold text-zinc-800">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>{product.rating.toFixed(1)}</span>
                </div>
              </div>

              <h2 className="text-xl font-extrabold text-zinc-900 leading-snug mb-3">
                {product.title}
              </h2>

              <p className="text-sm text-zinc-600 leading-relaxed mb-6">
                {product.description}
              </p>

              <div className="flex items-center gap-2 mb-6 text-xs font-medium">
                {product.stock > 0 ? (
                  <span className="inline-flex items-center gap-1.5 text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    In Stock ({product.stock} units available)
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-rose-700 bg-rose-50 px-3 py-1 rounded-full">
                    <AlertCircle className="w-3.5 h-3.5" />
                    Out of Stock
                  </span>
                )}
              </div>
            </div>

            <div>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-3xl font-black text-zinc-950">
                  ${product.price.toFixed(2)}
                </span>
                {product.discountPercentage && (
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-sm bg-orange-100 text-orange-700">
                    {product.discountPercentage.toFixed(0)}% OFF
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="flex-1 py-3 px-5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Add to Cart
                </button>
                <button
                  type="button"
                  onClick={handleToggleWishlist}
                  className={`p-3 rounded-xl border border-zinc-200 transition-colors ${
                    isWishlisted ? 'bg-orange-50 text-orange-600 border-orange-200' : 'text-zinc-600 hover:bg-zinc-50'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-orange-600' : ''}`} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
