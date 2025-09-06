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
import { egitimlerApi, EgitimData } from '@/lib/api'
import AdminForm from '@/components/admin/AdminForm'

export default function EgitimFormPage({ egitimId }: { egitimId?: string }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [initialData, setInitialData] = useState<EgitimData | null>(null)
  const [loadingData, setLoadingData] = useState(!!egitimId)

  const isEditing = !!egitimId

  // Eğitim verilerini yükle (düzenleme modunda)
  useEffect(() => {
    if (egitimId) {
      const loadEgitimData = async () => {
        try {
          setLoadingData(true)
          const response = await egitimlerApi.getById(egitimId)
          
          if (response.success && response.data) {
            setInitialData(response.data)
          } else {
            console.error('Eğitim verileri yüklenemedi')
            router.push('/admin/egitimler')
          }
        } catch (error) {
          console.error('Eğitim verileri yüklenirken hata:', error)
          router.push('/admin/egitimler')
        } finally {
          setLoadingData(false)
        }
      }

      loadEgitimData()
    }
  }, [egitimId, router])

  // Form kaydetme
  const handleSave = async (data: Record<string, unknown>) => {
    try {
      setLoading(true)
      let response

      if (isEditing && egitimId) {
        // Güncelle
        response = await egitimlerApi.update(egitimId, data)
      } else {
        // Yeni oluştur
        response = await egitimlerApi.create(data as Omit<EgitimData, 'id' | 'createdAt' | 'updatedAt'>)
      }

      if (response.success) {
        console.log(isEditing ? 'Eğitim güncellendi' : 'Eğitim oluşturuldu')
        router.push('/admin/egitimler')
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
    router.push('/admin/egitimler')
  }

  if (loadingData) {
    return (
      <Box>
        <VStack gap={6} align="stretch">
          <HStack justify="space-between" align="center">
            <Box>
              <Heading size="lg" color="gray.900">
                Eğitim Yükleniyor...
              </Heading>
              <Text color="gray.600">
                Eğitim verileri yükleniyor, lütfen bekleyin
              </Text>
            </Box>
          </HStack>
        </VStack>
      </Box>
    )
  }

  return (
    <Box>
      <VStack gap={6} align="stretch">
        {/* Header */}
        <HStack justify="space-between" align="center">
          <Box>
            <Heading size="lg" color="gray.900">
              {isEditing ? 'Eğitim Düzenle' : 'Yeni Eğitim Ekle'}
            </Heading>
            <Text color="gray.600">
              {isEditing ? 'Eğitim bilgilerini düzenleyin' : 'Yeni bir eğitim oluşturun'}
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

        {/* Form */}
        <Box
          bg="white"
          borderRadius="lg"
          boxShadow="sm"
          p={8}
        >
          <AdminForm
            type="egitim"
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