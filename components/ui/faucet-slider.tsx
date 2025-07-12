"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, X, Droplets, Zap, Shield, Code } from "lucide-react"

interface FaucetFeature {
  id: string
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  gradient: string
  codeExample: string
}

const faucetFeatures: FaucetFeature[] = [
  {
    id: "1",
    title: "💧 Instant Test Tokens",
    description: "Get free AVAX and ERC-20 tokens instantly for testing on Fuji testnet. No registration required.",
    icon: Droplets,
    gradient: "from-blue-600 via-cyan-600 to-teal-600",
    codeExample: `// Request testnet AVAX
const response = await fetch('/api/faucet', {
  method: 'POST',
  body: JSON.stringify({
    address: '0x...',
    network: 'fuji-c'
  })
});`
  },
  {
    id: "2",
    title: "⚡ Multi-Chain Support",
    description: "Support for C-Chain, P-Chain, and X-Chain testnets with different token types and amounts.",
    icon: Zap,
    gradient: "from-purple-600 via-pink-600 to-rose-600",
    codeExample: `// Multi-chain faucet request
const chains = ['fuji-c', 'fuji-p', 'fuji-x'];
const tokens = await Promise.all(
  chains.map(chain => requestTokens(address, chain))
);`
  },
  {
    id: "3",
    title: "🛡️ Rate Limiting & Security",
    description: "Built-in rate limiting and security measures to prevent abuse while ensuring fair access for developers.",
    icon: Shield,
    gradient: "from-emerald-600 via-green-600 to-lime-600",
    codeExample: `// Check rate limit status
const status = await fetch('/api/faucet/status', {
  params: { address: userAddress }
});
const { canRequest, nextRequest } = await status.json();`
  },
  {
    id: "4",
    title: "🔧 Developer Friendly",
    description: "Simple REST API and SDK integration for seamless testing workflow in your development environment.",
    icon: Code,
    gradient: "from-orange-600 via-amber-600 to-yellow-600",
    codeExample: `// Using Avalanche SDK
import { Faucet } from '@avalabs/avalanche-sdk';

const faucet = new Faucet('fuji');
await faucet.requestTokens(address, 'AVAX');`
  }
]

export function FaucetSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isVisible, setIsVisible] = useState(true)
  const [isClosing, setIsClosing] = useState(false);

  // Auto-advance slider
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % faucetFeatures.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % faucetFeatures.length)
    setIsAutoPlaying(false)
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + faucetFeatures.length) % faucetFeatures.length)
    setIsAutoPlaying(false)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
  }

  useEffect(() => {
    if (isClosing) {
      const timer = setTimeout(() => setIsVisible(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isClosing]);

  if (!isVisible && !isClosing) return null

  return (
    <div 
      className={`relative overflow-hidden transition-all duration-500 ${isClosing ? 'h-0' : 'h-64 sm:h-72 md:h-80 lg:h-56'} rounded-lg`}
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Slides container */}
      <div 
        className="flex h-full slider-transform"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {faucetFeatures.map((feature) => (
          <div
            key={feature.id}
            className={`relative flex-shrink-0 w-full h-full bg-gradient-to-r ${feature.gradient} text-white`}

          >
            <div className="absolute inset-0 bg-black/10" />
            
            <div className="relative h-full px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
              <div className="flex flex-col md:grid md:grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-6 max-w-7xl mx-auto h-full">
                {/* Content */}
                <div className="flex flex-col justify-start pt-4 sm:pt-6 md:pt-8 lg:pt-12 space-y-2 sm:space-y-3 flex-shrink-0">
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
                <div className="hidden md:flex flex-col justify-start pt-4 sm:pt-6 md:pt-8 lg:pt-12 rounded-lg shadow-2xl p-3 sm:p-4 lg:p-6 slider-code-container">
                  <div className="flex items-center gap-2 mb-2 sm:mb-3">
                    <Code className="h-4 w-4 slider-code-icon" />
                  </div>
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
        ))}
      </div>

      {/* Controls overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Close button */}
        <button
          onClick={() => setIsClosing(true)}
          className="absolute top-2 right-2 sm:top-4 sm:right-4 p-1.5 sm:p-2 rounded-full hover:bg-white/20 transition-colors z-10 pointer-events-auto"
        >
          <X className="h-4 w-4 sm:h-5 sm:w-5 slider-control-icon" />
        </button>

        {/* Navigation arrows */}
        <button
          onClick={goToPrevious}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full hover:bg-white/20 transition-colors z-10 pointer-events-auto"
        >
          <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 slider-control-icon" />
        </button>
        <button
          onClick={goToNext}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full hover:bg-white/20 transition-colors z-10 pointer-events-auto"
        >
          <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 slider-control-icon" />
        </button>

        {/* Slide indicators */}
        <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2 pointer-events-auto">
          {faucetFeatures.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'slider-indicator-active' : 'slider-indicator'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
} 