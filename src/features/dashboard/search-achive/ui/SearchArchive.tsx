import { SearchBar } from '@/shared/ui/header'

interface Props {
  search: string
  setSearch: (search: string) => void
}

export const SearchArchive = ({ search, setSearch }: Props) => {
  return (
    <div className="w-full">
      <SearchBar
        className="!w-full"
        placeholder="자료 검색"
        value={search}
        onChange={setSearch}
      />
    </div>
  )
}
