export interface SpaceFolderResponse {
  status: string
  msg: string
  data: SpaceFolder[]
}

export interface SpaceFolder {
  folderName: string
  folderId: number
}

export interface SpaceFileResponse {
  status: string
  msg: string
  data: {
    folderId: number
    folderName: string
    files: SpaceFile[]
  }
}

export interface SpaceFile {
  dataSourceId: number
  title: string
  createdAt: string
  summary: string
  sourceUrl: string
  imageUrl: string
  tags: string[]
  category: string
}
