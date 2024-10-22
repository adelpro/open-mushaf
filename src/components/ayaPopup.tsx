import { useEffect, useRef, useState } from 'react'

import useLocalStorage from '@/hooks/useLocalStorage'
import { Tabs, TafseerAya } from '@/types'
import { cn } from '@/utils/cn'

type Props = {
  show: boolean
  setShow: React.Dispatch<React.SetStateAction<boolean>>
  aya: number
  sura: number
}

const tabLabels: Record<Tabs, string> = {
  katheer: 'ابن كثير',
  maaany: 'معاني القرآن',
  earab: 'إعراب القرآن',
  baghawy: 'البغوي',
  muyassar: 'الميسر',
  qortoby: 'القرطبي',
  tabary: 'الطبري',
  saady: 'السعدي',
  tanweer: 'التحرير و التنوير',
  waseet: 'الوسيط',
}

export default function AyaPopup({ show, setShow, aya, sura }: Props) {
  const [popupHeight, setPopupHeight] = useLocalStorage<number>(
    'popupHeight',
    320
  )
  const [isResizing, setIsResizing] = useState(false)
  const [selectedTab, setSelectedTab] = useLocalStorage<Tabs>(
    'selectedTafseer',
    'katheer'
  )
  const [tafseerData, setTafseerData] = useState<TafseerAya | null>(null)
  const [loading, setLoading] = useState(false)
  const [suraName, setSuraName] = useState<string>('')
  const popupRef = useRef<HTMLDivElement>(null)

  // Fetch suraJSON from public folder
  useEffect(() => {
    const loadSuraJSON = async () => {
      const url = `${process.env.NEXT_PUBLIC_FRONTEND_BASE_URL}/quran-metadata/mushaf-elmadina-warsh-azrak/sura.json`
      const res = await fetch(url, {
        cache: 'force-cache',
      })
      const suraJSON = await res.json()
      setSuraName(suraJSON[sura - 1].name)
    }

    loadSuraJSON()
  }, [sura])
  // Dynamic import for the selected tafseer
  useEffect(() => {
    const loadTafseerData = async () => {
      setLoading(true)
      let tafseerArray: TafseerAya[] = []

      switch (selectedTab) {
        case 'katheer':
          tafseerArray = (await fetch('/tafaseer/katheer.json').then((res) =>
            res.json()
          )) as TafseerAya[]
          break
        case 'maaany':
          tafseerArray = (await fetch('/tafaseer/maany.json').then((res) =>
            res.json()
          )) as TafseerAya[]
          break
        case 'earab':
          tafseerArray = (await fetch('/tafaseer/earab.json').then((res) =>
            res.json()
          )) as TafseerAya[]
          break
        case 'baghawy':
          tafseerArray = (await fetch('/tafaseer/baghawy.json').then((res) =>
            res.json()
          )) as TafseerAya[]
          break
        case 'muyassar':
          tafseerArray = (await fetch('/tafaseer/muyassar.json').then((res) =>
            res.json()
          )) as TafseerAya[]
          break
        case 'qortoby':
          tafseerArray = (await fetch('/tafaseer/qortoby.json').then((res) =>
            res.json()
          )) as TafseerAya[]
          break
        case 'tabary':
          tafseerArray = (await fetch('/tafaseer/tabary.json').then((res) =>
            res.json()
          )) as TafseerAya[]
          break
        case 'saady':
          tafseerArray = (await fetch('/tafaseer/saady.json').then((res) =>
            res.json()
          )) as TafseerAya[]
          break

        case 'tanweer':
          tafseerArray = (await fetch('/tafaseer/tanweer.json').then((res) =>
            res.json()
          )) as TafseerAya[]
          break
        case 'waseet':
          tafseerArray = (await fetch('/tafaseer/waseet.json').then((res) =>
            res.json()
          )) as TafseerAya[]
          break

        default:
          tafseerArray = (await fetch('/tafaseer/katheer.json').then((res) =>
            res.json()
          )) as TafseerAya[]
      }

      setTafseerData(
        tafseerArray.find(
          (tafseer) => tafseer.aya === aya && tafseer.sura === sura
        ) || null
      )
      setLoading(false)
    }

    loadTafseerData()
  }, [selectedTab, aya, sura])

  const startResize = () => setIsResizing(true)
  const stopResize = () => setIsResizing(false)

  useEffect(() => {
    const handleResize = (e: MouseEvent | TouchEvent) => {
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY
      if (isResizing && popupRef.current) {
        let newHeight = window.innerHeight - clientY
        if (newHeight > window.innerHeight - 30)
          newHeight = window.innerHeight - 30
        setPopupHeight(newHeight)
      }
    }

    document.addEventListener('mousemove', handleResize)
    document.addEventListener('mouseup', stopResize)
    document.addEventListener('touchmove', handleResize)
    document.addEventListener('touchend', stopResize)

    return () => {
      document.removeEventListener('mousemove', handleResize)
      document.removeEventListener('mouseup', stopResize)
      document.removeEventListener('touchmove', handleResize)
      document.removeEventListener('touchend', stopResize)
    }
  }, [isResizing, setPopupHeight])

  const renderTafseerContent = (tafseerText: string | undefined) => (
    <div
      dangerouslySetInnerHTML={{
        __html: tafseerText || 'لا يوجد تفسير.',
      }}
    />
  )
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-end">
      <div
        className={cn(
          'absolute inset-0 bg-gray-800 transition-opacity duration-300',
          show ? 'opacity-50' : 'opacity-0'
        )}
        onClick={() => setShow(false)}
        onKeyDown={() => setShow(false)}
        aria-hidden={!show}
        role="button"
        tabIndex={0}
      />
      <div
        ref={popupRef}
        className={cn(
          'bg-white shadow-lg rounded-t-lg w-full max-w-md overflow-hidden transform transition-transform duration-300',
          show ? 'translate-y-0' : 'translate-y-full',
          isResizing ? 'opacity-90' : 'opacity-100'
        )}
        style={{ height: `${popupHeight}px` }}
      >
        <button
          className="w-full flex flex-col justify-center items-center cursor-s-resize p-1"
          onMouseDown={startResize}
          onTouchStart={startResize}
          aria-label="Resize"
        >
          <span className="w-20 h-[1px] rounded-md mt-1 mb-[1px] bg-gray-500"></span>
          <span className="w-20 h-[1px] rounded-md mb-1 bg-gray-500"></span>
        </button>
        <div className="h-full p-4 overflow-y-auto">
          <button
            className="text-gray-500 hover:text-gray-700 mb-2 float-left text-xl"
            onClick={() => setShow(false)}
            aria-label="Close"
          >
            ✕
          </button>
          <p className="text-lg leading-relaxed">
            {suraName} (<span className="font-bold">الأية</span> {aya})
          </p>

          <div
            className="flex flex-wrap justify-start gap-x-8 gap-y-2 my-5"
            role="tablist"
          >
            {Object.keys(tabLabels).map((key) => {
              const tabKey = key as Tabs
              return (
                <button
                  key={tabKey}
                  className={`py-2 ${
                    selectedTab === tabKey ? 'border-b-2 border-blue-500' : ''
                  }`}
                  aria-selected={selectedTab === tabKey}
                  role="tab"
                  onClick={() => setSelectedTab(tabKey)}
                >
                  {tabLabels[tabKey]}
                </button>
              )
            })}
          </div>

          <div>
            {loading ? (
              <div> جاري التحميل...</div>
            ) : (
              renderTafseerContent(tafseerData?.text)
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
