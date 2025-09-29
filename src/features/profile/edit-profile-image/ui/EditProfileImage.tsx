'use client'

import { Camera, Loader2 } from 'lucide-react'
import Image from 'next/image'
import { useId } from 'react'
import { useEditProfileImage } from '../model/useEditProfileImage'

interface Props {
  profileUrl: string
}

const EditProfileImage = ({ profileUrl }: Props) => {
  const inputId = useId()
  const {
    displayUrl,
    handleCancel,
    isChanged,
    isUploading,
    onSelect,
    onUpload
  } = useEditProfileImage(profileUrl)

  return (
    <>
      <h3
        id="profile-image"
        className="sr-only">
        프로필 이미지
      </h3>
      <div className="flex justify-center flex-col gap-2">
        <label
          className="relative cursor-pointer group"
          htmlFor={inputId}>
          <Image
            src={displayUrl}
            alt="사용자 프로필 사진"
            width={300}
            height={300}
            priority
            className="object-cover rounded-full size-64 transition-opacity group-hover:opacity-75"
          />
          <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
            {isUploading ? (
              <Loader2 className="w-8 h-8 text-white animate-spin" />
            ) : (
              <Camera className="w-8 h-8 text-white" />
            )}
          </div>
          <input
            id={inputId}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/jpg"
            onChange={onSelect}
            disabled={isUploading}
            className="sr-only"
          />
        </label>

        <div className="flex gap-3 justify-center h-7">
          {isChanged && (
            <>
              <button
                type="button"
                onClick={handleCancel}
                disabled={isUploading}
                className="px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer">
                취소
              </button>
              <button
                type="button"
                onClick={onUpload}
                disabled={isUploading}
                className="px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer">
                {isUploading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    변경 중
                  </span>
                ) : (
                  '변경'
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </>
  )
}
export default EditProfileImage
