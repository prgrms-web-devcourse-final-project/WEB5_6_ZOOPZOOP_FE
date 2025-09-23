interface FolderNameInputProps {
  value: string
  onChange: (value: string) => void
}

export const FolderNameInput = ({ value, onChange }: FolderNameInputProps) => {
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
        className="border border-gray-light rounded-md py-3 px-3 text-base"
        placeholder="폴더 이름을 입력해 주세요"
      />
    </div>
  )
}
