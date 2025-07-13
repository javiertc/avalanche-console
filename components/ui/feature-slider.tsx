"use client"

import { memo } from "react"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { useSlider } from "@/hooks/useSlider"
import { cn } from "@/lib/utils"

export interface FeatureSlide {
  id: string
  title: string
  description: string
  gradient: string
  codeExample: string
}

interface FeatureSliderProps {
  features: FeatureSlide[]
  autoPlayInterval?: number
  className?: string
}

export const FeatureSlider = memo(function FeatureSlider({
  features,
  autoPlayInterval = 4000,
  className
}: FeatureSliderProps) {
  const {
    currentIndex,
    isVisible,
    isClosing,
    goToNext,
    goToPrevious,
    goToSlide,
    handleClose,
    handleMouseEnter,
    handleMouseLeave,
    sliderTransformStyle
  } = useSlider({
    itemsLength: features.length,
    autoPlayInterval,
    autoPlayEnabled: true
  })

  if (!isVisible && !isClosing) return null

  return (
    <div 
      className={cn(
        "relative overflow-hidden transition-all duration-500",
        isClosing ? "h-0" : "h-56 sm:h-64 md:h-72 lg:h-56",
        "rounded-lg",
        className
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Slides container */}
      <div 
        className="flex h-full slider-transform transition-transform duration-500 ease-in-out"
        style={sliderTransformStyle}
      >
        {features.map((feature) => (
          <SlideContent 
            key={feature.id} 
            feature={feature}
          />
        ))}
      </div>

      {/* Controls overlay */}
      <SliderControls
        currentIndex={currentIndex}
        featuresLength={features.length}
        onClose={handleClose}
        onPrevious={goToPrevious}
        onNext={goToNext}
        onSlideSelect={goToSlide}
      />
    </div>
  )
})

// Separate slide content component for better performance
const SlideContent = memo(function SlideContent({ 
  feature
}: { 
  feature: FeatureSlide
}) {
  return (
    <div
      className={`relative flex-shrink-0 w-full h-full bg-gradient-to-r ${feature.gradient} text-white`}
    >
      <div className="absolute inset-0 bg-black/10" />
      
      <div className="relative h-full px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
        <div className="flex flex-col md:grid md:grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-6 max-w-7xl mx-auto h-full">
          {/* Content */}
          <div className="flex flex-col justify-start pt-2 sm:pt-3 md:pt-4 lg:pt-6 space-y-2 sm:space-y-3 flex-shrink-0">
            <div className="flex items-center gap-2 sm:gap-3">
              <h2 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold leading-tight slider-title">
                {feature.title}
              </h2>
            </div>
            <p className="text-xs sm:text-sm md:text-base leading-relaxed slider-description">
              {feature.description}
            </p>
          </div>

          {/* Code Example - Hidden on mobile, shown on larger screens */}
          <div className="hidden md:flex flex-col justify-start pt-2 sm:pt-3 md:pt-4 lg:pt-6 rounded-lg shadow-2xl p-3 sm:p-4 lg:p-6 slider-code-container">
            <pre className="text-xs font-mono leading-relaxed overflow-x-auto slider-code-text">
              {feature.codeExample}
            </pre>
          </div>
        </div>

        {/* Decorative elements - smaller on mobile */}
        <div className="absolute top-0 right-0 w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-white/5 rounded-full -translate-y-8 translate-x-8 sm:-translate-y-12 sm:translate-x-12 lg:-translate-y-16 lg:translate-x-16" />
        <div className="absolute bottom-0 left-0 w-12 h-12 sm:w-18 sm:h-18 lg:w-24 lg:h-24 bg-white/5 rounded-full translate-y-6 -translate-x-6 sm:translate-y-9 sm:-translate-x-9 lg:translate-y-12 lg:-translate-x-12" />
      </div>
    </div>
  )
})

// Separate controls component for better organization
const SliderControls = memo(function SliderControls({ 
  currentIndex, 
  featuresLength, 
  onClose, 
  onPrevious, 
  onNext, 
  onSlideSelect 
}: {
  currentIndex: number
  featuresLength: number
  onClose: () => void
  onPrevious: () => void
  onNext: () => void
  onSlideSelect: (index: number) => void
}) {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-2 right-2 sm:top-4 sm:right-4 p-1.5 sm:p-2 rounded-full hover:bg-white/20 transition-colors z-10 pointer-events-auto"
        aria-label="Close slider"
      >
        <X className="h-4 w-4 sm:h-5 sm:w-5 slider-control-icon" />
      </button>

      {/* Navigation arrows */}
      <button
        onClick={onPrevious}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full hover:bg-white/20 transition-colors z-10 pointer-events-auto"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 slider-control-icon" />
      </button>
      <button
        onClick={onNext}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full hover:bg-white/20 transition-colors z-10 pointer-events-auto"
        aria-label="Next slide"
      >
        <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 slider-control-icon" />
      </button>

      {/* Slide indicators */}
      <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2 pointer-events-auto">
        {Array.from({ length: featuresLength }, (_, index) => (
          <button
            key={index}
            onClick={() => onSlideSelect(index)}
            className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'slider-indicator-active' : 'slider-indicator'
            }`}
            role="tab"
            aria-selected={index === currentIndex}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}) 