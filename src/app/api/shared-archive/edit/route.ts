import { editSpaceFileWithImgServer } from '@/entities/shared-archive/api/file.server'
import { requireAuth } from '@/shared/lib/api-route'
import { NextResponse } from 'next/server'

export const PATCH = async (request: Request) => {
  const { searchParams } = new URL(request.url)
  try {
    const dataSourceId = Number(searchParams.get('dataSourceId'))
    const spaceId = Number(searchParams.get('spaceId'))

    if (!dataSourceId || !spaceId) throw new Error('dataSourceId 누락')

    // 1. multipart/form-data 파싱
    const formData = await request.formData()

    // 2. payload(JSON) 추출
    const payloadBlob = formData.get('payload')
    if (!(payloadBlob instanceof Blob)) throw new Error('payload가 없음')
    const payload = JSON.parse(await payloadBlob.text())

    // 3. 이미지 파일 추출
    const imgFile = formData.get('image') as File
    const fileBuffer = await imgFile.arrayBuffer()
    const fileBlob = new Blob([fileBuffer], { type: imgFile.type })

    //백엔드 전송용 FormData 구성
    const backendFormData = new FormData()
    backendFormData.append(
      'payload',
      new Blob([JSON.stringify(payload)], { type: 'application/json' })
    )
    backendFormData.append('image', fileBlob, imgFile.name)

    const response = await requireAuth(async token =>
      editSpaceFileWithImgServer(spaceId, dataSourceId, backendFormData, {
        token
      })
    )

    return NextResponse.json(response)
  } catch (error) {
    return NextResponse.json(
      {
        status: 500,
        data: null,
        msg: error instanceof Error ? error.message : '요청 처리 중 오류 발생'
      },
      { status: 500 }
    )
  }
}
