interface ProductSkeletonProps {
  count?: number
}

export default function ProductSkeleton({ count = 8 }: ProductSkeletonProps) {
  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-4 gap-3 sm:gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-2xl border border-zinc-100 p-3 sm:p-4 space-y-3 sm:space-y-4 animate-pulse shadow-xs"
        >
          <div className="w-full h-36 sm:h-44 bg-zinc-100 rounded-xl" />
          <div className="h-3.5 sm:h-4 bg-zinc-100 rounded-md w-1/3" />
          <div className="h-4 sm:h-5 bg-zinc-100 rounded-md w-3/4" />
          <div className="flex items-center justify-between pt-2">
            <div className="h-5 sm:h-6 bg-zinc-100 rounded-md w-1/4" />
            <div className="h-8 w-8 sm:h-9 sm:w-9 bg-zinc-100 rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  )
}
