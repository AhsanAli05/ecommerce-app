import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import {
  selectCartItems,
  selectCartTotal,
  updateQuantity,
  removeFromCart,
  clearCart,
} from '../store/slices/cartSlice'

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const dispatch = useAppDispatch()
  const items = useAppSelector(selectCartItems)
  const total = useAppSelector(selectCartTotal)

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-full sm:max-w-md bg-white shadow-2xl flex flex-col">
          <div className="p-4 sm:p-6 border-b border-zinc-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-orange-600" />
              <h2 className="text-base sm:text-lg font-extrabold text-zinc-900">Your Cart</h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-orange-100 text-orange-800 font-bold">
                {items.length}
              </span>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 sm:p-2 rounded-full hover:bg-zinc-100 text-zinc-500 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3 sm:space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="h-16 w-16 rounded-full bg-orange-50 flex items-center justify-center text-orange-500 mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <p className="text-base font-bold text-zinc-900">Your cart is empty</p>
                <p className="text-xs text-zinc-500 mt-1 max-w-xs">
                  Discover curated products from our catalog and start adding your favorites.
                </p>
              </div>
            ) : (
              items.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="flex gap-4 p-3.5 rounded-2xl border border-zinc-100 bg-zinc-50/50"
                >
                  <img
                    src={product.thumbnail || product.images[0]}
                    alt={product.title}
                    className="w-18 h-18 object-contain rounded-xl bg-white p-1 shrink-0"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-bold text-zinc-900 truncate">
                          {product.title}
                        </h4>
                        <button
                          type="button"
                          onClick={() => dispatch(removeFromCart(product.id))}
                          className="text-zinc-400 hover:text-rose-500 transition-colors p-0.5"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-xs font-bold text-zinc-900 mt-0.5">
                        ${product.price.toFixed(2)}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center border border-zinc-200 rounded-lg bg-white px-1">
                        <button
                          type="button"
                          onClick={() =>
                            dispatch(updateQuantity({ id: product.id, quantity: quantity - 1 }))
                          }
                          className="p-1 text-zinc-500 hover:text-black"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-bold text-zinc-800">
                          {quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            dispatch(updateQuantity({ id: product.id, quantity: quantity + 1 }))
                          }
                          className="p-1 text-zinc-500 hover:text-black"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="text-xs font-semibold text-zinc-500 ml-auto">
                        ${(product.price * quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {items.length > 0 && (
            <div className="p-4 sm:p-6 border-t border-zinc-100 bg-white space-y-3 sm:space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-500 font-medium">Subtotal</span>
                <span className="text-lg sm:text-xl font-black text-zinc-900">${total.toFixed(2)}</span>
              </div>
              <button
                type="button"
                className="w-full py-3 sm:py-3.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-all active:scale-95"
              >
                Proceed to Checkout
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => dispatch(clearCart())}
                className="w-full text-center text-xs text-zinc-400 hover:text-rose-500 transition-colors"
              >
                Clear Cart
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
