import { SearchUser } from '@/entities/user'
import { Avatar } from '@/shared/ui'
import { Loader2 } from 'lucide-react'

interface Props {
  isSearching: boolean
  result?: SearchUser
  searchTerm: string
  onSelect: () => void
}

const SearchResult = ({ isSearching, result, searchTerm, onSelect }: Props) => {
  const hasNoResult = searchTerm.length > 0 && !isSearching && !result

  return (
    <div className="absolute z-50 bg-white w-full mt-0.5 border border-gray-200 rounded-md shadow-lg">
      {/* 검색 중 */}
      {isSearching && (
        <div className="flex items-center justify-center gap-2 py-4">
          <Loader2
            className="animate-spin"
            size={20}
          />
          <span className="text-sm text-gray-600">검색 중...</span>
        </div>
      )}
      {/* 검색 결과 */}
      {result && !isSearching && (
        <button
          onClick={onSelect}
          className="flex items-center gap-3 w-full p-3 hover:bg-gray-50 transition-colors">
          <Avatar
            alt={`${result.name} 프로필`}
            url={result.profileUrl}
          />
          <span className="flex-1 text-left font-medium">{result.name}</span>
          <span className="text-sm text-gray-500">선택</span>
        </button>
      )}
      {/* 검색 결과 없음 */}
      {hasNoResult && (
        <div className="py-4 px-3 text-center text-sm text-gray-500">
          &quot;{searchTerm}&quot; 검색 결과가 없습니다
        </div>
      )}
    </div>
  )
}
export default SearchResult

//    {(isSearching || searchResult) && (
//           <div className="absolute z-50 bg-white w-full mt-1 border border-gray-200 rounded-md shadow-lg">

//             {/* 검색 결과 */}
// {searchResult && !isSearching && (
//   <button
//     onClick={() => {}}
//     className="flex items-center gap-3 w-full p-3 hover:bg-gray-50 transition-colors">
//     <Avatar
//       alt={`${searchResult.name} 프로필`}
//       url={searchResult.profileUrl}
//     />
//     <span className="flex-1 text-left font-medium">
//       {searchResult.name}
//     </span>
//     <span className="text-sm text-gray-500">선택</span>
//   </button>
// )}

//             {/* 검색 결과 없음 */}
//   {hasNoResult && (
//     <div className="py-4 px-3 text-center text-sm text-gray-500">
//       &quot;{searchTerm}&quot; 검색 결과가 없습니다
//     </div>
//   )}
// </div>
//         )}
