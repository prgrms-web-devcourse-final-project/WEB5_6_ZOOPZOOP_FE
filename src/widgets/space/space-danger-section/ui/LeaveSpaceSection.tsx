import { LeaveSpace } from '@/features/space'

const LeaveSpaceSection = () => {
  return (
    <div className="flex items-center justify-between border-b-2">
      {/* 스페이스 나가기 */}
      <div className="mb-3">
        <h3 className="text-sm font-semibold text-gray-900 mb-1">
          스페이스 나가기
        </h3>
        <p className="text-sm text-gray-600">
          이 스페이스에서 나가면 더 이상 접근할 수 없습니다. 다시 참여하려면
          초대를 받아야 합니다.
        </p>
      </div>
      {/* 스페이스 나가기 버튼 */}
      <LeaveSpace />
    </div>
  )
}
export default LeaveSpaceSection
