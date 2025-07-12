"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, X, Zap, Globe, Shield, Code } from "lucide-react"

interface RPCFeature {
  id: string
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  gradient: string
  codeExample: string
}

const rpcFeatures: RPCFeature[] = [
  {
    id: "1",
    title: "⚡ Lightning Fast RPC",
    description: "Ultra-low latency RPC endpoints with global edge locations and intelligent routing for maximum performance.",
    icon: Zap,
    gradient: "from-blue-600 via-cyan-600 to-teal-600",
    codeExample: `// High-performance RPC call
const provider = new ethers.JsonRpcProvider(
  'https://api.avax.network/ext/bc/C/rpc'
);

const blockNumber = await provider.getBlockNumber();
console.log('Latest block:', blockNumber);`
  },
  {
    id: "2",
    title: "🌍 Global Infrastructure",
    description: "Worldwide network of RPC nodes with automatic failover and load balancing for 99.9% uptime guarantee.",
    icon: Globe,
    gradient: "from-purple-600 via-pink-600 to-rose-600",
    codeExample: `// Multi-region RPC setup
const providers = [
  'https://us-east.avax.network/ext/bc/C/rpc',
  'https://eu-west.avax.network/ext/bc/C/rpc',
  'https://asia.avax.network/ext/bc/C/rpc'
];

const provider = new FallbackProvider(providers);`
  },
  {
    id: "3",
    title: "🛡️ Enterprise Security",
    description: "Bank-grade security with API key authentication, rate limiting, and comprehensive monitoring and analytics.",
    icon: Shield,
    gradient: "from-emerald-600 via-green-600 to-lime-600",
    codeExample: `// Secure RPC with API key
const provider = new ethers.JsonRpcProvider({
  url: 'https://api.avax.network/ext/bc/C/rpc',
  headers: {
    'X-API-Key': process.env.AVAX_API_KEY
  }
});`
  },
  {
    id: "4",
    title: "🔧 Developer Tools",
    description: "Advanced debugging tools, request analytics, and comprehensive documentation for seamless integration.",
    icon: Code,
    gradient: "from-orange-600 via-amber-600 to-yellow-600",
    codeExample: `// Debug mode with analytics
const provider = new ethers.JsonRpcProvider({
  url: 'https://api.avax.network/ext/bc/C/rpc',
  debug: true,
  analytics: {
    trackCalls: true,
    logPerformance: true
  }
});`
  }
]

export function RPCSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isVisible, setIsVisible] = useState(true)
  const [isClosing, setIsClosing] = useState(false);

  // Auto-advance slider
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % rpcFeatures.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % rpcFeatures.length)
    setIsAutoPlaying(false)
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + rpcFeatures.length) % rpcFeatures.length)
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
        {rpcFeatures.map((feature) => (
          <div
            key={feature.id}
            className={`relative flex-shrink-0 w-full h-full bg-gradient-to-r ${feature.gradient} text-white`}

          >
            <div className="absolute inset-0 bg-black/10" />
            
            <div className="relative h-full px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-6 max-w-7xl mx-auto h-full">
                {/* Content */}
                <div className="flex flex-col justify-start pt-8 sm:pt-12 space-y-2 sm:space-y-3">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <h2 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-bold leading-tight !text-white">
                      {feature.title}
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm lg:text-base !text-white/90 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Code Example */}
                <div className="flex flex-col justify-start pt-8 sm:pt-12 rounded-lg shadow-2xl p-3 sm:p-4 lg:p-6 slider-code-container">
                  <div className="flex items-center gap-2 mb-2 sm:mb-3">
                    <Code className="h-4 w-4 slider-code-icon" />
                  </div>
                  <pre className="text-xs font-mono leading-relaxed overflow-x-auto slider-code-text">
                    {feature.codeExample}
                  </pre>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12" />
            </div>
          </div>
        ))}
      </div>

      {/* Controls overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Close button */}
        <button
          onClick={() => setIsClosing(true)}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/20 transition-colors z-10 pointer-events-auto"
        >
          <X className="h-5 w-5 !text-white" />
        </button>

        {/* Navigation arrows */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full hover:bg-white/20 transition-colors z-10 pointer-events-auto"
        >
          <ChevronLeft className="h-5 w-5 !text-white" />
        </button>
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full hover:bg-white/20 transition-colors z-10 pointer-events-auto"
        >
          <ChevronRight className="h-5 w-5 !text-white" />
        </button>

        {/* Slide indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 pointer-events-auto">
          {rpcFeatures.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex ? '!bg-white' : '!bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
} 