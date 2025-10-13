import { updateThumbnailServer } from '@/entities/thumbnail'
import { requireAuth } from '@/shared/lib/api-route'
import { NextResponse } from 'next/server'

export const PUT = async (
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  const { id } = await params
  const form = await request.formData()
  const file = form.get('image')

  if (!(file instanceof File)) {
    return NextResponse.json({
      status: 400,
      data: null,
      msg: 'image 파일 누락'
    })
  }

  const res = await requireAuth(token =>
    updateThumbnailServer({ spaceId: Number(id), thumbnail: file }, { token })
  )
  return NextResponse.json(res)
}
