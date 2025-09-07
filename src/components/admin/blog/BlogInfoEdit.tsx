import { BlogPost } from '@/types'
import { Box, VStack, Heading, Text, Input, Grid, GridItem, NativeSelectField, NativeSelectRoot, Image, Button } from '@chakra-ui/react'

interface BlogInfoEditProps {
  formData: BlogPost
  setFormData: (data: BlogPost) => void
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
  uploading: boolean
  uploadedImage: string | null
}


export default function BlogInfoEdit({ formData, setFormData, handleImageUpload, uploading, uploadedImage }: BlogInfoEditProps) {
  return (
    <Box p={6} bg="white" borderRadius="lg" border="1px solid" borderColor="gray.200" shadow="sm" w="full">
    <VStack gap={4} align="stretch">
      <Heading size="lg" color="gray.900">
        Blog Bilgileri
      </Heading>
      
      <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
        {/* Başlık */}
        <GridItem>
          <Box>
            <Text fontSize="sm" fontWeight="semibold" color="gray.700" mb={2}>
              Blog Başlığı
            </Text>
            <Input
              placeholder="Blog yazısının başlığını girin..."
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              size="md"
              borderRadius="8px"
              borderColor="gray.200"
              bg="white"
              color="gray.800"
              _placeholder={{ color: "gray.500" }}
              _focus={{
                borderColor: "green.500",
                boxShadow: "0 0 0 1px var(--primary)"
              }}
            />
          </Box>
        </GridItem>

        {/* Slug */}
        <GridItem>
          <Box>
            <Text fontSize="sm" fontWeight="semibold" color="gray.700" mb={2}>
              URL Slug
            </Text>
            <Input
              placeholder="blog-yazisi-slug"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              size="md"
              borderRadius="8px"
              borderColor="gray.200"
              bg="white"
              color="gray.800"
              _placeholder={{ color: "gray.500" }}
              _focus={{
                borderColor: "green.500",
                boxShadow: "0 0 0 1px var(--primary)"
              }}
            />
          </Box>
        </GridItem>

        {/* Kategori */}
        <GridItem>
          <Box>
            <Text fontSize="sm" fontWeight="semibold" color="gray.700" mb={2}>
              Kategori
            </Text>
            <NativeSelectRoot size="md">
              <NativeSelectField
                value={formData.category || ''}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                borderRadius="8px"
                borderColor="gray.200"
                bg="white"
                color="gray.800"
                _focus={{
                  borderColor: "green.500",
                  boxShadow: "0 0 0 1px var(--primary)"
                }}
              >
                <option value="" style={{ color: '#9CA3AF', backgroundColor: 'white' }}>Kategori seçin...</option>
                <option value="Genel" style={{ color: '#1F2937', backgroundColor: 'white' }}>Genel</option>
                <option value="Beslenme" style={{ color: '#1F2937', backgroundColor: 'white' }}>Beslenme</option>
                <option value="Sağlık" style={{ color: '#1F2937', backgroundColor: 'white' }}>Sağlık</option>
                <option value="Yaşam Tarzı" style={{ color: '#1F2937', backgroundColor: 'white' }}>Yaşam Tarzı</option>
                <option value="Haberler" style={{ color: '#1F2937', backgroundColor: 'white' }}>Haberler</option>
                <option value="İpuçları" style={{ color: '#1F2937', backgroundColor: 'white' }}>İpuçları</option>
              </NativeSelectField>
            </NativeSelectRoot>
          </Box>
        </GridItem>

        {/* Yazar */}
        <GridItem>
          <Box>
            <Text fontSize="sm" fontWeight="semibold" color="gray.700" mb={2}>
              Yazar
            </Text>
            <Input
              placeholder="Yazar adı"
              value={formData.author || ''}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              size="md"
              borderRadius="8px"
              borderColor="gray.200"
              bg="white"
              color="gray.800"
              _placeholder={{ color: "gray.500" }}
              _focus={{
                borderColor: "green.500",
                boxShadow: "0 0 0 1px var(--primary)"
              }}
            />
          </Box>
        </GridItem>

        {/* Yayın Tarihi */}
        <GridItem>
          <Box>
            <Text fontSize="sm" fontWeight="semibold" color="gray.700" mb={2}>
              Yayın Tarihi
            </Text>
            <Input
              type="date"
              value={formData.createdAt ? new Date(formData.createdAt).toISOString().split('T')[0] : ''}
              onChange={(e) => setFormData({ ...formData, createdAt: new Date(e.target.value) })}
              size="md"
              borderRadius="8px"
              borderColor="gray.200"
              bg="white"
              color="gray.800"
              _focus={{
                borderColor: "green.500",
                boxShadow: "0 0 0 1px var(--primary)"
              }}
            />
          </Box>
        </GridItem>

        {/* Görsel Yükleme */}
        <GridItem>
          <Box>
            <Text fontSize="sm" fontWeight="semibold" color="gray.700" mb={2}>
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
                size="md"
                colorScheme="green"
                borderRadius="8px"
                loading={uploading}
                loadingText="Yükleniyor..."
                cursor="pointer"
                onClick={() => document.getElementById('image-upload')?.click()}
                _hover={{
                  borderColor: "green.500",
                  color: "green.600"
                }}
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
                    borderRadius="8px"
                    border="1px solid"
                    borderColor="gray.200"
                    shadow="sm"
                  />
                </Box>
              )}
            </VStack>
          </Box>
        </GridItem>
      </Grid>

      {/* Açıklama - Tam genişlik */}
      <Box>
        <Text fontSize="sm" fontWeight="semibold" color="gray.700" mb={2}>
          Kısa Açıklama
        </Text>
        <Input
          placeholder="Blog yazısının kısa açıklamasını girin..."
          value={formData.excerpt || ''}
          onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
          size="md"
          borderRadius="8px"
          borderColor="gray.200"
          bg="white"
          color="gray.800"
          _placeholder={{ color: "gray.500" }}
          _focus={{
            borderColor: "green.500",
            boxShadow: "0 0 0 1px var(--primary)"
          }}
        />
      </Box>
    </VStack>
  </Box>
  )
}