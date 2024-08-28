import type { Metadata } from 'next'
import { Amiri } from 'next/font/google'

import NavMenu from '@/components/navMenu'
import './globals.css'

// If loading a variable font, you don't need to specify the font weight
const amiri = Amiri({ weight: ['400', '700'], subsets: ['arabic'] })

const rtl = true
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_FRONTEND_BASE_URL || 'http://localhost:3000'
  ),
  title: 'مصحف المدينة المنورة - ورش',
  description: 'موقع لعرض اللمصحف الكريم برواية ورش عن طريق الأزرق',
  category: 'website',
  generator: 'Next.js',
}

export const viewport = {
  width: 1,
  themeColor: 'dark',
}

type Props = {
  children: React.ReactNode
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="ar" dir={`${rtl ? 'rtl' : 'ltr'}`}>
      <body className={amiri.className}>
        <NavMenu />
        <main role="main">{children}</main>
      </body>
    </html>
  )
}
