import React, { useState } from 'react'

import { Aya, Page } from '@/types'
import { getDimensionCoeff } from '@/utils/getDimensionCoeff'

import { useCoordinates } from './useCoordinates'
import { useSpecs } from './useSpecs'

type SelectedAya = {
  aya: number
  sura: number
}

type Props = {
  index: number
  dimensions: { customPageWidth: number; customPageHeight: number }
}

const usePageOverlay = ({ index, dimensions }: Props) => {
  const { coordinates: coordinateElMadinaWarshAzrak } = useCoordinates()
  const [selectedAya, setSelectedAya] = useState<SelectedAya>({
    aya: 0,
    sura: 0,
  })
  const [show, setShow] = useState<boolean>(false)
  const { customPageHeight, customPageWidth } = dimensions
  const {
    specs: {
      defaultPageHeight,
      defaultPageWidth,
      defaultMarginX,
      defaultMarginY,
      defaultLineHeight,
      defaultFirstPAgesMarginX,
      defaultFirstPagesWidth,
      defaultFirstPagesMarginY,
    },
  } = useSpecs()

  const heightCoeff = getDimensionCoeff({
    defaultDimension: defaultPageHeight,
    customDimension: customPageHeight,
  })
  const widthCoeff = getDimensionCoeff({
    defaultDimension: defaultPageWidth,
    customDimension: customPageWidth,
  })

  // Correct dimensions
  let marginX = defaultMarginX * heightCoeff

  // Correct dimensions for 1/2 pages
  if (index <= 2) {
    marginX = defaultFirstPAgesMarginX * heightCoeff
  }

  const lineHeight = defaultLineHeight * heightCoeff
  let pageWidth = defaultPageWidth * widthCoeff

  // Correct dimensions for 1/2 pages
  if (index <= 2) {
    pageWidth = defaultFirstPagesWidth * widthCoeff
  }

  let marginY = defaultMarginY * widthCoeff

  // Correct dimensions for 1/2 pages
  if (index <= 2) {
    marginY = defaultFirstPagesMarginY * widthCoeff
  }

  let prevX = marginX
  let overlay: React.JSX.Element[] = []

  const page: Page = coordinateElMadinaWarshAzrak[Number(index)]

  const handleAyaClick = ({ aya, sura }: { aya: number; sura: number }) => {
    setSelectedAya({ aya, sura })
    setShow(true)
  }

  const handleKeyDown = (e: React.KeyboardEvent, aya: number, sura: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleAyaClick({ aya, sura })
    }
  }

  const renderOverlayDiv = (
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
  }

  page &&
    page.map((aya: Aya) => {
      const defaultX: number = aya[2]
      const defaultY: number = aya[3]

      // Dimensions correction
      let X = defaultX * heightCoeff

      // Correction for 1/2 pages only
      if (index <= 2) {
        X = (defaultX - 100) * heightCoeff
      }
      const Y = defaultY * widthCoeff

      // Drawing overlay for aya line (first part before the aya marker)
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

      // Drawing overlay for aya line (last part after the aya marker in the same line)
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

      // Drawing overlay for multiple-line aya
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
