import { SearchBar } from '@/shared/ui/header'

export const SearchArchive = () => {
  return (
    <div className="w-full">
      <SearchBar
        className="!w-full"
        placeholder="자료 검색"
        value=""
        onChange={() => {}}
        onEnter={() => {}}
      />
    </div>
  )
}
