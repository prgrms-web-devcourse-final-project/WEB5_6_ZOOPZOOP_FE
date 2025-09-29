'use client'

import { useUserStore } from '@/entities/user'
import Image from 'next/image'
import { EditNickname } from '@/features/profile/edit-nickname'
import JoinDateInfo from './JoinDateInfo'
import ProviderInfo from './ProviderInfo'

const ProfileHeader = () => {
  const user = useUserStore(state => state.user)

  const displayName = user?.name.split('#')[0] ?? '사용자 닉네임'

  return (
    <section className="flex justify-center flex-col md:flex-row sm:justify-start gap-10 w-full">
      <h3
        id="profile-image"
        className="sr-only">
        프로필 이미지
      </h3>
      <div className="flex justify-center">
        <Image
          src={user ? user.profileUrl : '/profile.jpeg'}
          alt="사용자 프로필 사진"
          width={300}
          height={300}
          priority
          className="object-cover rounded-full overflow-hidden size-64"
        />
      </div>
      <div className="flex-1">
        {user ? (
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="px-6 py-4 space-y-6">
              {/* 유저 닉네임 */}
              <EditNickname nickname={displayName} />
              {/* provider 타입 */}
              <ProviderInfo provider={user.provider} />
              {/* 가입일 */}
              <JoinDateInfo />
            </div>
          </div>
        ) : (
          <div className="bg-gray-100 rounded-lg p-6">
            사용자 정보를 불러오는 중...
          </div>
        )}
      </div>
    </section>
  )
}
export default ProfileHeader
