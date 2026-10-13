import { ShoppingBag } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#f8f9fd] border-t border-zinc-200/60 mt-16 text-zinc-600">
      <div className="max-w-7xl 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-orange-600 flex items-center justify-center text-white shadow-xs">
                <ShoppingBag className="w-4 h-4 stroke-[2.2]" />
              </div>
              <span className="text-xl font-black tracking-tight text-zinc-900">
                Shop<span className="text-orange-600">Dash</span>
              </span>
            </div>
            <p className="text-sm text-zinc-500 max-w-sm leading-relaxed">
              Rapid, curated online shopping engineered for effortless everyday checkout.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 mb-4">
              Shop
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#new" className="hover:text-orange-600 transition-colors">New Arrivals</a></li>
              <li><a href="#bestsellers" className="hover:text-orange-600 transition-colors">Best Sellers</a></li>
              <li><a href="#flash" className="hover:text-orange-600 transition-colors">Flash Sales</a></li>
              <li><a href="#categories" className="hover:text-orange-600 transition-colors">All Categories</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 mb-4">
              Customer Care
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#track" className="hover:text-orange-600 transition-colors">Track Order</a></li>
              <li><a href="#shipping" className="hover:text-orange-600 transition-colors">Shipping & Delivery</a></li>
              <li><a href="#returns" className="hover:text-orange-600 transition-colors">Returns & Refunds</a></li>
              <li><a href="#help" className="hover:text-orange-600 transition-colors">Help Center</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 mb-4">
              Account
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#profile" className="hover:text-orange-600 transition-colors">My Profile</a></li>
              <li><a href="#orders" className="hover:text-orange-600 transition-colors">Order History</a></li>
              <li><a href="#saved" className="hover:text-orange-600 transition-colors">Saved Items</a></li>
              <li><a href="#settings" className="hover:text-orange-600 transition-colors">Settings</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-zinc-200/60 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <p>© 2025 ShopDash Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-orange-600 transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-orange-600 transition-colors">Terms of Service</a>
            <a href="#security" className="hover:text-orange-600 transition-colors">Security</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
