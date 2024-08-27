import { TouchEvent, useState } from 'react'

interface SwipeInput {
  onSwipedLeft: () => void
  onSwipedRight: () => void
}

interface SwipeOutput {
  onTouchStart: (e: TouchEvent) => void
  onTouchMove: (e: TouchEvent) => void
  onTouchEnd: () => void
}

const useSwipe = (input: SwipeInput): SwipeOutput => {
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  const minSwipeDistance = 50

  const onTouchStart = (e: TouchEvent) => {
    setTouchEnd(null) // Reset touchEnd
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: TouchEvent) => setTouchEnd(e.targetTouches[0].clientX)

  const onTouchEnd = () => {
    if (touchStart === null || touchEnd === null) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      input.onSwipedLeft()
    }
    if (isRightSwipe) {
      input.onSwipedRight()
    }
  }

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  }
}

export default useSwipe
