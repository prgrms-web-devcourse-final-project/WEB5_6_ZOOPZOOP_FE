const NotificationSkeletonList = () => (
  <>
    {Array.from({ length: 3 }).map((_, idx) => (
      <div
        key={idx}
        className="flex items-center space-x-3 py-3 animate-pulse">
        <div className="w-10 h-10 bg-slate-200 rounded-full" />
        <div className="flex-1 space-y-2">
          <div className="h-3 bg-slate-200 rounded w-3/4" />
          <div className="h-3 bg-slate-200 rounded w-1/2" />
        </div>
      </div>
    ))}
  </>
)
export default NotificationSkeletonList
