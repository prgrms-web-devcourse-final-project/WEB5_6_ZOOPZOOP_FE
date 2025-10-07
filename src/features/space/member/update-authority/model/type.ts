import { Authority } from '@/shared/types'
import { AUTHORITY_LABELS } from './constant'

export type AuthorityLabel =
  (typeof AUTHORITY_LABELS)[keyof typeof AUTHORITY_LABELS]

export type AuthorityType = {
  role: Authority
  label: AuthorityLabel
  description: string
  permissions: string[]
}
