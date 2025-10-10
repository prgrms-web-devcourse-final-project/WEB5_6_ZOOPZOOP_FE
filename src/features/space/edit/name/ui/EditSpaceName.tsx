'use client'

import { Loader2 } from 'lucide-react'
import { useEditSpaceName } from '../model/useEditSpaceName'
import { useSpaceStore } from '@/entities/space'
import { AUTHORITIES } from '@/shared/constants'

const EditSpaceName = () => {
  const currentSpace = useSpaceStore(state => state.currentSpace)
  const { isUpdating, onChange, onSubmit, newName, isDisabled } =
    useEditSpaceName()

  const isOwner = currentSpace?.userAuthority === AUTHORITIES.ADMIN

  return (
    <form onSubmit={onSubmit}>
      <label
        className="sm:flex sm:gap-1 sm:items-end block text-sm font-medium text-gray-700 mb-2"
        htmlFor="nickname">
        <span className="mr-1">스페이스 이름</span>
        <span className="text-xs text-gray-500">
          <span className="text-red-400">*</span>해당 스페이스의 Owner만 수정이
          가능합니다.
        </span>
      </label>
      <div className="flex gap-3">
        <input
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-accent focus:border-orange-accent"
          id="nickname"
          value={newName}
          onChange={onChange}
          disabled={!isOwner}
        />
        <button
          className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-md transition-colors duration-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
          type="submit"
          disabled={isUpdating || isDisabled || !isOwner}>
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
    </form>
  )
}
export default EditSpaceName
