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
