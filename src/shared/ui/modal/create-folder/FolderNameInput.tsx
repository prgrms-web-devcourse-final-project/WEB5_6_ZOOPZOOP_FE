import { useState } from 'react'

interface FolderNameInputProps {
  value: string
  onChange: (value: string) => void
  onEnter?: () => void
  autoFocus?: boolean
}

export const FolderNameInput = ({
  value,
  onChange,
  onEnter,
  autoFocus
}: FolderNameInputProps) => {
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    // 특수문자 검사 (알파벳, 숫자, 공백, _ 만 허용)
    if (/[^a-zA-Z0-9_ ]/.test(newValue)) {
      setError('폴더 이름에 특수문자를 사용할 수 없습니다.')
    } else {
      setError('')
    }
    onChange(newValue)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !error && onEnter) onEnter()
  }

  return (
    <div className="w-full flex flex-col gap-2.5">
      <label
        htmlFor="folder-name"
        className="text-xl font-bold">
        폴더 이름
      </label>
      <input
        type="text"
        id="folder-name"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        autoFocus={autoFocus}
        className="border border-gray-300 rounded-lg py-3 px-4 text-base 
                     focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent
                     transition-all duration-200
                     placeholder:text-gray-400
                     disabled:bg-gray-50 disabled:cursor-not-allowed"
        placeholder="폴더 이름을 입력해 주세요"
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  )
}
