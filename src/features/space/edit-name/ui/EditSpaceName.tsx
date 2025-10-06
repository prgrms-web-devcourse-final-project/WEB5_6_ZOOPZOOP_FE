'use client'

import { Loader2 } from 'lucide-react'
import { useEditSpaceName } from '../model/useEditSpaceName'

const EditSpaceName = () => {
  const { isUpdating, onChange, onSubmit, newName, isDisabled } =
    useEditSpaceName()
  return (
    <form onSubmit={onSubmit}>
      <label
        className="block text-sm font-medium text-gray-700 mb-2"
        htmlFor="nickname">
        스페이스 이름
      </label>
      <div className="flex gap-3">
        <input
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-accent focus:border-orange-accent"
          id="nickname"
          value={newName}
          onChange={onChange}
        />
        <button
          className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-md transition-colors duration-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
          type="submit"
          disabled={isUpdating || isDisabled}>
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
