"use client";

import {
  Toaster as ChakraToaster,
  createToaster,
  Toast,
} from "@chakra-ui/react";

export const toaster = createToaster({ placement: "top-end", duration: 3500 });

export function Toaster() {
  return (
    <ChakraToaster toaster={toaster}>
      {(t) => (
        <Toast.Root
          bg="white"
          border="1px solid"
          borderColor="gray.200"
          shadow="xl"
          borderRadius="14px"
          p={4}
          w={{ base: "calc(100vw - 32px)", md: "380px" }}
          maxW="420px"
          gap={2}
        >
          {t.title ? (
            <Toast.Title fontSize="md" fontWeight="semibold" color="gray.800">
              {t.title}
            </Toast.Title>
          ) : null}
          {t.description ? (
            <Toast.Description fontSize="sm" color="gray.600">
              {t.description}
            </Toast.Description>
          ) : null}
          <Toast.CloseTrigger />
        </Toast.Root>
      )}
    </ChakraToaster>
  );
}
