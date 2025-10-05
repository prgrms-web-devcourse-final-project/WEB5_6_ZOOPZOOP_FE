const SpaceCardSkeleton = () => {
  return (
    <li className="flex flex-col border border-[#D9D9D9] rounded-lg min-w-52">
      {/* 스켈레톤 썸네일 */}
      <div className="w-full h-32 bg-gray-200 animate-pulse" />
      {/* 스켈레톤 본문 */}
      <div className="flex justify-between items-start gap-1 px-4 py-2 border-t">
        <div className="flex-1 min-w-0">
          {/* 제목 스켈레톤 */}
          <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse mb-1" />
          {/* 날짜 스켈레톤 */}
          <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    </li>
  )
}

export default SpaceCardSkeleton
