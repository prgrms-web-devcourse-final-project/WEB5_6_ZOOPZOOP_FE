export type CheckedFile = {
  folderId: number
  fileId: number[]
}

export type OneFileMove = {
  dataSourceId: number
  folderId: number
}
export type ManyFileMove = {
  dataSourceId: number[]
  folderId: number
}

export type SelectedFile = {
  folderId: number
  folderName: string
  files: { fileId: number; fileName: string }[]
}
