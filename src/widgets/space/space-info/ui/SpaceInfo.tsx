import { EditSpaceName } from '@/features/space'

const SpaceInfo = () => {
  return (
    <section className="flex justify-start flex-col gap-1 w-full ">
      {/* 스페이스 이름 변경 섹션 */}
      <div>
        <h2 className="text-xl font-bold mb-4">스페이스 멤버 관리</h2>
        <div className="max-w-[400px]">
          <EditSpaceName />
        </div>
      </div>
    </section>
  )
}
export default SpaceInfo
