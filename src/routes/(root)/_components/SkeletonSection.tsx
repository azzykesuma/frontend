import { Skeleton } from '@/components/ui/skeleton'

export const ClassSelectionSkeleton = ({ showDetailedView = false }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header skeleton */}
        <div className="text-center mb-12">
          <Skeleton className="h-12 w-80 rounded mx-auto mb-4 bg-slate-700" />
          <Skeleton className="h-6 w-96 rounded mx-auto bg-slate-600" />
        </div>

        {/* Class Grid skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
          {[...Array(5)].map((_, index) => (
            <Skeleton
              key={index}
              className="w-full h-48 rounded-lg bg-slate-800/80"
            />
          ))}
        </div>

        {/* Detailed view skeleton (optional) */}
        {showDetailedView && (
          <div className="backdrop-blur-xl bg-black/30 border border-slate-700 rounded-2xl p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <Skeleton className="w-20 h-20 rounded-full bg-slate-700" />
                <div>
                  <Skeleton className="h-8 w-32 rounded mb-2 bg-slate-700/80" />
                  <Skeleton className="h-5 w-40 rounded bg-slate-600/80" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <Skeleton className="h-6 w-32 rounded mb-4 bg-slate-700/80" />
                <div className="space-y-3">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <Skeleton className="h-4 w-8 rounded bg-slate-600/80" />
                      <div className="flex items-center space-x-2 flex-1 ml-3">
                        <Skeleton className="flex-1 h-2 rounded-full bg-yellow-400/40" />
                        <Skeleton className="h-4 w-6 rounded bg-slate-700/80" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Skeleton className="h-6 w-40 rounded mb-4 bg-slate-700/80" />
                <div className="space-y-2 mb-6">
                  <Skeleton className="h-4 w-full rounded bg-slate-600/80" />
                  <Skeleton className="h-4 w-11/12 rounded bg-slate-700/80" />
                  <Skeleton className="h-4 w-10/12 rounded bg-slate-600/80" />
                  <Skeleton className="h-4 w-9/12 rounded bg-slate-700/80" />
                </div>

                <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-600">
                  <Skeleton className="h-5 w-28 rounded mb-2 bg-yellow-400/40" />
                  <div className="space-y-1">
                    {[...Array(3)].map((_, i) => (
                      <Skeleton
                        key={i}
                        className="h-4 w-11/12 rounded bg-slate-700/80"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action buttons skeleton */}
        <div className="flex justify-center space-x-4">
          <Skeleton className="h-12 w-32 rounded-lg bg-purple-700/60" />
          <Skeleton className="h-12 w-40 rounded-lg bg-cyan-700/60" />
        </div>
      </div>
    </div>
  )
}
