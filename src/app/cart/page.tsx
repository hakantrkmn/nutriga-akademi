"use client";

import { cartApi, CartItemDTO } from "@/lib/api";
// import { prisma } from "@/lib/prisma";
import { toaster } from "@/components/ui/toaster";
import { createClient } from "@/lib/supabase/client";
import {
  Badge,
  Box,
  Button,
  Card,
  Heading,
  HStack,
  Icon,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";

export default function CartPage() {
  const [items, setItems] = useState<CartItemDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const load = async () => {
    setLoading(true);
    const res = await cartApi.get();
    if (res.success && res.data) setItems(res.data);
    setLoading(false);
  };

  useEffect(() => {
    load();
    const init = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setIsAuthenticated(!!user);
    };
    init();
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session?.user);
    });
    return () => {
      sub.subscription.unsubscribe();
    };
  }, []);

  const subtotal = useMemo(() => {
    return items.reduce((sum, it) => {
      const price = Number(it.education?.price ?? 0);
      return sum + price * it.quantity;
    }, 0);
  }, [items]);

  const updateQty = async (id: string, qty: number) => {
    const res = await cartApi.updateQuantity(id, qty);
    if (res.success) {
      load();
      toaster.success("Sepet güncellendi");
    } else {
      toaster.error("Sepet güncellenirken bir hata oluştu");
    }
  };

  const removeItem = async (id: string) => {
    const res = await cartApi.remove(id);
    if (res.success) {
      load();
      toaster.success("Ürün sepetten kaldırıldı");
    } else {
      toaster.error("Ürün kaldırılırken bir hata oluştu");
    }
  };

  return (
    <Box maxW="7xl" mx="auto" px={{ base: 4, md: 6 }} py={{ base: 6, md: 8 }}>
      <VStack gap={6} align="stretch">
        <Box>
          <Heading size="xl" color="gray.900" mb={2}>
            Sepet
          </Heading>
          <Text color="gray.600">
            Ürünlerini gözden geçir ve satın almaya geç
          </Text>
        </Box>

        <Card.Root bg="white" borderRadius="lg" shadow="sm">
          <Card.Body>
            <VStack gap={4} align="stretch">
              {loading && <Text>Yükleniyor...</Text>}
              {!loading && items.length === 0 && (
                <Text color="gray.500">Sepetin boş.</Text>
              )}
              {!loading &&
                items.map((it) => (
                  <Box
                    key={it.id}
                    display="flex"
                    flexDirection={{ base: "column", md: "row" }}
                    gap={4}
                    alignItems={{ base: "stretch", md: "center" }}
                    justifyContent="space-between"
                    w="full"
                  >
                    <HStack gap={4} align="center">
                      <Box
                        w={{ base: "72px", md: "96px" }}
                        h={{ base: "54px", md: "72px" }}
                        position="relative"
                        bg="gray.50"
                        borderRadius="md"
                        overflow="hidden"
                      >
                        <Image
                          src={
                            it.education?.imageUrl ||
                            "/images/egitim-default.jpg"
                          }
                          alt={it.education?.title || "Eğitim"}
                          fill
                          style={{ objectFit: "cover" }}
                        />
                      </Box>
                      <VStack align="start" gap={1} minW={0}>
                        <Text
                          fontWeight="medium"
                          color="gray.800"
                          css={{
                            display: "-webkit-box",
                            WebkitBoxOrient: "vertical",
                            WebkitLineClamp: 2,
                            overflow: "hidden",
                          }}
                        >
                          {it.education?.title}
                        </Text>
                        <Badge
                          color="var(--accent)"
                          bg="rgba(var(--accent-rgb), 0.12)"
                          variant="subtle"
                        >
                          {it.education?.category}
                        </Badge>
                      </VStack>
                    </HStack>

                    <HStack
                      gap={3}
                      align="center"
                      justify={{ base: "space-between", md: "flex-end" }}
                      flexWrap="wrap"
                      w="full"
                    >
                      <HStack gap={2} align="center">
                        <Button
                          size="sm"
                          variant="outline"
                          borderColor="var(--primary)"
                          _hover={{ bg: "rgba(var(--primary-rgb), 0.06)" }}
                          onClick={() =>
                            updateQty(it.id, Math.max(1, it.quantity - 1))
                          }
                        >
                          <Icon as={FiMinus} />
                        </Button>
                        <Input
                          value={it.quantity}
                          readOnly
                          textAlign="center"
                          w={{ base: "56px", md: "64px" }}
                          px={0}
                        />
                        <Button
                          size="sm"
                          variant="outline"
                          borderColor="var(--primary)"
                          _hover={{ bg: "rgba(var(--primary-rgb), 0.06)" }}
                          onClick={() => updateQty(it.id, it.quantity + 1)}
                        >
                          <Icon as={FiPlus} />
                        </Button>
                      </HStack>

                      <Text
                        fontWeight="semibold"
                        color="gray.900"
                        minW={{ md: "96px" }}
                        textAlign={{ md: "right" }}
                      >
                        ₺{Number(it.education?.price ?? 0) * it.quantity}
                      </Text>

                      <Button
                        variant="outline"
                        colorScheme="red"
                        onClick={() => removeItem(it.id)}
                      >
                        <Icon as={FiTrash2} />
                      </Button>
                    </HStack>
                  </Box>
                ))}
            </VStack>
          </Card.Body>
        </Card.Root>

        <Card.Root bg="white" borderRadius="lg" shadow="sm">
          <Card.Body>
            <VStack gap={3} align="stretch">
              <HStack justify="space-between">
                <Text color="gray.600">Ara toplam</Text>
                <Text fontWeight="semibold">₺{subtotal}</Text>
              </HStack>
              <HStack justify="space-between">
                <Text color="gray.600">KDV</Text>
                <Text fontWeight="semibold">Dahil</Text>
              </HStack>
              <Box h="1px" bg="gray.200" />
              <HStack justify="space-between">
                <Text fontWeight="bold" color="gray.800">
                  Toplam
                </Text>
                <Text fontWeight="bold" color="var(--primary)">
                  ₺{subtotal}
                </Text>
              </HStack>
              <Button
                bg="var(--primary)"
                color="white"
                size="lg"
                borderRadius="12px"
                disabled={items.length === 0}
                _hover={{ bg: "var(--primary-hover)" }}
                onClick={async () => {
                  if (!isAuthenticated) {
                    toaster.success("Satın almak için lütfen giriş yapın");
                    router.push("/auth/login");
                    return;
                  }
                  try {
                    const res = await fetch("/api/cart/checkout", {
                      method: "POST",
                    });
                    const data = await res.json();
                    if (res.ok) {
                      toaster.success("Satın alma başarılı!");
                      router.push("/"); // Redirect to home or a success page
                    } else {
                      toaster.error(`Satın alma başarısız: ${data.error}`);
                    }
                  } catch (error) {
                    toaster.error("Satın alma sırasında bir hata oluştu.");
                  }
                }}
              >
                {isAuthenticated ? "Satın Almaya Geç" : "Giriş Yap ve Satın Al"}
              </Button>
            </VStack>
          </Card.Body>
        </Card.Root>
      </VStack>
    </Box>
  );
}
