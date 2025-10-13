import { SearchUser } from '@/entities/user'
import SearchResult from './SearchResult'

interface Props {
  results: SearchUser[]
  searchTerm: string
  isSearching: boolean
  onSelect: (userName: string) => void
}

const SearchResultList = ({
  results,
  searchTerm,
  isSearching,
  onSelect
}: Props) => {
  return (
    <div className="absolute top-full left-0 w-full z-50 bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto">
      {isSearching && (
        <div className="flex items-center justify-center gap-2 py-4 text-sm text-gray-600">
          검색 중...
        </div>
      )}
      {!isSearching && results.length === 0 && searchTerm.length > 0 && (
        <div className="flex items-center justify-center py-4 text-sm text-gray-500">
          &quot;{searchTerm}&quot; 검색 결과가 없습니다
        </div>
      )}
      <ul>
        {results.map(user => (
          <SearchResult
            key={user.id}
            result={user}
            onSelect={onSelect}
          />
        ))}
      </ul>
    </div>
  )
}

export default SearchResultList
