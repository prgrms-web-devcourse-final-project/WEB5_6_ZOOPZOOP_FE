import { LuMessageCircle } from 'react-icons/lu'

export const FlowItemContainer = () => {
  return (
    <div className="w-[435px] h-[96px] flex-center gap-10 bg-[#F9FAFB] border border-gray-dark shadow-md rounded-md p-4 absolute bottom-6 right-[50%] translate-x-[50%]">
      <div className="flex flex-col items-center gap-1">
        <div className="flex-center w-12.5 h-12.5 bg-white border border-gray-light rounded-full">
          <LuMessageCircle className="text-gray-normal w-6 h-6" />
        </div>
        <p className="text-gray-dark text-sm font-medium">댓글</p>
      </div>
    </div>
  )
}
