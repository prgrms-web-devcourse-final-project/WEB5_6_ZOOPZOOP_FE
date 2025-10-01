import { useArchiveFolders } from '@/entities/archive/folder/model/hook/useFolders'
import { useModalStore } from '@/shared/lib'
import { MoreVertical } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface Props {
  id: number
  folderName: string
  isClicked: boolean
  onClick: (id: number) => void
}

function ToggleButton({ id, folderName, isClicked, onClick }: Props) {
  const { deleteFolder } = useArchiveFolders()
  const router = useRouter()
  const openModal = useModalStore(s => s.openModal)

  const handleDelete = () => {
    deleteFolder.mutate(id, {
      onSuccess: () => {
        router.push('/archive')
      }
    })
  }

  return (
    <>
      <button
        type="button"
        className="text-gray-dark"
        onClick={e => {
          e.preventDefault()
          onClick(id)
        }}>
        <MoreVertical />
      </button>
      {isClicked && (
        <ul className="absolute left-60 shadow-lg bg-white border-1 rounded-sm z-10">
          <li>
            <button
              type="button"
              className="rounded-t-sm  px-4 py-2 hover:bg-orange-accent"
              onClick={() =>
                openModal({
                  type: 'rename-folder',
                  props: {
                    folderId: id,
                    folderName: folderName
                  }
                })
              }>
              수정하기
            </button>
          </li>
          <li>
            <button
              onClick={handleDelete}
              type="button"
              className=" rounded-b-sm px-4 py-2 hover:bg-orange-accent ">
              삭제하기
            </button>
          </li>
        </ul>
      )}
    </>
  )
}
export default ToggleButton
