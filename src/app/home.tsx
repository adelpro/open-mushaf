'use client'
import { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

import SuraList from '@/components/suraList'
import useLocalStorage from '@/hooks/useLocalStorage'
import { Sura } from '@/types'

type Props = {
  data: Sura[]
}
export default function Home({ data }: Props) {
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
    <main className="h-dvh m-2">
      {showSurahList ? <SuraList data={data} /> : <></>}
    </main>
  )
}
