import { useFetchUserInfoByNicknameQuery } from '@/entities/user/model/queries'
import { useDebounce } from '@/shared/hooks/useDebounce'
import { useState } from 'react'

export const useSearchUserByNickname = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearchTerm = useDebounce(searchTerm, 500)
  const { data, isPending } = useFetchUserInfoByNicknameQuery(
    debouncedSearchTerm.trim()
  )

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const resetSearch = () => {
    setSearchTerm('')
  }
  return {
    searchTerm,
    handleInputChange,
    resetSearch,
    result: data,
    isSearching: isPending
  }
}
