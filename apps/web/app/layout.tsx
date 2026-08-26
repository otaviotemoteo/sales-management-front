import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { DM_Sans, Allison } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Suspense } from "react"
import { AuthProvider } from "@/contexts/auth-context"
import { Toaster } from "@/components/ui/toaster"

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" })
const allison = Allison({ weight: "400", subsets: ["latin"], variable: "--font-allison" })

export const metadata: Metadata = {
  title: "Sales Management",
  description:
    "A complete way to manage products, sellers, customers and sales, with dashboards and detailed reports.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body suppressHydrationWarning className={`font-sans ${GeistSans.variable} ${GeistMono.variable} ${dmSans.variable} ${allison.variable}`}>
        <AuthProvider>
          <Suspense fallback={null}>
            {children}
            <Analytics />
          </Suspense>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  )
}
