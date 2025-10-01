export type FolderResponse = {
  status: string
  msg: string
  data: {
    folders: FolderData[]
  }
}

export type FolderPatchResponse = {
  status: string
  msg: string
  data: {
    folderName: string
  }
}

export interface FolderData {
  folderId: number
  folderName: string
}

export interface CreateFolder {
  folderName: string
}
