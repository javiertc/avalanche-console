"use client"

import { useState, useEffect } from "react"
import { X, ArrowRight, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Announcement {
  id: string
  title: string
  description: string
  primaryButton: {
    text: string
    link: string
  }
  secondaryButton: {
    text: string
    link: string
  }
  gradient: string
}

const announcements: Announcement[] = [
  {
    id: "1",
    title: "🚀 New Avalanche Developer Tools",
    description: "Build faster with our enhanced APIs, improved documentation, and powerful new features. Everything you need to create the next generation of dApps on Avalanche.",
    primaryButton: {
      text: "Explore Features",
      link: "https://docs.avax.network"
    },
    secondaryButton: {
      text: "Read Docs",
      link: "https://developers.avacloud.io"
    },
    gradient: "from-purple-600 via-pink-600 to-blue-600"
  },
  {
    id: "2",
    title: "⚡ Lightning Fast RPC Endpoints",
    description: "Experience blazing fast blockchain interactions with our optimized RPC infrastructure. Now with 99.9% uptime and global edge locations.",
    primaryButton: {
      text: "Try Now",
      link: "/rpcs"
    },
    secondaryButton: {
      text: "View Stats",
      link: "https://status.avax.network"
    },
    gradient: "from-blue-600 via-cyan-600 to-teal-600"
  },
  {
    id: "3",
    title: "🔗 Enhanced Webhook API",
    description: "Real-time blockchain event notifications with advanced filtering and reliable delivery. Monitor your dApps like never before.",
    primaryButton: {
      text: "Get Started",
      link: "/webhooks-api"
    },
    secondaryButton: {
      text: "Learn More",
      link: "https://developers.avacloud.io/webhooks-api/overview"
    },
    gradient: "from-green-600 via-emerald-600 to-cyan-600"
  }
]

export function AnnouncementBanner() {
  const [isVisible, setIsVisible] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-advance carousel
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length)
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % announcements.length)
    setIsAutoPlaying(false)
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + announcements.length) % announcements.length)
    setIsAutoPlaying(false)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
  }

  if (!isVisible) return null

  const currentAnnouncement = announcements[currentIndex]

  return (
    <div 
      className="relative overflow-hidden w-full h-28 rounded-lg"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Slides container */}
      <div 
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {announcements.map((announcement, index) => (
          <div
            key={announcement.id}
            className={`relative flex-shrink-0 w-full h-full bg-gradient-to-r ${announcement.gradient} text-white`}
          >
            <div className="absolute inset-0 bg-black/10" />
            
            <div className="relative h-full px-8 py-4">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-4 max-w-7xl mx-auto h-full">
                {/* Content */}
                <div className="flex-1 text-center lg:text-left">
                  <h2 className="text-lg lg:text-xl font-bold mb-1.5 !text-white">
                    {announcement.title}
                  </h2>
                  <p className="text-sm !text-white/90 mb-0 max-w-2xl line-clamp-2">
                    {announcement.description}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-2 lg:flex-shrink-0">
                  <Button
                    variant="secondary"
                    className="bg-white text-purple-600 hover:bg-gray-100 font-semibold px-4 py-2 gap-2 text-sm"
                    onClick={() => {
                      if (announcement.primaryButton.link.startsWith('http')) {
                        window.open(announcement.primaryButton.link, '_blank')
                      } else {
                        window.location.href = announcement.primaryButton.link
                      }
                    }}
                  >
                    {announcement.primaryButton.text}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    className="border-white/50 bg-white/10 !text-white hover:bg-white/20 font-semibold px-4 py-2 gap-2 backdrop-blur-sm text-sm"
                    onClick={() => {
                      if (announcement.secondaryButton.link.startsWith('http')) {
                        window.open(announcement.secondaryButton.link, '_blank')
                      } else {
                        window.location.href = announcement.secondaryButton.link
                      }
                    }}
                  >
                    {announcement.secondaryButton.text}
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>

                              {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-white/5 rounded-full -translate-y-10 translate-x-10" />
                <div className="absolute bottom-0 left-0 w-14 h-14 bg-white/5 rounded-full translate-y-7 -translate-x-7" />
            </div>
          </div>
        ))}
      </div>

      {/* Controls overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Close button */}
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-3 right-3 p-1 rounded-full hover:bg-white/20 transition-colors z-10 pointer-events-auto"
        >
          <X className="h-4 w-4 !text-white" />
        </button>

        {/* Navigation arrows */}
        <button
          onClick={goToPrevious}
          className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-white/20 transition-colors z-10 pointer-events-auto"
        >
          <ChevronLeft className="h-4 w-4 !text-white" />
        </button>
        <button
          onClick={goToNext}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-white/20 transition-colors z-10 pointer-events-auto"
        >
          <ChevronRight className="h-4 w-4 !text-white" />
        </button>

        {/* Slide indicators */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 pointer-events-auto">
          {announcements.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? '!bg-white' : '!bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
} 