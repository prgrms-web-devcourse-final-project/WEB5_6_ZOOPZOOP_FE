const MemberTableSkeleton = () => {
  return (
    <section className="w-full">
      <h2 className="text-xl font-bold mb-4">스페이스 멤버 관리</h2>

      <div className="border border-gray-200 rounded-lg overflow-hidden">
        {/* 탭 스켈레톤 */}
        <div className="flex justify-between items-center px-6 py-4 bg-gray-50 border-b">
          <ul className="flex gap-5 text-sm">
            <li className="pb-1">
              <div className="h-5 w-24 bg-gray-200 rounded animate-pulse" />
            </li>
            <li className="pb-1">
              <div className="h-5 w-24 bg-gray-200 rounded animate-pulse" />
            </li>
          </ul>
          <div className="h-9 w-28 bg-gray-200 rounded animate-pulse" />
        </div>

        {/* 테이블 헤더 스켈레톤 */}
        <div className="bg-gray-50 border-b">
          <div className="flex px-6 py-2">
            <div className="flex-1 h-4 bg-gray-200 rounded animate-pulse mx-2" />
            <div className="flex-1 h-4 bg-gray-200 rounded animate-pulse mx-2" />
            <div className="flex-1 h-4 bg-gray-200 rounded animate-pulse mx-2" />
            <div className="flex-1 h-4 bg-gray-200 rounded animate-pulse mx-2" />
          </div>
        </div>

        {/* 테이블 행 스켈레톤 */}
        <div className="bg-white divide-y divide-gray-200">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="flex px-6 py-2">
              <div className="flex-1 h-4 bg-gray-100 rounded animate-pulse mx-2" />
              <div className="flex-1 h-4 bg-gray-100 rounded animate-pulse mx-2" />
              <div className="flex-1 h-4 bg-gray-100 rounded animate-pulse mx-2" />
              <div className="flex-1 h-4 bg-gray-100 rounded animate-pulse mx-2" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default MemberTableSkeleton
