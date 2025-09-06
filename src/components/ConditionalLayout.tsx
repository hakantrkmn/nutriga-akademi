'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'

interface ConditionalLayoutProps {
  children: React.ReactNode
}

export default function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname()
  
  // Admin sayfaları için header ve footer gösterme
  const isAdminPage = pathname.startsWith('/admin')
  
  useEffect(() => {
    // Admin sayfaları için body class'ını ayarla
    if (isAdminPage) {
      document.body.classList.add('admin-layout')
    } else {
      document.body.classList.remove('admin-layout')
    }
    
    // Cleanup
    return () => {
      document.body.classList.remove('admin-layout')
    }
  }, [isAdminPage])
  
  if (isAdminPage) {
    return <>{children}</>
  }
  
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}
