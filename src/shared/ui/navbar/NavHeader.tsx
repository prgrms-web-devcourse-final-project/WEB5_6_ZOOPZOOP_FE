import Image from 'next/image'

interface Props {
  user: {
    username: string
    userProfile: string
  }
}

export default function NavHeader({ user }: Props) {
  return (
    <>
      <Image
        src="/zoopzoop.png"
        alt="logo"
        width={100}
        height={40}
        className="mb-2 hidden sm:block"
      />
      <h1 className="text-green-normal font-bold text-2xl text-center p-1 w-10 h-10 rounded-md border sm:hidden">
        쯉
      </h1>
      <li className="flex items-center gap-2 px-1 py-1 sm:rounded-md sm:bg-green-light sm:px-3 sm:py-2 ">
        <div className="w-7 h-7 overflow-hidden rounded-full border-1">
          <Image
            src={user.userProfile}
            alt="user image"
            width={30}
            height={30}
            className="object-cover w-full h-full"
          />
        </div>
        <p className="text-base hidden sm:block">
          안녕하세요. {user.username}님
        </p>
      </li>
    </>
  )
}
