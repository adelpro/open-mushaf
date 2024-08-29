import React, { useCallback, useEffect, useState } from 'react'

import {
  defaultFirstPAgesMarginX,
  defaultFirstPagesMarginY,
  defaultFirstPagesWidth,
  defaultLineHeight,
  defaultMarginX,
  defaultMarginY,
  defaultPageHeight,
  defaultPageWidth,
} from '@/data/quran-metadata/mushaf-elmadina-warsh-azrak/spec'
import { Aya, Page } from '@/types'
import { getDimensionCoeff } from '@/utils/getDimensionCoeff'

type SelectedAya = {
  aya: number
  sura: number
}

type Props = {
  index: number
  dimensions: { customPageWidth: number; customPageHeight: number }
}

const usePageOverlay = ({ index, dimensions }: Props) => {
  const [selectedAya, setSelectedAya] = useState<SelectedAya>({
    aya: 0,
    sura: 0,
  })
  const [coordinateElMadinaWarshAzrak, setCoordinateElMadinaWarshAzrak] =
    useState<Page[]>([])
  const [show, setShow] = useState<boolean>(false)
  const { customPageHeight, customPageWidth } = dimensions

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const coordinate: Page[] = (await fetch(
          `${process.env.NEXT_PUBLIC_FRONTEND_BASE_URL}/quran-metadata/mushaf-elmadina-warsh-azrak/aya.json`
        ).then((res) => res.json())) as Page[]
        setCoordinateElMadinaWarshAzrak(coordinate)
      } catch (error) {
        console.error('Error fetching coordinates:', error)
      }
    }

    fetchCoordinates()
  }, [index])

  const heightCoeff = getDimensionCoeff({
    defaultDimension: defaultPageHeight,
    customDimension: customPageHeight,
  })
  const widthCoeff = getDimensionCoeff({
    defaultDimension: defaultPageWidth,
    customDimension: customPageWidth,
  })

  const getPageDimensions = useCallback(() => {
    let marginX = defaultMarginX * heightCoeff
    let pageWidth = defaultPageWidth * widthCoeff
    let marginY = defaultMarginY * widthCoeff

    if (index <= 2) {
      marginX = defaultFirstPAgesMarginX * heightCoeff
      pageWidth = defaultFirstPagesWidth * widthCoeff
      marginY = defaultFirstPagesMarginY * widthCoeff
    }

    return { marginX, pageWidth, marginY }
  }, [heightCoeff, widthCoeff, index])

  const { marginX, pageWidth, marginY } = getPageDimensions()
  const lineHeight = defaultLineHeight * heightCoeff

  let prevX = marginX
  const overlay: React.JSX.Element[] = []
  const page: Page | undefined = coordinateElMadinaWarshAzrak[Number(index)]

  const handleAyaClick = useCallback(
    ({ aya, sura }: { aya: number; sura: number }) => {
      setSelectedAya({ aya, sura })
      setShow(true)
    },
    []
  )

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, aya: number, sura: number) => {
      if (e.key === 'Enter' || e.key === ' ') {
        handleAyaClick({ aya, sura })
      }
    },
    [handleAyaClick]
  )

  const renderOverlayDiv = useCallback(
    (
      top: number,
      left: number,
      width: number,
      aya: number,
      sura: number,
      backgroundColor: string
    ) => {
      return (
        <div
          className="absolute cursor-pointer"
          data-aya={aya}
          data-sura={sura}
          aria-label={`aya - ${aya} sura - ${sura}`}
          style={{
            top: `${top}px`,
            left: `${left}px`,
            width: `${width}px`,
            height: `${lineHeight}px`,
            backgroundColor,
          }}
          onClick={() => handleAyaClick({ aya, sura })}
          onKeyDown={(e) => handleKeyDown(e, aya, sura)}
          role="button"
          tabIndex={0}
        />
      )
    },
    [lineHeight, handleAyaClick, handleKeyDown]
  )

  page &&
    page.forEach((aya: Aya) => {
      const defaultX: number = aya[2]
      const defaultY: number = aya[3]

      let X = defaultX * heightCoeff
      if (index <= 2) {
        X = (defaultX - 100) * heightCoeff
      }
      const Y = defaultY * widthCoeff

      overlay.push(
        renderOverlayDiv(
          X,
          Y - marginY,
          pageWidth + marginY - Y,
          aya[1],
          aya[0],
          show && selectedAya.aya === aya[1] && selectedAya.sura === aya[0]
            ? 'rgba(128, 128, 128, 0.5)'
            : 'transparent'
        )
      )

      if (Y > 93) {
        overlay.push(
          renderOverlayDiv(
            X,
            marginY,
            Y - marginY * 2,
            aya[1] + 1,
            aya[0],
            show &&
              selectedAya.aya === aya[1] + 1 &&
              selectedAya.sura === aya[0]
              ? 'rgba(128, 128, 128, 0.5)'
              : 'transparent'
          )
        )
      }

      const numberOfLines: number = Math.ceil((X - prevX) / lineHeight)

      if (numberOfLines > 1) {
        let x = X
        for (let i = 0; i < numberOfLines - 1; i++) {
          x -= lineHeight
          if (x >= 40 && selectedAya.aya !== 1) {
            overlay.push(
              renderOverlayDiv(
                x,
                marginY,
                pageWidth - marginY,
                aya[1],
                aya[0],
                show &&
                  selectedAya.aya === aya[1] &&
                  selectedAya.sura === aya[0]
                  ? 'rgba(128, 128, 128, 0.5)'
                  : 'transparent'
              )
            )
          }
        }
      }

      prevX = X
    })

  return { overlay, show, setShow, selectedAya }
}

export default usePageOverlay
