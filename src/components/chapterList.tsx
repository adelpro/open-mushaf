'use client'
import { useEffect, useState } from 'react'

import { Chapter } from '@/types'

import ChapterCard from './chapterCard'

export default function ChapterList() {
  const [chaptersData, setChaptersData] = useState<Chapter[]>([])
  useEffect(() => {
    const loadChapters = async () => {
      try {
        const url = `${process.env.NEXT_PUBLIC_FRONTEND_BASE_URL}/quran-metadata/mushaf-elmadina-warsh-azrak/chapter.json`
        const response = await fetch(url, {
          cache: 'force-cache',
        })
        if (!response.ok) {
          throw new Error('Failed to load specs')
        }
        const data: Chapter[] = await response.json()
        setChaptersData(data)
      } catch {}
    }

    loadChapters()
  }, [])

  return (
    <>
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 items-center
        grid-flow-col-reverse
        `}
      >
        {chaptersData.map((chapter: Chapter) => (
          <ChapterCard key={chapter.number} chapter={chapter} />
        ))}
      </div>
    </>
  )
}
