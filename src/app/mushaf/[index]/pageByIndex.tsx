'use client'

import { Suspense, useEffect } from 'react'

import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { useHotkeys } from 'react-hotkeys-hook'

import Skeleton from '@/components/skeleton'
import { useSpecs } from '@/hooks/useSpecs'

const MushafPage = dynamic(() => import('@/components/mushafPage'), {
  suspense: true,
  loading: () => <Skeleton />,
})

export default function PageByIndex({ params }: { params: { index: string } }) {
  const router = useRouter()
  const { index } = params
  const {
    specs: { defaultNumberOfPages },
  } = useSpecs()
  useEffect(() => {
    // Check if the index is valid number
    if (Number.isNaN(Number(index))) {
      return router.replace('/mushaf/1')
    }
  }, [index, router])
  useEffect(() => {
    // Pages navigation limitation
    if (Number(index) < 1) {
      router.replace('/mushaf/1')
    }

    if (Number(index) > defaultNumberOfPages) {
      router.replace(`/mushaf/${defaultNumberOfPages}`)
    }
    //
  }, [defaultNumberOfPages, index, router])

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
        <div className="flex flex-col justify-center items-center insert-0">
          <div className="animate-pulse h-28 w-12 bg-gray-300 rounded-lg"></div>
        </div>
      }
    >
      <div className="flex flex-col justify-center items-center insert-0">
        <MushafPage index={Number(index)} />
      </div>
    </Suspense>
  )
}
