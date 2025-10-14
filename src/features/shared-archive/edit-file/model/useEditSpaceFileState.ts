import { EditFileWithoutImgRequest } from '@/entities/archive/file'
import { useSpaceStore } from '@/entities/space'
import { useRef, useState } from 'react'

export const useEditSpaceFileState = (fileData: EditFileWithoutImgRequest) => {
  const {
    title,
    source,
    sourceUrl,
    summary,
    dataSourceId,
    tags,
    category,
    imageUrl
  } = fileData
  const { currentSpace } = useSpaceStore()
  const spaceId = currentSpace!.spaceId

  const [newTitle, setNewTitle] = useState(title || '')
  const [newSourceUrl, setNewSourceUrl] = useState(sourceUrl || '')
  const [newSource, setNewSource] = useState(source || '')
  const [newCategory, setNewCategory] = useState<string>(category || '')

  const initialTags = tags?.map(tag => `#${tag}`).join(' ') || ''
  const [newTags, setNewTags] = useState(initialTags || '')
  const [newSummary, setNewSummary] = useState(summary || '')

  const [previewUrl, setPreviewUrl] = useState(imageUrl || '')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  return {
    spaceId,
    dataSourceId,
    newTitle,
    newSourceUrl,
    newSource,
    newCategory,
    newTags,
    newSummary,
    previewUrl,
    selectedFile,
    inputRef,
    setNewTitle,
    setNewSourceUrl,
    setNewSource,
    setNewCategory,
    setNewTags,
    setNewSummary,

    handleImageChange
  }
}
