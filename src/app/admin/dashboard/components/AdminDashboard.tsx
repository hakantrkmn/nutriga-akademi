'use client'

import { useEffect, useState } from 'react'
import {
  Box,
  VStack,
  Heading,
  Text,
  Grid,
  GridItem
} from '@chakra-ui/react'
import { FiBookOpen, FiFileText, FiUsers, FiTrendingUp } from 'react-icons/fi'
import { adminApi, AdminStats } from '@/lib/api'
import StatCard from '@/components/admin/StatCard'
// AdminSidebar artık layout'ta kullanılıyor

// AdminStats interface'i zaten api.ts'de tanımlı

export default function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats>({
    totalEgitimler: 0,
    totalBlogYazilari: 0,
    totalKullanicilar: 0,
    totalSatislar: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardStats()
  }, [])

  const fetchDashboardStats = async () => {
    try {
      setLoading(true)
      
      const response = await adminApi.getStats()
      
      if (response.success && response.data) {
        setStats(response.data)
      } else {
        console.error('İstatistikler alınamadı:', response.error)
      }
    } catch (error) {
      console.error('Dashboard istatistikleri alınırken hata:', error)
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    {
      title: 'Toplam Eğitimler',
      value: stats.totalEgitimler,
      icon: FiBookOpen,
      color: 'blue'
    },
    {
      title: 'Blog Yazıları',
      value: stats.totalBlogYazilari,
      icon: FiFileText,
      color: 'green'
    },
    {
      title: 'Toplam Kullanıcılar',
      value: stats.totalKullanicilar,
      icon: FiUsers,
      color: 'purple'
    },
    {
      title: 'Toplam Satışlar',
      value: stats.totalSatislar,
      icon: FiTrendingUp,
      color: 'orange'
    }
  ]

  return (
    <Box>
        <VStack gap={6} align="stretch">
          {/* Header */}
          <Box>
            <Heading size="xl" color="gray.900" mb={2}>
              Dashboard
            </Heading>
            <Text color="gray.600">
              NutriHome Akademi Admin Paneli - Genel Bakış
            </Text>
          </Box>

          {/* Stats Grid */}
          <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} gap={6}>
            {statCards.map((stat, index) => (
              <GridItem key={index}>
                <StatCard
                  title={stat.title}
                  value={stat.value}
                  icon={stat.icon}
                  color={stat.color}
                  loading={loading}
                />
              </GridItem>
            ))}
          </Grid>
        </VStack>
    </Box>
  )
}
