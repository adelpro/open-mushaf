'use client'

import { useRouter } from 'next/navigation'
import { defaultNumberOfPages } from '@/data/quran-metadata/mushaf-elmadina-warsh-azrak/spec'
import { useHotkeys } from 'react-hotkeys-hook'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import Skeleton from '@/components/skeleton'

const MushafPage = dynamic(() => import('@/components/mushafPage'), {
  suspense: true,
  loading: () => <Skeleton />,
})

export default function PageByIndex({ params }: { params: { index: string } }) {
  const router = useRouter()
  const { index } = params

  // Pages navigation limitation
  if (Number(index) < 1) {
    router.push('/mushaf/1')
  }

  if (Number(index) > defaultNumberOfPages) {
    router.push(`/mushaf/${defaultNumberOfPages}`)
  }
  //

  useHotkeys('ArrowLeft', () => {
    if (Number(index) >= defaultNumberOfPages) return
    router.push(`/mushaf/${Number(index) + 1}`)
  })
  useHotkeys('ArrowRight', () => {
    if (Number(index) <= 1) return
    router.push(`/mushaf/${Number(index) - 1}`)
  })

  return (
    <Suspense
      fallback={
        <div className="flex flex-col justify-center items-center m-5">
          <div className="animate-pulse h-28 w-12 bg-gray-300 rounded-lg"></div>
        </div>
      }
    >
      <div className="flex flex-col justify-center items-center m-5">
        <MushafPage index={Number(index)} />
      </div>
    </Suspense>
  )
}
