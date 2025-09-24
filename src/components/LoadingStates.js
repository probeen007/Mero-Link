// src/components/LoadingStates.js
// Beautiful loading states and skeleton screens

export const PageSkeleton = () => (
  <div className="min-h-screen bg-gray-50 animate-pulse">
    {/* Header skeleton */}
    <div className="h-20 bg-gray-200 mb-4"></div>
    
    {/* Profile section skeleton */}
    <div className="max-w-md mx-auto p-6">
      <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4"></div>
      <div className="h-6 bg-gray-300 rounded mb-2 w-3/4 mx-auto"></div>
      <div className="h-4 bg-gray-300 rounded mb-4 w-1/2 mx-auto"></div>
      
      {/* Links skeleton */}
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-12 bg-gray-300 rounded-lg"></div>
        ))}
      </div>
    </div>
  </div>
);

export const DashboardSkeleton = () => (
  <div className="p-6 animate-pulse">
    {/* Page title */}
    <div className="h-8 bg-gray-200 rounded mb-6 w-1/3"></div>
    
    {/* Stats cards */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="bg-white p-6 rounded-lg shadow">
          <div className="h-4 bg-gray-200 rounded mb-2 w-1/2"></div>
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
        </div>
      ))}
    </div>
    
    {/* Form sections */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="h-6 bg-gray-200 rounded mb-4 w-1/4"></div>
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i}>
              <div className="h-4 bg-gray-200 rounded mb-2 w-1/3"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="h-6 bg-gray-200 rounded mb-4 w-1/4"></div>
        <div className="space-y-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export const AnalyticsSkeleton = () => (
  <div className="p-6 animate-pulse">
    <div className="h-8 bg-gray-200 rounded mb-6 w-1/4"></div>
    
    {/* Chart skeleton */}
    <div className="bg-white p-6 rounded-lg shadow mb-6">
      <div className="h-6 bg-gray-200 rounded mb-4 w-1/3"></div>
      <div className="h-64 bg-gray-200 rounded"></div>
    </div>
    
    {/* Table skeleton */}
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="h-12 bg-gray-200"></div>
      {[...Array(8)].map((_, i) => (
        <div key={i} className="h-12 bg-gray-100 border-b border-gray-200"></div>
      ))}
    </div>
  </div>
);

export const LoadingSpinner = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  return (
    <div className={`inline-block animate-spin rounded-full border-2 border-gray-300 border-t-blue-600 ${sizeClasses[size]} ${className}`}></div>
  );
};

export const LoadingButton = ({ children, loading, disabled, ...props }) => (
  <button
    disabled={disabled || loading}
    className={`inline-flex items-center justify-center gap-2 px-4 py-2 rounded font-medium transition-all
      ${loading || disabled 
        ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
        : 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800'
      }`}
    {...props}
  >
    {loading && <LoadingSpinner size="sm" />}
    {children}
  </button>
);

export const ProgressBar = ({ progress, className = '' }) => (
  <div className={`w-full bg-gray-200 rounded-full h-2 ${className}`}>
    <div 
      className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
      style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
    ></div>
  </div>
);

export const CardSkeleton = ({ lines = 3 }) => (
  <div className="bg-white p-6 rounded-lg shadow animate-pulse">
    <div className="h-4 bg-gray-200 rounded mb-4 w-3/4"></div>
    {[...Array(lines)].map((_, i) => (
      <div key={i} className="h-3 bg-gray-200 rounded mb-2 w-full"></div>
    ))}
  </div>
);

// General loading skeleton for layout fallbacks
export const LoadingSkeleton = () => (
  <div className="min-h-screen bg-gray-50 animate-pulse">
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="h-8 bg-gray-200 rounded mb-6 w-1/4"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    </div>
  </div>
);