import { SearchUser } from '@/entities/user'
import { Avatar } from '@/shared/ui'

interface Props {
  result: SearchUser
  onSelect: (userName: string) => void
}

const SearchResult = ({ result, onSelect }: Props) => {
  return (
    <li className="z-50 bg-white w-full mt-0.5 border border-gray-200 rounded-md shadow-lg">
      <button
        onClick={() => onSelect(result.name)}
        className="flex items-center gap-3 w-full p-3 hover:bg-gray-50 focus:outline-none focus:bg-gray-100 cursor-pointer">
        <Avatar
          alt={`${result.name} 프로필`}
          url={result.profileImageUrl}
        />
        <span className="flex-1 text-left font-medium">{result.name}</span>
        <span className="text-sm text-gray-500">선택</span>
      </button>
    </li>
  )
}
export default SearchResult
