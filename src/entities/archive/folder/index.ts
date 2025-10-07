/* type ------------------------------------ */
export type { FolderData, CreateFolder } from './model/type'

/* api -------------------------------------*/
export {
  fetchArchiveFolderClient,
  postArchiveFolderClient,
  patchArchiveFolderClient,
  deleteArchiveFolderClient
} from './api/folder.client'

/* queries -------------------------------------*/
export {
  useGetArchiveFoldersQuery,
  usePostArchiveFolderQuery,
  useDeleteArchiveFolderQuery,
  useEditArchiveFolderNameQuery
} from './model/queries'
