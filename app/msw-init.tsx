'use client'

import { useEffect, useState } from 'react'

export function MSWProvider({ children }: { children: React.ReactNode }) {
  const [mockingEnabled, setMockingEnabled] = useState(false)

  useEffect(() => {
    // Only enable mocking in development
    if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_ENABLE_MOCKING === 'true') {
      import('@/mocks/browser').then(({ worker }) => {
        worker.start({
          onUnhandledRequest: 'bypass',
          serviceWorker: {
            url: '/mockServiceWorker.js'
          }
        }).then(() => {
          setMockingEnabled(true)
          console.log('🔧 Mock Service Worker enabled')
        })
      })
    } else {
      setMockingEnabled(true)
    }
  }, [])

  // Don't render until mocking is set up (in development)
  if (!mockingEnabled && process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_ENABLE_MOCKING === 'true') {
    return null
  }

  return <>{children}</>
} 