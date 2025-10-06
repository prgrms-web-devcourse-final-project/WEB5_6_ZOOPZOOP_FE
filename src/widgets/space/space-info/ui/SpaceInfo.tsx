import LeaveSpaceSection from './LeaveSpaceSection'
import DeleteSpaceSection from './DeleteSpaceSection'
import { EditSpaceName } from '@/features/space'

const SpaceInfo = () => {
  return (
    <section className="flex justify-start flex-col gap-1 w-full max-w-[1200px]">
      {/* 스페이스 이름 변경 섹션 */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          스페이스 설정
        </h2>
        <div className="max-w-[400px]">
          <EditSpaceName />
        </div>
      </div>

      <div
        aria-labelledby="profile-info"
        className="mt-8">
        <h3
          id="profile-info"
          className="text-lg font-semibold mb-4">
          DANGER ZONE
        </h3>
        <div className="bg-white border border-red-200 rounded-lg">
          <div className="px-6 py-4 border-b border-red-200 bg-red-50 rounded-t-lg">
            <p className="text-sm text-red-700 mt-1">
              신중하게 검토가 필요한 작업입니다
            </p>
          </div>

          <div className="flex flex-col gap-3 px-6 py-4">
            <LeaveSpaceSection />
            <DeleteSpaceSection />
          </div>
        </div>
      </div>
    </section>
  )
}
export default SpaceInfo
