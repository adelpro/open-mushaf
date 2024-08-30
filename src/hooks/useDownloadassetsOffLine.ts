'use client'

import { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

import { defaultNumberOfPages } from '@/data/quran-metadata/mushaf-elmadina-warsh-azrak/spec'
import { Tabs } from '@/types'

const tafseerFilesMap: Record<Tabs, string> = {
  katheer: '/tafaseer/katheer.json',
  maaany: '/tafaseer/maany.json',
  earab: '/tafaseer/earab.json',
  baghawy: '/tafaseer/baghawy.json',
  muyassar: '/tafaseer/muyassar.json',
  qortoby: '/tafaseer/qortoby.json',
  tabary: '/tafaseer/tabary.json',
  saady: '/tafaseer/saady.json',
  tanweer: '/tafaseer/tanweer.json',
  waseet: '/tafaseer/waseet.json',
}
const useDownloadAssetsOffline = () => {
  const router = useRouter()
  const [status, setStatus] = useState<string>('')
  const [progress, setProgress] = useState<number>(0)
  const [total, setTotal] = useState(
    () => Object.keys(tafseerFilesMap).length + defaultNumberOfPages
  )
  useEffect(() => {
    setTotal(() => Object.keys(tafseerFilesMap).length + defaultNumberOfPages)
  }, [])
  const downloadAssets = async () => {
    const CACHE_MUSHAF_NAME = 'mushaf-elmadina-warsh-azrak-cache'
    const CACHE_TAFSEER_NAME = 'tafaseer-cache'
    const CACHE_EXPIRY = 6 * 30 * 24 * 60 * 60 * 1000 // Six months

    setStatus('بدء التحميل...')

    // Cache Mushaf images
    const mushafCache = await caches.open(CACHE_MUSHAF_NAME)
    const cachedMushafUrls = new Set(
      (await mushafCache.keys()).map((request) => request.url)
    )

    let progressCount = 0

    for (let i = 1; i <= defaultNumberOfPages; i++) {
      const url = `/mushaf-data/mushaf-elmadina-warsh-azrak/${i}.png`

      if (cachedMushafUrls.has(url)) {
        const cacheResponse = await mushafCache.match(url)
        if (cacheResponse) {
          const cacheDate = new Date(cacheResponse.headers.get('date') || '')
          const now = Date.now()
          if (now - cacheDate.getTime() < CACHE_EXPIRY) {
            progressCount++
            setProgress(progressCount)
            setStatus(`الصورة موجودة (${progressCount}/${total})...`)
            continue
          } else {
            await mushafCache.delete(url) // Remove expired cache
          }
        }
      }
      try {
        const response = await fetch(url)
        if (response.ok) {
          await mushafCache.put(url, response)
          progressCount++
          setProgress(progressCount)
          setStatus(`تحميل الصورة (${progressCount}/${total})...`)
        } else {
          setStatus(`فشل في تحميل ${url}: ${response.statusText}`)
        }
      } catch {
        setStatus(`خطأ في تحميل ${url}`)
      }
    }

    // Cache Tafseer JSON files
    const tafseerCache = await caches.open(CACHE_TAFSEER_NAME)
    const cachedTafseerUrls = new Set(
      (await tafseerCache.keys()).map((request) => request.url)
    )

    for (const tab of Object.keys(tafseerFilesMap) as Tabs[]) {
      const url = tafseerFilesMap[tab]

      if (cachedTafseerUrls.has(url)) {
        const cacheResponse = await tafseerCache.match(url)
        if (cacheResponse) {
          const cacheDate = new Date(cacheResponse.headers.get('date') || '')
          const now = Date.now()
          if (now - cacheDate.getTime() < CACHE_EXPIRY) {
            progressCount++
            setProgress(progressCount)
            setStatus(`الملف موجود (${progressCount}/${total})...`)
            continue
          } else {
            await tafseerCache.delete(url) // Remove expired cache
          }
        }
      }
      try {
        const response = await fetch(url)
        if (response.ok) {
          await tafseerCache.put(url, response)
          progressCount++
          setProgress(progressCount)
          setStatus(`تحميل الملف (${progressCount}/${total})...`)
        } else {
          setStatus(`فشل في تحميل ${url}: ${response.statusText}`)
        }
      } catch {
        setStatus(`خطأ في تحميل ${url}`)
      }
    }

    setStatus('تم التحميل بنجاح')

    setTimeout(() => {
      router.push('/success')
    }, 100)
  }

  return {
    downloadAssets,
    status,
    progress,
    total,
  }
}

export default useDownloadAssetsOffline
