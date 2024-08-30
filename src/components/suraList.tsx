'use client'

import { useEffect, useState } from 'react'

import { Sura } from '@/types'

import SuraCard from './suraCard'

export default function SuraList() {
  const [surasData, setSurasData] = useState<Sura[]>([])
  useEffect(() => {
    const loadSuras = async () => {
      try {
        const url = `${process.env.NEXT_PUBLIC_FRONTEND_BASE_URL}/quran-metadata/mushaf-elmadina-warsh-azrak/sura.json`
        const response = await fetch(url, {
          cache: 'force-cache',
        })
        if (!response.ok) {
          throw new Error('Failed to load specs')
        }
        const data: Sura[] = await response.json()
        setSurasData(data)
      } catch {}
    }

    loadSuras()
  }, [])

  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 items-center
        grid-flow-col-reverse
        `}
    >
      {surasData.map((sura: Sura) => (
        <SuraCard key={sura.number} sura={sura} />
      ))}
    </div>
  )
}
