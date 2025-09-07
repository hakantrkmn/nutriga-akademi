'use client'

import { usePathname } from 'next/navigation'
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'

interface ConditionalLayoutProps {
  children: React.ReactNode
}

export default function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname()
  
  // Admin sayfaları için sadece children (kendi layout'ları var)
  if (pathname.startsWith('/admin')) {
    return <>{children}</>
  }
  
  // Normal sayfalar için header ve footer
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}