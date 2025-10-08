const NotificationSkeletonList = () => (
  <>
    {Array.from({ length: 2 }).map((_, idx) => (
      <li
        className="px-4 py-2"
        key={idx}>
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-full bg-slate-200 animate-pulse flex-shrink-0" />

          <div className="flex-1 min-w-0 space-y-1.5">
            <div className="h-3 bg-slate-200 rounded animate-pulse w-3/4" />
          </div>
          <div className="flex gap-1 flex-shrink-0">
            <div className="w-6 h-6 rounded bg-slate-200 animate-pulse" />
            <div className="w-6 h-6 rounded bg-slate-200 animate-pulse" />
          </div>
        </div>
      </li>
    ))}
  </>
)
export default NotificationSkeletonList
