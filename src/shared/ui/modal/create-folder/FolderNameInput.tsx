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
        onChange={e => onChange(e.target.value)}
        onKeyDown={e => {
          if (e.key === 'Enter' && onEnter) onEnter()
        }}
        autoFocus={autoFocus}
        className="border border-gray-300 rounded-lg py-3 px-4 text-base 
                     focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent
                     transition-all duration-200
                     placeholder:text-gray-400
                     disabled:bg-gray-50 disabled:cursor-not-allowed"
        placeholder="폴더 이름을 입력해 주세요"
      />
    </div>
  )
}
