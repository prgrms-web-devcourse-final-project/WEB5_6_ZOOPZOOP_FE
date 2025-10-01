/* type ------------------------------------ */
export type { FolderData } from './model/type'

/* api -------------------------------------*/
export {
  fetchArchiveFolderServer,
  postArchiveFolderServer
} from './api/folder.server'

export { postArchiveFolderClient } from './api/folder.client'
