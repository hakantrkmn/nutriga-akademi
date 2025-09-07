import { Box, GridItem } from "@chakra-ui/react";
import { EgitimContentProps } from "@/types";
import dynamic from "next/dynamic";

const TipTapWrapper = dynamic(() => import("@/components/common/TipTapWrapper"), {
  ssr: false
});
const TipTapEditor = dynamic(() => import("@/components/admin/TipTapEditor"), {
  ssr: false
});


export default function EgitimContent({ egitim, isEditing, setFormData }: EgitimContentProps) {
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
      {isEditing ? (
        <TipTapEditor
          content={egitim.content as object}
          onChange={(content) => setFormData?.({ ...egitim, content })}
          placeholder="Eğitim içeriğini buraya yazın..."
        />
      ) : (
      <TipTapWrapper 
        content={egitim.content as object}
        className="egitim-content"
      />
      )}
    </Box>
  </GridItem>
  )
}