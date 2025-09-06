'use client'

import {
  Box,
  HStack,
  VStack,
  Text,
  Button,
  Icon,
  Badge
} from '@chakra-ui/react'
import { FiMenu, FiLogOut, FiHome, FiBookOpen, FiFileText, FiPlus } from 'react-icons/fi'
import { useRouter, usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

interface AdminHeaderProps {
  onMenuToggle?: () => void
}

export default function AdminHeader({ onMenuToggle }: AdminHeaderProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [adminEmail, setAdminEmail] = useState<string>('')
  
  const bgColor = 'white'
  const borderColor = 'gray.200'
  const textColor = 'gray.900'
  const subTextColor = 'gray.600'
  const activeColor = 'green.600'
  const activeBg = 'green.50'

  useEffect(() => {
    // Admin email'ini al
    const email = process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'admin@nutriga.com'
    setAdminEmail(email)
  }, [])

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut()
      router.push('/admin')
    } catch (error) {
      console.error('Çıkış yapılırken hata:', error)
    }
  }

  const isActive = (href: string) => {
    if (href === '/admin/dashboard') {
      return pathname === '/admin/dashboard'
    }
    return pathname.startsWith(href)
  }

  return (
    <Box
      as="header"
      bg={bgColor}
      borderBottom="1px"
      borderColor={borderColor}
      px={{ base: 4, md: 6 }}
      py={{ base: 3, md: 4 }}
      position="sticky"
      top={0}
      zIndex={1100}
      boxShadow="sm"
    >
      <HStack justify="space-between" align="center" w="full">
        {/* Sol taraf - Logo */}
        <VStack align="start" gap={0} flexShrink={0}>
          <Text
            fontSize={{ base: "lg", md: "xl" }}
            fontWeight="bold"
            color={textColor}
            lineHeight="1"
          >
            Nutriga Akademi
          </Text>
          <Text
            fontSize={{ base: "xs", md: "sm" }}
            color={subTextColor}
            lineHeight="1"
          >
            Admin Panel
          </Text>
        </VStack>

        {/* Orta - Navigation (Desktop) */}
        <HStack gap={1} display={{ base: "none", md: "flex" }}>
          <Link href="/admin/dashboard">
            <Button
              variant="ghost"
              size="sm"
              color={isActive('/admin/dashboard') ? activeColor : textColor}
              bg={isActive('/admin/dashboard') ? activeBg : 'transparent'}
              _hover={{ bg: isActive('/admin/dashboard') ? activeBg : 'gray.50' }}
            >
              <Icon as={FiHome} mr={2} />
              Dashboard
            </Button>
          </Link>
          
          <Link href="/admin/egitimler">
            <Button
              variant="ghost"
              size="sm"
              color={isActive('/admin/egitimler') ? activeColor : textColor}
              bg={isActive('/admin/egitimler') ? activeBg : 'transparent'}
              _hover={{ bg: isActive('/admin/egitimler') ? activeBg : 'gray.50' }}
            >
              <Icon as={FiBookOpen} mr={2} />
              Eğitimler
            </Button>
          </Link>
          
          <Link href="/admin/blog">
            <Button
              variant="ghost"
              size="sm"
              color={isActive('/admin/blog') ? activeColor : textColor}
              bg={isActive('/admin/blog') ? activeBg : 'transparent'}
              _hover={{ bg: isActive('/admin/blog') ? activeBg : 'gray.50' }}
            >
              <Icon as={FiFileText} mr={2} />
              Blog
            </Button>
          </Link>
        </HStack>

        {/* Mobil Navigation */}
        <HStack gap={1} display={{ base: "flex", md: "none" }}>
          <Link href="/admin/dashboard">
            <Button
              variant="ghost"
              size="sm"
              color={isActive('/admin/dashboard') ? activeColor : textColor}
              bg={isActive('/admin/dashboard') ? activeBg : 'transparent'}
              _hover={{ bg: isActive('/admin/dashboard') ? activeBg : 'gray.50' }}
              px={2}
            >
              <Icon as={FiHome} />
            </Button>
          </Link>
          
          <Link href="/admin/egitimler">
            <Button
              variant="ghost"
              size="sm"
              color={isActive('/admin/egitimler') ? activeColor : textColor}
              bg={isActive('/admin/egitimler') ? activeBg : 'transparent'}
              _hover={{ bg: isActive('/admin/egitimler') ? activeBg : 'gray.50' }}
              px={2}
            >
              <Icon as={FiBookOpen} />
            </Button>
          </Link>
          
          <Link href="/admin/blog">
            <Button
              variant="ghost"
              size="sm"
              color={isActive('/admin/blog') ? activeColor : textColor}
              bg={isActive('/admin/blog') ? activeBg : 'transparent'}
              _hover={{ bg: isActive('/admin/blog') ? activeBg : 'gray.50' }}
              px={2}
            >
              <Icon as={FiFileText} />
            </Button>
          </Link>
        </HStack>

        {/* Sağ taraf - Admin bilgileri ve çıkış */}
        <HStack gap={{ base: 2, md: 4 }} flexShrink={0}>
          <Badge
            colorScheme="green"
            variant="subtle"
            px={{ base: 2, md: 3 }}
            py={1}
            borderRadius="full"
            fontSize="xs"
            display={{ base: "none", sm: "block" }}
          >
            Admin
          </Badge>
          
          <HStack gap={{ base: 1, md: 3 }}>
            <Text fontSize="sm" color={textColor} display={{ base: "none", lg: "block" }}>
              {adminEmail}
            </Text>
            <Button
              variant="ghost"
              size="sm"
              color={textColor}
              onClick={handleLogout}
              px={{ base: 2, md: 3 }}
            >
              <Icon as={FiLogOut} mr={{ base: 0, md: 2 }} />
              <Text display={{ base: "none", md: "block" }}>Çıkış</Text>
            </Button>
          </HStack>
        </HStack>
      </HStack>
    </Box>
  )
}
