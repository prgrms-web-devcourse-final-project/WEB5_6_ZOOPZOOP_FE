interface Props {
  provider: string
}

const ProviderInfo = ({ provider }: Props) => {
  return (
    <div>
      <label
        className="block text-sm font-medium text-gray-700 mb-2"
        htmlFor="email">
        소셜 공급자
      </label>
      <div className="flex flex-col gap-2">
        <div className="flex gap-3">
          <div className="flex gap-2 items-center flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm bg-gray-50 text-gray-500">
            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded border border-yellow-200">
              {provider}
            </span>
            소셜 로그인으로 연결됨
          </div>
        </div>
        <p className="text-xs text-gray-500 pl-1">
          소셜 로그인으로 연결된 이메일은 변경할 수 없습니다
        </p>
      </div>
    </div>
  )
}

export default ProviderInfo
