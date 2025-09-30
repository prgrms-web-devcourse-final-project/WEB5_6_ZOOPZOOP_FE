export interface FolderResponse {
  status: string
  msg: string
  data: {
    folders: FolderData[]
  }
}

export interface FolderData {
  folderId: number
  folderName: string
}

export interface CreateFolder {
  folderName: string
}
