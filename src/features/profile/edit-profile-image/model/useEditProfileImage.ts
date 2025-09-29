import { useState } from 'react'
import { useUploadProfileImage } from './useUploadProfileImage'

export const useEditProfileImage = (profileUrl: string) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  // 파생 상태
  const isChanged = previewUrl !== null
  const displayUrl = previewUrl || profileUrl

  // tanstack query
  const { mutate, isPending } = useUploadProfileImage({
    onSuccess: () => {
      // 업로드 성공 시 로직
      setPreviewUrl(null)
      setSelectedFile(null)
    },
    onError: () => {
      // 에러 처리
      alert('업로드에 실패했습니다.')
    }
  })

  // 업로드 핸들러
  const handleUpload = () => {
    if (!selectedFile) return
    mutate(selectedFile)
  }

  // 이미지 선택
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // 파일 크기 제한 (5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('파일 크기는 5MB 이하여야 합니다.')
      return
    }
    // 미리보기 생성
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string)
      setSelectedFile(file)
    }
    reader.readAsDataURL(file)
  }
  // 선택 이미지 취소
  const handleCancel = () => {
    setPreviewUrl(null)
    setSelectedFile(null)
  }

  return {
    onSelect: handleImageSelect,
    displayUrl,
    handleCancel,
    isChanged,
    isUploading: isPending,
    onUpload: handleUpload
  }
}
