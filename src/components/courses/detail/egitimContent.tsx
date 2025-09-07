import { Box, GridItem } from "@chakra-ui/react";
import TipTapWrapper from "@/components/common/TipTapWrapper";
import { EgitimContentProps } from "@/types";



export default function EgitimContent({ egitim }: EgitimContentProps) {
  return (
    <GridItem>
    <Box 
      w="full"
      bg="white"
      borderRadius="12px"
      p={8}
      shadow="sm"
      border="1px solid"
      borderColor="gray.100"
    >
      <TipTapWrapper 
        content={egitim.content}
        className="egitim-content"
      />
    </Box>
  </GridItem>
  )
}