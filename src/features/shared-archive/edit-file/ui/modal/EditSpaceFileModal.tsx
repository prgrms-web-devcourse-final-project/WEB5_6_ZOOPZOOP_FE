import { EditFileWithoutImgRequest } from '@/entities/archive/file'
import { useEditArchiveFileQuery } from '@/entities/archive/file/model/queries'
import { useEditSpaceFileQuery } from '@/entities/shared-archive/model/queries'
import { useSpaceStore } from '@/entities/space'
import { useModalStore } from '@/shared/lib'
import { ModalLayout } from '@/shared/ui'
import { BadgeCategory } from '@/shared/ui/badge/Badge'
import { FolderActionButtons } from '@/shared/ui/modal/create-folder/FolderActionButtons'
import { showSuccessToast } from '@/shared/ui/toast/Toast'
import { Camera } from 'lucide-react'
import Image from 'next/image'
import { useRef, useState } from 'react'

interface Props {
  fileData: EditFileWithoutImgRequest
}

const categories: BadgeCategory[] = [
  'POLITICS',
  'ECONOMY',
  'SOCIETY',
  'IT',
  'SCIENCE',
  'CULTURE',
  'SPORTS',
  'ENVIRONMENT',
  'HISTORY',
  'WORLD'
]

function EditSpaceFileModal({ fileData }: Props) {
  const closeModal = useModalStore(s => s.closeModal)
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

  const { editFileWithoutImg, editFileWithImg } = useEditSpaceFileQuery()
  const handleEdit = () => {
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
          spaceId: spaceId,
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
          spaceId: spaceId,
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
  return (
    <ModalLayout size="lg">
      <div className="flex flex-col w-full gap-3 max-h-[80vh] overflow-y-auto">
        <h1 className="text-2xl font-bold text-center">파일 수정</h1>

        <ul className="flex flex-col gap-4">
          <li>
            <p className="font-bold ">사진</p>
            <div className="flex flex-col items-center gap-4">
              <div className="w-full rounded overflow-hidden flex justify-center">
                <Image
                  src={
                    String(previewUrl) ??
                    'https://zoopzoop-test-bucket.s3.ap-northeast-2.amazonaws.com/default-profile'
                  }
                  alt={category}
                  width={500}
                  height={250}
                  className="object-cover rounded border "
                />
              </div>

              {/* 숨긴 실제 input */}
              <input
                ref={inputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/jpg"
                id="fileInput"
                className="hidden "
                onChange={handleImageChange}
              />
              <label
                htmlFor="fileInput"
                className="cursor-pointer px-4 py-2 rounded-md flex items-center gap-2 bg-gray-light-active hover:bg-orange-accent hover:text-white">
                <Camera className="w-6 h-6 " />
                <p>이미지 선택</p>
              </label>
            </div>
          </li>

          <li>
            <p className="font-bold  ">제목</p>
            <input
              className="p-2 text-gray-700 w-full rounded-sm border-2 focus:border-orange-500 focus:ring-0 focus:outline-none"
              type="text"
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              placeholder="제목을 입력해주세요"
            />
          </li>

          <li>
            <p className="font-bold  ">카테고리</p>
            <select
              value={newCategory}
              className="p-2  w-full border-2 rounded-sm focus:border-orange-500 focus:ring-0 focus:outline-none"
              onChange={e => setNewCategory(e.target.value)}>
              <option value="">카테고리 선택</option> {/* 초기 선택 */}
              {categories.map(cat => (
                <option
                  key={cat}
                  value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </li>
          <li>
            {/*  # 붙이고 입력 가능 */}
            <p className="font-bold ">태그</p>
            <input
              type="text"
              className="p-2 text-gray-700  w-full rounded-sm border-2  focus:border-orange-500 focus:ring-0 focus:outline-none"
              value={newTags}
              onChange={e => setNewTags(e.target.value)}
            />
          </li>
          <li>
            <p className="font-bold ">요약</p>
            <textarea
              className="p-2 text-gray-700  w-full  rounded-sm border-2 resize-none  focus:border-orange-500 focus:ring-0 focus:outline-none"
              value={newSummary}
              onChange={e => setNewSummary(e.target.value)}
              placeholder="요약을 입력해주세요"
            />
          </li>
          <li>
            <p className="font-bold ">출처 URL</p>
            <input
              className="p-2 text-gray-700  w-full rounded-sm border-2  focus:border-orange-500 focus:ring-0 focus:outline-none"
              type="text"
              value={newSourceUrl}
              onChange={e => setNewSourceUrl(e.target.value)}
              placeholder="출처URL을 입력해주세요"
            />
          </li>
          <li>
            <p className="font-bold ">출처</p>
            <input
              className="p-2 text-gray-700  w-full rounded-sm border-2 focus:border-orange-500 focus:ring-0 focus:outline-none"
              type="text"
              value={newSource}
              placeholder="출처URL를 입력해주세요"
              onChange={e => setNewSource(e.target.value)}
            />
          </li>
        </ul>
        <FolderActionButtons
          onCancel={closeModal}
          onCreate={handleEdit}
          isCreating={false}
          label={'수정'}
          disabled={false}
        />
      </div>
    </ModalLayout>
  )
}
export default EditSpaceFileModal
