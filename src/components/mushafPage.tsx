import { bookBase64 as placeHolder } from '@/asset/bookBase64'
import {
  defaultPageHeight,
  defaultPageWidth,
} from '@/data/quran-metadata/mushaf-elmadina-warsh-azrak/spec'
import useLocalStorage from '@/hooks/useLocalStorage'
import usePageOverlay from '@/hooks/usePageOverlay'
import useSwipe from '@/hooks/useSwipe'
import { cn } from '@/utils/cn'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Suspense, useEffect, useRef, useState } from 'react'
import Spinner from './spinner'

const AyaPopup = dynamic(() => import('./ayaPopup'), { ssr: false })
type Props = {
  index: number
}

export default function MushafPage({ index }: Props) {
  const router = useRouter()
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

  //TODO add custom width and height from mushafPage state

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
  }, [])
  return (
    <div
      className="relative flex flex-col justify-center items-center w-full max-w-md inset-0 h-screen overflow-hidden"
      {...swipeHandlers}
    >
      <div className="w-full items-center justify-center inset-0">
        <Image
          ref={pageImageRef}
          src={`/mushaf/mushaf-elmadina-warsh-azrak/${index}.png`}
          alt="image"
          width={defaultPageWidth}
          height={defaultPageHeight}
          className={cn(
            'w-full h-screen object-fill',
            `md:max-h-[${defaultPageHeight}px] md:max-w-[${defaultPageWidth}px]`
          )}
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
        <AyaPopup
          aya={selectedAya.aya}
          sura={selectedAya.sura}
          show={show}
          setShow={setShow}
        />
      ) : (
        <></>
      )}
      <Suspense fallback={<Spinner />}>
        <div className="fixed bottom-0 left-0 w-full items-center justify-center">
          {...overlay}
        </div>
      </Suspense>
    </div>
  )
}
