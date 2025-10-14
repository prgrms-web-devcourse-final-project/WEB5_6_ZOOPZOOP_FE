import { httpClient } from '@/shared/lib'
import { NextFetchOptions } from '@/shared/types'
import { UpdateThumbnailResponse } from '../model/type'

export const updateThumbnailServer = async (
  payload: { spaceId: number; thumbnail: Blob | File },
  options: NextFetchOptions
): Promise<UpdateThumbnailResponse> => {
  const form = new FormData()
  form.append('image', payload.thumbnail)

  return await httpClient.put(
    `/api/v1/space/thumbnail/${payload.spaceId}`,
    form,
    options
  )
}
