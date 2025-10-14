import { useEditArchiveFileQuery } from '@/entities/archive/file/model/queries'
import { useModalStore } from '@/shared/lib'

import { showSuccessToast } from '@/shared/ui/toast/Toast'

export type BadgeCategory =
  | '정치'
  | '경제'
  | '사회'
  | 'IT'
  | '과학'
  | '문화'
  | '스포츠'
  | '환경'
  | '역사'
  | '세계'

export const useEditFileAction = () => {
  const closeModal = useModalStore(s => s.closeModal)
  const { editFileWithoutImg, editFileWithImg } = useEditArchiveFileQuery()
  const handleEdit = ({
    newTags,
    selectedFile,
    dataSourceId,
    newTitle,
    newCategory,
    newSummary,
    newSourceUrl,
    newSource,
    previewUrl
  }: {
    newTags: string
    selectedFile: File | null
    dataSourceId: number
    newTitle: string
    newCategory: string
    newSummary: string
    newSourceUrl: string
    newSource: string
    previewUrl: string
  }) => {
    // # 붙은 태그 문자열을 배열로 변환
    const tagsArray: string[] = newTags
      ? newTags
          .split(' ')
          .map(tag => tag.trim())
          .filter(tag => tag.startsWith('#')) // '#' 붙은 것만
          .map(tag => tag.slice(1))
      : [] // '#' 제거

    if (selectedFile) {
      editFileWithImg.mutate(
        {
          dataSourceId: dataSourceId,
          payload: {
            title: newTitle ?? '',
            category: newCategory as BadgeCategory,
            summary: newSummary ?? '',
            sourceUrl: newSourceUrl ?? '',
            source: newSource ?? '',
            tags: tagsArray ?? []
          },
          image: selectedFile
        },
        {
          onSuccess: () => {
            showSuccessToast('수정 완료')
            closeModal()
          }
        }
      )
    } else {
      editFileWithoutImg.mutate(
        {
          dataSourceId,
          title: newTitle ?? '',
          category: newCategory as BadgeCategory,
          summary: newSummary ?? '',
          sourceUrl: newSourceUrl ?? '',
          source: newSource ?? '',
          tags: tagsArray ?? [],
          imageUrl: previewUrl
        },
        {
          onSuccess: () => {
            showSuccessToast('수정 완료')
            closeModal()
          }
        }
      )
    }
  }
  return {
    handleEdit,
    isPending: editFileWithImg?.isPending || editFileWithoutImg.isPending
  }
}
