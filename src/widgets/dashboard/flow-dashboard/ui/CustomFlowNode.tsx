import { BaseNewsCard } from '@/shared/ui/card'
import { FlowNodeData } from '../model/types'
import { useEffect, useMemo, useRef, useState } from 'react'

interface Props {
  data: FlowNodeData
  selected: boolean
}
export const CustomFlowNode = ({ data, selected }: Props) => {
  const proxiedImageUrl = useMemo(() => {
    const link = data.link?.trim()
    if (link) return `/api/og-image?url=${encodeURIComponent(link)}`
    const img = data.imageUrl?.trim()
    if (img) return `/api/thumbnail?src=${encodeURIComponent(img)}`
    return undefined
  }, [data.link, data.imageUrl])

  // 이미지/프로필 최초 1회만 fetch하여 ObjectURL로 프리즈
  const [frozenImageUrl, setFrozenImageUrl] = useState<string | undefined>(
    undefined
  )
  const imageObjUrlRef = useRef<string | undefined>(undefined)

  useEffect(() => {
    if (!proxiedImageUrl) return
    if (imageObjUrlRef.current) return
    let cancelled = false
    ;(async () => {
      try {
        const res = await fetch(proxiedImageUrl, { cache: 'force-cache' })
        const blob = await res.blob()
        if (cancelled) return
        const objUrl = URL.createObjectURL(blob)
        imageObjUrlRef.current = objUrl
        setFrozenImageUrl(objUrl)
      } catch {}
    })()
    return () => {
      cancelled = true
    }
  }, [proxiedImageUrl])

  useEffect(() => {
    return () => {
      if (imageObjUrlRef.current) {
        URL.revokeObjectURL(imageObjUrlRef.current)
        imageObjUrlRef.current = undefined
      }
    }
  }, [])

  const proxiedProfileUrl = useMemo(() => {
    const p = data.user?.profileUrl?.trim()
    if (p) return `/api/thumbnail?src=${encodeURIComponent(p)}`
    return undefined
  }, [data.user?.profileUrl])

  const [frozenProfileUrl, setFrozenProfileUrl] = useState<string | undefined>(
    undefined
  )
  const profileObjUrlRef = useRef<string | undefined>(undefined)

  useEffect(() => {
    if (!proxiedProfileUrl) return
    if (profileObjUrlRef.current) return
    let cancelled = false
    ;(async () => {
      try {
        const res = await fetch(proxiedProfileUrl, { cache: 'force-cache' })
        const blob = await res.blob()
        if (cancelled) return
        const objUrl = URL.createObjectURL(blob)
        profileObjUrlRef.current = objUrl
        setFrozenProfileUrl(objUrl)
      } catch {}
    })()
    return () => {
      cancelled = true
    }
  }, [proxiedProfileUrl])

  useEffect(() => {
    return () => {
      if (profileObjUrlRef.current) {
        URL.revokeObjectURL(profileObjUrlRef.current)
        profileObjUrlRef.current = undefined
      }
    }
  }, [])

  const userForCard = frozenProfileUrl
    ? { ...(data.user || {}), profileUrl: frozenProfileUrl }
    : proxiedProfileUrl
      ? { ...(data.user || {}), profileUrl: proxiedProfileUrl }
      : data.user

  return (
    <BaseNewsCard
      title={data.title}
      content={data.content}
      imageUrl={frozenImageUrl ?? proxiedImageUrl}
      createdAt={data.createdAt}
      category={data.category}
      type="flow"
      user={userForCard}
      link={data.link}
      selected={selected}
    />
  )
}
