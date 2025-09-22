import { LuSearch } from 'react-icons/lu'
import { MemberCard } from './MemberCard'

export const InviteMember = () => {
  return (
    <div className="flex flex-col gap-2.5 w-full">
      <label
        htmlFor="space-members"
        className="text-base font-bold">
        이메일 입력
      </label>
      <div className="relative">
        <input
          type="text"
          id="space-members"
          className="border border-light rounded-md py-3 px-3 text-base w-full"
          placeholder="이메일을 입력해 주세요"
        />
        <LuSearch
          className="text-normal cursor-pointer absolute right-3 top-1/2 -translate-y-1/2"
          size={24}
        />
      </div>
      <MemberCard />

      <button className="bg-green-normal w-full text-white rounded-md py-3 px-3 text-base">
        {/* 나중에 버튼 컴포넌트 나오면 추가해야함 */}
        생성
      </button>
    </div>
  )
}
