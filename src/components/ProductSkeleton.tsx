interface ProductSkeletonProps {
  count?: number
}

export default function ProductSkeleton({ count = 8 }: ProductSkeletonProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-2xl border border-zinc-100 p-4 space-y-4 animate-pulse shadow-xs"
        >
          <div className="w-full h-44 bg-zinc-100 rounded-xl" />
          <div className="h-4 bg-zinc-100 rounded-md w-1/3" />
          <div className="h-5 bg-zinc-100 rounded-md w-3/4" />
          <div className="flex items-center justify-between pt-2">
            <div className="h-6 bg-zinc-100 rounded-md w-1/4" />
            <div className="h-9 w-9 bg-zinc-100 rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  )
}
