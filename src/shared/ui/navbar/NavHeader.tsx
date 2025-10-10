import { User } from '@/entities/user'
import Image from 'next/image'
import { ChevronsLeft } from 'lucide-react'

interface Props {
  user: User | null
  slot: React.ReactNode
  isExpanded: boolean
  toggleNavbar: () => void
}

export default function NavHeader({
  user,
  isExpanded,
  slot,
  toggleNavbar
}: Props) {
  return (
    <header className="w-full mb-2 pb-2 flex flex-col border-b border-gray-100">
      {/* 로고 영역 */}
      <div className="h-10 mb-4 flex items-center justify-between">
        {isExpanded ? (
          <Image
            src="https://zoopzoop-test-bucket.s3.ap-northeast-2.amazonaws.com/logo"
            alt="logo"
            width={100}
            height={40}
            className="p-1 w-36"
            priority
          />
        ) : (
          <button
            className="text-green-normal font-bold text-2xl text-center p-1 w-10 h-10 rounded-md border cursor-pointer"
            type="button"
            onClick={toggleNavbar}>
            쯉
          </button>
        )}

        {isExpanded && (
          <button
            onClick={toggleNavbar}
            className="hover:bg-gray-100 rounded-sm p-1"
            aria-label="메뉴 닫기">
            <ChevronsLeft size={24} />
          </button>
        )}
      </div>
      {/* 사용자 프로필 영역 */}
      <div className="flex items-center overflow-hidden">
        <div className="size-9.5 flex-shrink-0">
          <Image
            src={
              user
                ? user.profileUrl
                : 'https://zoopzoop-test-bucket.s3.ap-northeast-2.amazonaws.com/default-profile'
            }
            alt="user image"
            width={50}
            height={50}
            className="object-cover w-full h-full rounded-full "
          />
        </div>

        {isExpanded && (
          <div className="flex justify-between items-center flex-1 pl-2">
            <p className="text-sm font-medium text-gray-700 truncate">
              {user?.name ?? '사용자'}
            </p>
            {slot}
          </div>
        )}
      </div>
    </header>
  )
}
