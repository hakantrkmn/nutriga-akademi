'use client'

import {
  Box,
  VStack,
  Text,
  Spinner,
  Flex
} from '@chakra-ui/react'

interface AdminLoadingProps {
  message?: string
}

export default function AdminLoading({ message = "Yükleniyor..." }: AdminLoadingProps) {
  return (
    <Box minH="50vh" py={8}>
      <VStack gap={6} align="center">
        {/* Loading Spinner */}
        <Flex align="center" gap={3} color="green.500">
          <Spinner 
            size="lg" 
            color="green.500"
          />
          <Text fontSize="lg" fontWeight="medium" color="gray.600">
            {message}
          </Text>
        </Flex>
      </VStack>
    </Box>
  )
}