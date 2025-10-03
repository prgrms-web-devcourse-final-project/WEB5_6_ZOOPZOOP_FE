import { tw } from '@/shared/lib'

interface Props {
  provider: string
}

const providerConfig = {
  KAKAO: {
    badge: 'bg-yellow-100 text-yellow-800 border-yellow-200'
  },
  GOOGLE: {
    badge: 'bg-blue-100 text-blue-800 border-blue-200'
  }
} as const

const ProviderInfo = ({ provider }: Props) => {
  const config = providerConfig[provider as keyof typeof providerConfig]

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        소셜 공급자
      </label>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2 items-center px-3 py-2 border border-gray-300 rounded-md text-sm bg-gray-50 text-gray-500">
          <span
            className={tw(
              'px-2 py-1 text-xs font-medium rounded border',
              config.badge
            )}>
            {provider}
          </span>
          소셜 로그인으로 연결됨
        </div>
        <p className="text-xs text-gray-500 pl-1">
          소셜 로그인으로 연결된 이메일은 변경할 수 없습니다
        </p>
      </div>
    </div>
  )
}

export default ProviderInfo
