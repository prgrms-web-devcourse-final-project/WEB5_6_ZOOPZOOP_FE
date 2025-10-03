import { updateProfileImageServer } from '@/entities/user'
import { requireAuth } from '@/shared/lib/api-route'
import { NextResponse } from 'next/server'

export const PUT = async (request: Request) => {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const fileBuffer = await file.arrayBuffer()
    const blob = new Blob([fileBuffer], { type: file.type })
    const backendFormData = new FormData()
    backendFormData.append('file', blob, file.name)

    const response = await requireAuth(
      async token => await updateProfileImageServer(backendFormData, { token })
    )

    return NextResponse.json(response)
  } catch (error) {
    return NextResponse.json({
      status: 500,
      data: null,
      msg: error instanceof Error ? error.message : '요청 처리 중 오류 발생'
    })
  }
}
