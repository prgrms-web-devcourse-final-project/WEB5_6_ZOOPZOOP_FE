import { APIResponse } from '@/shared/types'

interface Results {
  results: {
    dataSourceId: string
  }[]
}

export type PostCopyToSpaceResponse = APIResponse<Results>
