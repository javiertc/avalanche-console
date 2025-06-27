import { useState, useEffect, useCallback, useMemo } from 'react'

interface UseSliderOptions {
  itemsLength: number
  autoPlayInterval?: number
  autoPlayEnabled?: boolean
}

interface UseSliderReturn {
  currentIndex: number
  isAutoPlaying: boolean
  isVisible: boolean
  goToNext: () => void
  goToPrevious: () => void
  goToSlide: (index: number) => void
  handleClose: () => void
  handleMouseEnter: () => void
  handleMouseLeave: () => void
  sliderTransformStyle: { transform: string }
}

/**
 * Custom hook for managing slider state and behavior
 * Provides auto-play functionality, navigation controls, and visibility management
 */
export function useSlider({
  itemsLength,
  autoPlayInterval = 4000,
  autoPlayEnabled = true
}: UseSliderOptions): UseSliderReturn {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoPlayEnabled)
  const [isVisible, setIsVisible] = useState(true)

  // Auto-advance slider with proper cleanup
  useEffect(() => {
    if (!isAutoPlaying || !isVisible || itemsLength <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % itemsLength)
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [isAutoPlaying, isVisible, itemsLength, autoPlayInterval])

  // Navigation functions with useCallback to prevent unnecessary re-renders
  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % itemsLength)
    setIsAutoPlaying(false)
  }, [itemsLength])

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + itemsLength) % itemsLength)
    setIsAutoPlaying(false)
  }, [itemsLength])

  const goToSlide = useCallback((index: number) => {
    if (index >= 0 && index < itemsLength) {
      setCurrentIndex(index)
      setIsAutoPlaying(false)
    }
  }, [itemsLength])

  const handleClose = useCallback(() => {
    setIsVisible(false)
  }, [])

  const handleMouseEnter = useCallback(() => {
    setIsAutoPlaying(false)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsAutoPlaying(autoPlayEnabled)
  }, [autoPlayEnabled])

  // Memoize the transform style to avoid recalculation
  const sliderTransformStyle = useMemo(() => ({
    transform: `translateX(-${currentIndex * 100}%)`
  }), [currentIndex])

  return {
    currentIndex,
    isAutoPlaying,
    isVisible,
    goToNext,
    goToPrevious,
    goToSlide,
    handleClose,
    handleMouseEnter,
    handleMouseLeave,
    sliderTransformStyle
  }
} 