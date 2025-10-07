import DeleteSpaceSection from './DeleteSpaceSection'
import LeaveSpaceSection from './LeaveSpaceSection'

const SpaceDangerSection = () => {
  return (
    <section
      aria-labelledby="profile-info"
      className="w-full">
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
    </section>
  )
}
export default SpaceDangerSection
