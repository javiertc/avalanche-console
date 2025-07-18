import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { AppLayout } from "@/components/layout/AppLayout"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Avalanche Developer Console",
  description: "Build, test, and deploy on Avalanche with comprehensive developer tools and APIs.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AppLayout>
            {children}
          </AppLayout>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
