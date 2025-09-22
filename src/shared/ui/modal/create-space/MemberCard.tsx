import { LuCircleMinus } from 'react-icons/lu'

export const MemberCard = () => {
  return (
    <div className="w-full p-2.5 bg-light text-base text-normal rounded-md relative">
      zoopzoop@gmail.com
      <LuCircleMinus
        className="text-normal cursor-pointer absolute right-3 top-1/2 -translate-y-1/2"
        size={20}
      />
    </div>
  )
}
