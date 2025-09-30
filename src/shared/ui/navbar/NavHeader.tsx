import { User } from '@/entities/user'
import Image from 'next/image'
import { tw } from '@/shared/lib'

interface Props {
  user: User | null
  isDashboard: boolean
}

export default function NavHeader({ user, isDashboard }: Props) {
  return (
    <header className="mb-2">
      <Image
        src="/zoopzoop.png"
        alt="logo"
        width={100}
        height={40}
        className={tw('mb-4 hidden', !isDashboard && 'block')}></Image>
      <h1
        className={tw(
          'text-green-normal font-bold text-2xl text-center p-1 w-10 h-10 rounded-md border',
          !isDashboard && 'hidden'
        )}>
        쯉
      </h1>
      <div
        className={tw(
          'flex items-center gap-2 px-1 py-1',
          !isDashboard && 'rounded-md bg-green-light px-3 py-2'
        )}>
        <div className="w-7 h-7 overflow-hidden rounded-full border-1">
          <Image
            src={user ? user.profileUrl : '/zoopzoop.png'}
            alt="user image"
            width={30}
            height={30}
            className="object-cover w-full h-full"
          />
        </div>
        <p className={tw('text-base hidden ', !isDashboard && 'block')}>
          {user ? user.name : '사용자'}
        </p>
      </div>
    </header>
  )
}
