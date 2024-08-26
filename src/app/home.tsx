'use client'
import useLocalStorage from '@/hooks/useLocalStorage'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import SurahList from '@/components/surahList'

export default function Home() {
  const [index, _] = useLocalStorage<string>('index', '1')
  const router = useRouter()
  const [showSurahList, setShowSurahList] = useState(false)

  useEffect(() => {
    console.log('index:', index, typeof index, index === '1')

    if (index === '1') {
      setShowSurahList(true)
      return
    }

    router.replace(`/mushaf/${index}`)
  }, [index, router])

  return (
    <main className="container m-2">
      {showSurahList ? <SurahList /> : <></>}
    </main>
  )
}
