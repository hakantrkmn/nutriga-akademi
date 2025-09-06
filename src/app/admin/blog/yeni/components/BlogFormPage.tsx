'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  Box,
  VStack,
  HStack,
  Heading,
  Text,
  Button,
  Icon
} from '@chakra-ui/react'
import { FiArrowLeft } from 'react-icons/fi'
import { blogApi, BlogPostData } from '@/lib/api'
import AdminForm from '@/components/admin/AdminForm'

export default function BlogFormPage({ blogId }: { blogId?: string }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [initialData, setInitialData] = useState<BlogPostData | null>(null)
  const [loadingData, setLoadingData] = useState(!!blogId)

  const isEditing = !!blogId

  // Blog verilerini yükle (düzenleme modunda)
  useEffect(() => {
    if (blogId) {
      const loadBlogData = async () => {
        try {
          setLoadingData(true)
          const response = await blogApi.getById(blogId)
          
          if (response.success && response.data) {
            setInitialData(response.data)
          } else {
            console.error('Blog verileri yüklenemedi')
            router.push('/admin/blog')
          }
        } catch (error) {
          console.error('Blog verileri yüklenirken hata:', error)
          router.push('/admin/blog')
        } finally {
          setLoadingData(false)
        }
      }

      loadBlogData()
    }
  }, [blogId, router])

  // Form kaydetme
  const handleSave = async (data: Record<string, unknown>) => {
    try {
      setLoading(true)
      let response

      if (isEditing && blogId) {
        // Güncelle
        response = await blogApi.update(blogId, data)
      } else {
        // Yeni oluştur
        response = await blogApi.create(data as Omit<BlogPostData, 'id' | 'createdAt' | 'updatedAt'>)
      }

      if (response.success) {
        console.log(isEditing ? 'Blog yazısı güncellendi' : 'Blog yazısı oluşturuldu')
        router.push('/admin/blog')
      } else {
        console.error('İşlem başarısız:', response.error)
      }
    } catch (error) {
      console.error('Kaydetme hatası:', error)
    } finally {
      setLoading(false)
    }
  }

  // İptal
  const handleCancel = () => {
    router.push('/admin/blog')
  }

  if (loadingData) {
    return (
      <Box>
        <VStack gap={6} align="stretch">
          <HStack justify="space-between" align="center">
            <Box>
              <Heading size="lg" color="gray.900">
                Blog Yükleniyor...
              </Heading>
              <Text color="gray.600">
                Blog verileri yükleniyor, lütfen bekleyin
              </Text>
            </Box>
          </HStack>
        </VStack>
      </Box>
    )
  }

  return (
    <Box h="100vh" p={6}>
      <VStack gap={6} align="stretch" h="full">
        {/* Header */}
        <HStack justify="space-between" align="center" flexShrink={0}>
          <Box>
            <Heading size="lg" color="gray.900">
              {isEditing ? 'Blog Yazısı Düzenle' : 'Yeni Blog Yazısı Ekle'}
            </Heading>
            <Text color="gray.600">
              {isEditing ? 'Blog yazısı bilgilerini düzenleyin' : 'Yeni bir blog yazısı oluşturun'}
            </Text>
          </Box>
          <HStack gap={3}>
            <Button
              variant="outline"
              onClick={handleCancel}
            >
              <Icon as={FiArrowLeft} mr={2} />
              Geri Dön
            </Button>
          </HStack>
        </HStack>

        {/* Form - Tam ekran kullanım */}
        <Box
          flex="1"
          overflow="auto"
        >
          <AdminForm
            type="blog"
            initialData={initialData as unknown as Record<string, unknown> | undefined}
            onSave={handleSave}
            onCancel={handleCancel}
            loading={loading}
          />
        </Box>
      </VStack>
    </Box>
  )
}