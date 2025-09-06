'use client';

import React from 'react';
import { Box, Textarea } from '@chakra-ui/react';

interface SimpleEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  height?: string;
}

const SimpleEditor: React.FC<SimpleEditorProps> = ({
  value,
  onChange,
  placeholder = "İçeriğinizi buraya yazın...",
  height = "400px"
}) => {
  return (
    <Box>
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        minH={height}
        resize="vertical"
        fontSize="14px"
        lineHeight="1.6"
        border="1px solid"
        borderColor="gray.300"
        borderRadius="md"
        _focus={{
          borderColor: "blue.500",
          boxShadow: "0 0 0 1px #3182ce"
        }}
        _hover={{
          borderColor: "gray.400"
        }}
      />
    </Box>
  );
};

export default SimpleEditor;
