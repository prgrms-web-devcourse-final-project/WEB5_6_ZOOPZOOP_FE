// 데이터 타입 정의
export type ArchiveColumnType = {
  id: string
  title: string
  category: string
  createdAt: string
  origin: string
}

export interface GridDataType {
  id: number
  title: string
  category: string
  createAt: Date
  imageUrl: string
  sourceUrl: string
  ownerProfileUrl: string
  isSelected: boolean
}

export interface FolderDataType {
  id: number
  name: string
}
