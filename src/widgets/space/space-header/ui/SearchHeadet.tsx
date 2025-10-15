import { useModalStore } from '@/shared/lib'
import { SearchBar } from '@/shared/ui/header'
import ActionButton from '@/shared/ui/header/ActionButton'
import { ChevronLeft, Upload } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Dispatch, SetStateAction } from 'react'

interface Props {
  query: string
  spaceName?: string
  placeholder: string
  setQuery: Dispatch<SetStateAction<string>>
  handleSearchInArchive: () => void
}

function SearchHeader({
  query,
  spaceName,
  placeholder,
  setQuery,
  handleSearchInArchive
}: Props) {
  const router = useRouter()
  const openModal = useModalStore(s => s.openModal)
  return (
    <header className="bg-gray-dark-active px-6 pb-5 py-1 w-full">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-1 p-2 rounded-lg hover:bg-gray-600  cursor-pointer transition-colors mb-2">
        <ChevronLeft
          className="text-white"
          size={20}
        />
        <p className="text-white text-sm">뒤로 가기</p>
      </button>

      <h1 className="text-white font-bold text-2xl mb-7">{spaceName}</h1>
      <div className="flex justify-between">
        <SearchBar
          placeholder={placeholder}
          value={query}
          onChange={setQuery}
          onEnter={handleSearchInArchive}
        />
        <div className="flex gap-3">
          <ActionButton
            label="파일 불러오기"
            icon={Upload}
            onClick={() => {
              openModal({ type: 'import-to-space-file' })
            }}
          />
        </div>
      </div>
    </header>
  )
}
export default SearchHeader
