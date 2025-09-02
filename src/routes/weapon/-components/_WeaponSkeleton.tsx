import { Skeleton } from '@/components/ui/skeleton'

const SearchFilterSkeleton = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-4">
      <DarkSkeleton className="w-full lg:w-1/2 h-12 rounded-lg" />
      <DarkSkeleton className="w-full lg:w-1/2 h-12 rounded-lg" />
    </div>
  )
}
const DarkSkeleton = ({ className = '', ...props }) => (
  <Skeleton
    className={`!bg-slate-950/90 dark:!bg-slate-950/90 ${className}`}
    {...props}
  />
)

const WeaponCardSkeleton = () => {
  return (
    <div className="bg-slate-900/90 dark:bg-slate-950/90 rounded-lg p-4 h-full">
      <DarkSkeleton className="w-full h-48 rounded-lg mb-4" />
    </div>
  )
}

const DetailedWeaponSkeleton = () => {
  return (
    <div className="bg-slate-900/90 dark:bg-slate-950/90 rounded-lg p-4 h-full">
      <DarkSkeleton className="w-full h-48 rounded-lg mb-4" />
    </div>
  )
}

const WeaponSkeleton = ({ showDetailedView = false, itemCount = 15 }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header skeleton */}
        <div className="text-center mb-8">
          <DarkSkeleton className="h-12 w-80 rounded mx-auto mb-4" />
          <DarkSkeleton className="h-6 w-96 rounded mx-auto" />
        </div>

        {/* Search and filters skeleton */}
        <SearchFilterSkeleton />

        {/* Results count skeleton */}
        <div className="mb-6">
          <DarkSkeleton className="h-4 w-48 rounded my-5" />
        </div>

        {/* Weapons grid skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-8">
          {Array.from({ length: itemCount }).map((_, index) => (
            <WeaponCardSkeleton key={index} />
          ))}
        </div>

        {/* Detailed view skeleton (optional) */}
        {showDetailedView && <DetailedWeaponSkeleton />}

        {/* Action buttons skeleton */}
        <div className="flex justify-center space-x-4">
          <DarkSkeleton className="h-12 w-32 rounded-lg" />
          <DarkSkeleton className="h-12 w-36 rounded-lg" />
        </div>
      </div>
    </div>
  )
}

export default WeaponSkeleton
