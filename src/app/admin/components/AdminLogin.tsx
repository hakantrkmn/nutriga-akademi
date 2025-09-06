'use client'

import { useState } from 'react'
import {
  Box,
  Card,
  VStack,
  HStack,
  Heading,
  Text,
  Input,
  Button,
  Alert
} from '@chakra-ui/react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) {
        setError(error.message)
        return
      }

      if (data.user) {
        // Admin email kontrolü
        if (data.user.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
          // Dashboard'a yönlendir - layout otomatik yönlendirecek
          router.push('/admin/dashboard')
        } else {
          setError('Bu email adresi admin yetkisine sahip değil.')
          await supabase.auth.signOut()
        }
      }
    } catch (err) {
      setError('Giriş yapılırken bir hata oluştu.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box
      minH="100vh"
      bg="gray.50"
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={4}
    >
      <Card.Root maxW="md" w="full" p={8}>
        <VStack gap={6}>
          <VStack gap={2} textAlign="center">
            <Heading size="xl" color="green.600">
              Admin Girişi
            </Heading>
            <Text color="gray.600">
              NutriHome Akademi Admin Paneli
            </Text>
          </VStack>

          {error && (
            <Alert.Root status="error" borderRadius="md">
              <Alert.Indicator />
              <Box>
                <Alert.Title>Giriş Hatası!</Alert.Title>
                <Alert.Description>{error}</Alert.Description>
              </Box>
            </Alert.Root>
          )}

          <Box as="form" onSubmit={handleLogin} w="full">
            <VStack gap={4}>
              <Box w="full">
                <Text fontSize="sm" fontWeight="medium" mb={2} color="gray.700">
                  Email Adresi
                </Text>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  required
                  size="lg"
                  borderRadius="md"
                />
              </Box>

              <Box w="full">
                <Text fontSize="sm" fontWeight="medium" mb={2} color="gray.700">
                  Şifre
                </Text>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  size="lg"
                  borderRadius="md"
                />
              </Box>

              <Button
                type="submit"
                colorScheme="green"
                size="lg"
                w="full"
                loading={loading}
                loadingText="Giriş yapılıyor..."
                _hover={{
                  bg: "green.600"
                }}
              >
                Giriş Yap
              </Button>
            </VStack>
          </Box>

          <Text fontSize="sm" color="gray.500" textAlign="center">
            Sadece yetkili admin kullanıcıları giriş yapabilir.
          </Text>
        </VStack>
      </Card.Root>
    </Box>
  )
}
