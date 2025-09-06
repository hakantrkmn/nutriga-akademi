'use client'

import {
  Box,
  VStack,
  Text,
  Button,
  Icon,
  useDisclosure
} from '@chakra-ui/react'
import { 
  FiHome, 
  FiBookOpen, 
  FiFileText, 
  FiLogOut,
  FiMenu,
  FiX
} from 'react-icons/fi'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

interface AdminSidebarProps {
  activeTab: string
}

export default function AdminSidebar({ activeTab }: AdminSidebarProps) {
  const { open: isOpen, onToggle } = useDisclosure()
  const router = useRouter()

  const sidebarBg = 'white'
  const borderColor = 'gray.200'

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut()
      router.push('/admin')
    } catch (error) {
      console.error('Çıkış hatası:', error)
    }
  }

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: FiHome,
      href: '/admin/dashboard'
    },
    {
      id: 'egitimler',
      label: 'Eğitimler',
      icon: FiBookOpen,
      href: '/admin/egitimler'
    },
    {
      id: 'blog',
      label: 'Blog',
      icon: FiFileText,
      href: '/admin/blog'
    }
  ]

  return (
    <>
      {/* Mobile Menu Button */}
      <Box
        display={{ base: 'block', lg: 'none' }}
        position="fixed"
        top={4}
        left={4}
        zIndex={1000}
      >
        <Button
          onClick={onToggle}
          size="sm"
          variant="outline"
          bg="white"
          shadow="md"
        >
          <Icon as={isOpen ? FiX : FiMenu} />
        </Button>
      </Box>

      {/* Sidebar */}
      <Box
        position="fixed"
        left={0}
        top={0}
        h="100vh"
        w={{ base: isOpen ? '280px' : '0', lg: '280px' }}
        bg={sidebarBg}
        borderRight="1px"
        borderColor={borderColor}
        transition="width 0.3s ease"
        overflow="hidden"
        zIndex={999}
        shadow={{ base: isOpen ? 'xl' : 'none', lg: 'sm' }}
      >
        <VStack h="full" p={6} gap={8} align="stretch">
          {/* Logo */}
          <Box>
            <Text fontSize="xl" fontWeight="bold" color="green.600">
              NutriHome
            </Text>
            <Text fontSize="sm" color="gray.500">
              Admin Panel
            </Text>
          </Box>

          {/* Navigation */}
          <VStack gap={2} align="stretch" flex="1">
            {menuItems.map((item) => {
              const isActive = activeTab === item.id
              return (
                <Link key={item.id} href={item.href}>
                  <Button
                    variant={isActive ? 'solid' : 'ghost'}
                    colorScheme={isActive ? 'green' : 'gray'}
                    justifyContent="flex-start"
                    w="full"
                    h="48px"
                    _hover={{
                      bg: isActive ? 'green.600' : 'gray.100'
                    }}
                  >
                    <Icon as={item.icon} mr={2} />
                    {item.label}
                  </Button>
                </Link>
              )
            })}
          </VStack>

          {/* Logout */}
          <Box>
            <Button
              variant="ghost"
              colorScheme="red"
              justifyContent="flex-start"
              w="full"
              h="48px"
              onClick={handleLogout}
              _hover={{
                bg: 'red.50',
                color: 'red.600'
              }}
            >
              <Icon as={FiLogOut} mr={2} />
              Çıkış Yap
            </Button>
          </Box>
        </VStack>
      </Box>

      {/* Overlay for mobile */}
      {isOpen && (
        <Box
          position="fixed"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg="blackAlpha.600"
          zIndex={998}
          display={{ base: 'block', lg: 'none' }}
          onClick={onToggle}
        />
      )}
    </>
  )
}
