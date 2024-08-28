'use client'
import { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

import SurahList from '@/components/surahList'
import useLocalStorage from '@/hooks/useLocalStorage'

export default function Home() {
  const [index, _] = useLocalStorage<string>('index', '1')
  const router = useRouter()
  const [showSurahList, setShowSurahList] = useState(false)

  useEffect(() => {
    if (index === '1') {
      setShowSurahList(true)
      return
    }

    router.replace(`/mushaf/${index}`)
  }, [index, router])

  return (
    <main className="h-dvh m-2">{showSurahList ? <SurahList /> : <></>}</main>
  )
}
