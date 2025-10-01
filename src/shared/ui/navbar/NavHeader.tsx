import { User } from '@/entities/user'
import Image from 'next/image'
import { tw } from '@/shared/lib'

interface Props {
  user: User | null

  isExpanded: boolean
  toggleNavbar: () => void
}

export default function NavHeader({ user, isExpanded, toggleNavbar }: Props) {
  return (
    <header className="mb-2 flex flex-col">
      {/* 로고 영역 */}
      {isExpanded ? (
        <Image
          src="https://zoopzoop-test-bucket.s3.ap-northeast-2.amazonaws.com/logo"
          alt="logo"
          width={100}
          height={40}
          className="mb-4 w-32 h-auto"
          priority
        />
      ) : (
        <button
          className="text-green-normal font-bold text-2xl text-center p-1 w-10 h-10 rounded-md border mx-auto mb-4 cursor-pointer"
          type="button"
          onClick={toggleNavbar}>
          쯉
        </button>
      )}

      {/* 사용자 프로필 영역 */}
      <div
        className={tw(
          'flex items-center gap-2 px-1 py-1',
          isExpanded && 'rounded-md bg-green-light px-3 py-2'
        )}>
        <div
          className={tw(
            'overflow-hidden rounded-full border-1',
            isExpanded ? 'w-7 h-7' : 'w-10 h-10 mx-auto'
          )}>
          <Image
            src={
              user
                ? user.profileUrl
                : 'https://zoopzoop-test-bucket.s3.ap-northeast-2.amazonaws.com/default-profile'
            }
            alt="user image"
            width={50}
            height={50}
            className="object-cover w-full h-full"
          />
        </div>

        {isExpanded && (
          <p className="text-base">
            {user ? user.name.split('#')[0] : '사용자'}
          </p>
        )}
      </div>
    </header>
  )
}
