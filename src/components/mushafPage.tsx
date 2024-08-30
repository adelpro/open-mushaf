import { Suspense, useEffect, useRef, useState } from 'react'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { bookBase64 as placeHolder } from '@/asset/bookBase64'
import useLocalStorage from '@/hooks/useLocalStorage'
import usePageOverlay from '@/hooks/usePageOverlay'
import { useSpecs } from '@/hooks/useSpecs'
import useSwipe from '@/hooks/useSwipe'
import { cn } from '@/utils/cn'

import Spinner from './spinner'

const AyaPopup = dynamic(() => import('./ayaPopup'), { ssr: false })
type Props = {
  index: number
}

export default function MushafPage({ index }: Props) {
  const router = useRouter()
  const {
    specs: { defaultPageWidth, defaultPageHeight },
  } = useSpecs()
  const swipeHandlers = useSwipe({
    onSwipedLeft: () => router.push(`/mushaf/${Number(index) - 1}`),
    onSwipedRight: () => router.push(`/mushaf/${Number(index) + 1}`),
  })

  const pageImageRef = useRef<HTMLImageElement>(null)
  const [mushafPage, setMushafPage] = useState<{
    width: number
    height: number
  }>({ width: defaultPageWidth, height: defaultPageHeight })

  const [_, setIndex] = useLocalStorage<Number>('index', 1)

  const dimensions = {
    customPageWidth: mushafPage.width,
    customPageHeight: mushafPage.height,
  }
  const { overlay, selectedAya, show, setShow } = usePageOverlay({
    index: Number(index),
    dimensions,
  })

  useEffect(() => {
    setMushafPage({
      width: pageImageRef.current?.width || defaultPageWidth,
      height: pageImageRef.current?.height || defaultPageHeight,
    })
  }, [defaultPageHeight, defaultPageWidth])
  return (
    <div
      className="relative flex flex-col justify-center items-center w-full max-w-md insert-0 h-dvh overflow-hidden"
      {...swipeHandlers}
    >
      <div className="w-full flex items-center justify-center inset-0">
        <Image
          ref={pageImageRef}
          src={`/mushaf-data/mushaf-elmadina-warsh-azrak/${index}.png`}
          alt={`Mushaf page ${index}`}
          width={defaultPageWidth}
          height={defaultPageHeight}
          className={cn(`h-dvh max-h-md w-full max-w-md object-fill`)}
          onLoad={() => {
            setIndex(Number(index))
          }}
          priority
          quality={100}
          blurDataURL={placeHolder}
          placeholder="blur"
        />
      </div>
      {/* <span className="text-gray-500 ">الصفحة {index}</span> */}
      {show ? (
        <Suspense fallback={<Spinner />}>
          <AyaPopup
            aya={selectedAya.aya}
            sura={selectedAya.sura}
            show={show}
            setShow={setShow}
          />
        </Suspense>
      ) : (
        <></>
      )}
      <Suspense fallback={<Spinner />}>
        <div className="w-full">{...overlay}</div>
      </Suspense>
    </div>
  )
}
