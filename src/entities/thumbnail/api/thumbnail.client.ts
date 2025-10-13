import { httpClient } from '@/shared/lib'

export const updateThumbnailClient = async (
  spaceId: number,
  file: Blob | File
) => {
  const form = new FormData()
  const f =
    file instanceof File
      ? file
      : new File([file], 'flow.png', { type: 'image/png' })
  form.append('image', f)

  return await httpClient.put(`/api/thumbnail/${spaceId}`, form)
}
