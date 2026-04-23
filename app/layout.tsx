import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'WEAVER // ECOSYSTEM MATRIX',
  description: 'Classified technical documentation for the Weaver AI Ecosystem.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="scanline" />
        {children}
      </body>
    </html>
  )
}
