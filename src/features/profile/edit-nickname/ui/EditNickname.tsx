'use client'

import { Loader2 } from 'lucide-react'
import { useUpdateNickname } from '../model/useEditNickname'

interface Props {
  nickname: string
}

const EditNickname = ({ nickname }: Props) => {
  const { newNickname, isDisabled, onChange, onEditNickname, isUpdating } =
    useUpdateNickname(nickname)

  return (
    <div>
      <label
        className="block text-sm font-medium text-gray-700 mb-2"
        htmlFor="nickname">
        닉네임
      </label>
      <div className="flex gap-3">
        <input
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-accent focus:border-orange-accent"
          id="nickname"
          placeholder="닉네임을 입력하세요"
          value={newNickname.split('#')[0]}
          onChange={onChange}
        />
        <button
          className={`px-4 py-2 border text-sm font-medium rounded-md transition-colors duration-200 ${
            isDisabled
              ? 'border-gray-200 text-gray-400 cursor-not-allowed'
              : 'border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer'
          }`}
          type="button"
          onClick={onEditNickname}
          disabled={isDisabled}>
          {isUpdating ? (
            <div className="flex-center gap-2">
              <Loader2
                className="animate-spin"
                size={16}
              />
              변경 중
            </div>
          ) : (
            '변경'
          )}
        </button>
      </div>
    </div>
  )
}
export default EditNickname
