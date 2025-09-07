'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  Box,
  Container,
  VStack,
  HStack,
  Heading,
  Text,
  Button,
  Icon,
  Grid,
  GridItem,
  Input,
  NativeSelectField,
  NativeSelectRoot,
  Image
} from '@chakra-ui/react'
import { 
  FiArrowLeft, 
  FiSave
} from 'react-icons/fi'
import { blogApi } from '@/lib/api'
import { BlogPost } from '@/types'
import TipTapEditor from '@/components/admin/TipTapEditor'

export default function BlogFormPage({ blogId }: { blogId?: string }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [, setInitialData] = useState<BlogPost | null>(null)
  const [loadingData, setLoadingData] = useState(!!blogId)
  
  // Form state
  const [formData, setFormData] = useState<BlogPost>({
    title: '',
    excerpt: '',
    content: null as object | null,
    imageUrl: '',
    slug: '',
    category: 'Genel',
    author: 'Admin',
    createdAt: new Date(),
    updatedAt: new Date(),
    id: ''
  })
  
  // Görsel yükleme state'i
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)

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
            setFormData(response.data)
            setUploadedImage(response.data.imageUrl || null)
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
  const handleSave = async () => {
    try {
      setLoading(true)
      const data = {
        title: formData.title,
        excerpt: formData.excerpt,
        content: JSON.stringify(formData.content),
        imageUrl: uploadedImage || '',
        slug: formData.slug,
        category: formData.category,
        author: formData.author
      }
      
      let response

      if (isEditing && blogId) {
        // Güncelle
        response = await blogApi.update(blogId, data)
      } else {
        // Yeni oluştur
        response = await blogApi.create(data as Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>)
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

  // Görsel yükleme fonksiyonu
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Dosya boyutunu kontrol et (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      alert('Dosya boyutu 10MB\'dan küçük olmalıdır')
      return
    }

    // Dosya türünü kontrol et
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml']
    if (!allowedTypes.includes(file.type)) {
      alert('Sadece JPG, PNG, GIF, WebP ve SVG dosyaları yüklenebilir')
      return
    }

    try {
      setUploading(true)
      
      // FormData oluştur
      const formData = new FormData()
      formData.append('file', file)

      // Upload API'sine gönder
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      const result = await response.json()

      if (result.success) {
        setUploadedImage(result.url)
      } else {
        alert(`Upload hatası: ${result.error}`)
      }
    } catch (error) {
      console.error('Upload hatası:', error)
      alert('Dosya yüklenirken bir hata oluştu')
    } finally {
      setUploading(false)
    }
  }

  // İptal
  const handleCancel = () => {
    router.push('/admin/blog')
  }

  if (loadingData) {
    return (
      <Container maxW="800px" p={6}>
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
      </Container>
    )
  }

  return (
    <Container maxW="800px" p={6}>
      <VStack gap={6} align="stretch">
        {/* Header */}
        <HStack justify="space-between" align="center">
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
            <Button
              colorScheme="green"
              onClick={handleSave}
              loading={loading}
              loadingText="Kaydediliyor..."
            >
              <Icon as={FiSave} mr={2} />
              {isEditing ? 'Güncelle' : 'Kaydet'}
            </Button>
          </HStack>
        </HStack>

        {/* Blog Bilgileri - Üstte */}
        <Box p={6} bg="white" borderRadius="lg" border="1px solid" borderColor="gray.200" shadow="sm">
          <VStack gap={4} align="stretch">
            <Heading size="md" color="gray.900">
              Blog Bilgileri
            </Heading>
            
            <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
              {/* Başlık */}
              <GridItem>
                <Box>
                  <Text fontSize="sm" fontWeight="medium" color="gray.700" mb={2}>
                    Blog Başlığı
                  </Text>
                  <Input
                    placeholder="Blog yazısının başlığını girin..."
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    size="lg"
                  />
                </Box>
              </GridItem>

              {/* Slug */}
              <GridItem>
                <Box>
                  <Text fontSize="sm" fontWeight="medium" color="gray.700" mb={2}>
                    URL Slug
                  </Text>
                  <Input
                    placeholder="blog-yazisi-slug"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  />
                </Box>
              </GridItem>

              {/* Kategori */}
              <GridItem>
                <Box>
                  <Text fontSize="sm" fontWeight="medium" color="gray.700" mb={2}>
                    Kategori
                  </Text>
                  <NativeSelectRoot>
                    <NativeSelectField
                      value={formData.category || ''}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    >
                      <option value="Genel">Genel</option>
                      <option value="Beslenme">Beslenme</option>
                      <option value="Sağlık">Sağlık</option>
                      <option value="Yaşam Tarzı">Yaşam Tarzı</option>
                      <option value="Haberler">Haberler</option>
                      <option value="İpuçları">İpuçları</option>
                    </NativeSelectField>
                  </NativeSelectRoot>
                </Box>
              </GridItem>

              {/* Yazar */}
              <GridItem>
                <Box>
                  <Text fontSize="sm" fontWeight="medium" color="gray.700" mb={2}>
                    Yazar
                  </Text>
                  <Input
                    placeholder="Yazar adı"
                    value={formData.author || ''}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  />
                </Box>
              </GridItem>

              {/* Yayın Tarihi */}
              <GridItem>
                <Box>
                  <Text fontSize="sm" fontWeight="medium" color="gray.700" mb={2}>
                    Yayın Tarihi
                  </Text>
                  <Input
                    type="date"
                    value={formData.createdAt ? new Date(formData.createdAt).toISOString().split('T')[0] : ''}
                    onChange={(e) => setFormData({ ...formData, createdAt: new Date(e.target.value) })}
                  />
                </Box>
              </GridItem>

              {/* Görsel Yükleme */}
              <GridItem>
                <Box>
                  <Text fontSize="sm" fontWeight="medium" color="gray.700" mb={2}>
                    Blog Görseli
                  </Text>
                  <VStack gap={3} align="stretch">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      style={{ display: 'none' }}
                      id="image-upload"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      loading={uploading}
                      loadingText="Yükleniyor..."
                      cursor="pointer"
                      onClick={() => document.getElementById('image-upload')?.click()}
                    >
                      {uploadedImage ? 'Görseli Değiştir' : 'Görsel Yükle'}
                    </Button>
                    {uploadedImage && (
                      <Box>
                        <Text fontSize="xs" color="green.600" mb={2}>
                          ✓ Görsel yüklendi
                        </Text>
                        <Image
                          src={uploadedImage}
                          alt="Blog görseli"
                          w="100%"
                          h="120px"
                          objectFit="cover"
                          borderRadius="md"
                          border="1px solid"
                          borderColor="gray.200"
                        />
                      </Box>
                    )}
                  </VStack>
                </Box>
              </GridItem>
            </Grid>

            {/* Açıklama - Tam genişlik */}
            <Box>
              <Text fontSize="sm" fontWeight="medium" color="gray.700" mb={2}>
                Kısa Açıklama
              </Text>
              <Input
                placeholder="Blog yazısının kısa açıklamasını girin..."
                value={formData.excerpt || ''}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                size="lg"
              />
            </Box>
          </VStack>
        </Box>

        {/* İçerik Editor - Tam genişlik */}
        <Box p={6} bg="white" borderRadius="lg" border="1px solid" borderColor="gray.200" shadow="sm">
          <VStack gap={4} align="stretch">
            <Heading size="md" color="gray.900">
              Blog İçeriği
            </Heading>
            <TipTapEditor
              content={formData.content as object}
              onChange={(content) => setFormData({ ...formData, content })}
              placeholder="Blog yazısının içeriğini buraya yazın..."
            />
          </VStack>
        </Box>
      </VStack>
    </Container>
  )
}