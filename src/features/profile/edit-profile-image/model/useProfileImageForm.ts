import { useRef, useState } from 'react'
import { useProfileImageMutation } from '../api/useProfileImageMutation'

export const useProfileImageForm = (profileUrl: string) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  // 파생 상태
  const isChanged = previewUrl !== null
  const displayUrl = previewUrl || profileUrl

  const { mutate, isPending } = useProfileImageMutation({
    onSuccess: () => {
      setPreviewUrl(null)
      setSelectedFile(null)
    },
    onError: () => {
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

    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }

  return {
    onSelect: handleImageSelect,
    onUpload: handleUpload,
    handleCancel,
    inputRef,
    isUploading: isPending,
    displayUrl,
    isChanged
  }
}
