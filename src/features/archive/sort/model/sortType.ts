export type SortKey = '이름' | '날짜'
export type SortDirection = 'asc' | 'desc'

export interface FileItem {
  name: string
  date: string
}

export interface GridData {
  id: number
  title: string
  category: string
  createAt: Date
  imageUrl: string
  sourceUrl: string
  ownerProfileUrl: string
  isSelected: boolean
}

export interface FolderData {
  id: number
  name: string
}
