'use client'

import { useState } from 'react'

import { useRouter } from 'next/navigation'

import { defaultNumberOfPages } from '@/data/quran-metadata/mushaf-elmadina-warsh-azrak/spec'

const useDownloadassetsOffLine = () => {
  const router = useRouter()
  const [status, setStatus] = useState<string>('')
  const [progress, setProgress] = useState<number>(0)
  const total = defaultNumberOfPages

  const downloadAssets = async () => {
    const CACHE_NAME = 'mushaf-elmadina-warsh-azrak-cache'

    //One year
    const CACHE_EXPIRY = 6 * 30 * 24 * 60 * 60 * 1000

    setStatus('بدء التحميل...')

    // fetch all images in public/mushaf-data/mushaf-elmadina-warsh-azrak from 1.png to 604.png the the baground
    const cache = await caches.open(CACHE_NAME)
    const cacheKeys = await cache.keys()
    const cachedUrls = new Set(cacheKeys.map((request) => request.url))

    let progressCount = 0

    for (let i = 1; i <= total; i++) {
      const url = `/mushaf-data/mushaf-elmadina-warsh-azrak/${i}.png`

      // Check if the URL is already cached and not expired
      if (cachedUrls.has(url)) {
        const cacheResponse = await cache.match(url)
        if (cacheResponse) {
          const cacheDate = new Date(cacheResponse.headers.get('date') || '')
          const now = Date.now()
          if (now - cacheDate.getTime() < CACHE_EXPIRY) {
            progressCount++
            setProgress(progressCount)
            setStatus(`الصورة موجودة (${progressCount}/${total})...`)
            continue
          } else {
            await cache.delete(url) // Remove expired cache
          }
        }
      }
      try {
        const response = await fetch(url)
        if (response.ok) {
          await cache.put(url, response)
          progressCount++
          setProgress(progressCount)
          setStatus(`تحميل الصورة (${progressCount}/${total})...`)
        } else {
          console.error(`فشل في تحميل ${url}: ${response.statusText}`)
        }
      } catch {}
    }
    setStatus('تم التحميل بنجاح')

    // Redirect to the success page after 100ms
    setTimeout(() => {
      router.push('/success') // Replace '/success' with the actual success page route
    }, 100)
  }
  return {
    downloadAssets,
    status,
    progress,
    total,
  }
}
export default useDownloadassetsOffLine
