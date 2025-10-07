export {
  fetchUserClient,
  updateNicknameClient,
  deleteAccountClient,
  updateProfileImageClient,
  fetchUserInfoByNameClient
} from './api/user.client'
export {
  fetchUserServer,
  updateNicknameServer,
  deleteAccountServer,
  updateProfileImageServer
} from './api/user.server'
export {
  useUserStore,
  useUserQuery,
  useUpdateProfileImageMutation,
  useFetchUserInfoByNicknameQuery,
  useUpdateNicknameMutation
} from './model'
export type * from './model'
