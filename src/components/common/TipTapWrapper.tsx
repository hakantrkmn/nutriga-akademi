"use client";

import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { generateHTML } from '@tiptap/html';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Highlight from '@tiptap/extension-highlight';
import TextAlign from '@tiptap/extension-text-align';
import { TextStyle } from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';

interface TipTapWrapperProps {
  content: string | object;
  className?: string;
}

// TipTap extensions - sadece görüntüleme için gerekli olanlar
const extensions = [
  StarterKit.configure({
    heading: {
      levels: [1, 2, 3, 4, 5, 6],
    },
  }),
  Image,
  Highlight,
  TextAlign,
  TextStyle,
  Color,
];

// imageResize node'larını image node'larına dönüştür
const convertImageResizeToImage = (node: Record<string, unknown>): Record<string, unknown> => {
  if (node.type === 'imageResize') {
    const attrs = node.attrs as Record<string, unknown> || {};
    return {
      ...node,
      type: 'image',
      attrs: {
        ...attrs,
        // imageResize specific attrs'ları temizle
        containerStyle: undefined,
        wrapperStyle: undefined,
      }
    };
  }
  
  if (node.content && Array.isArray(node.content)) {
    return {
      ...node,
      content: (node.content as Record<string, unknown>[]).map(convertImageResizeToImage)
    };
  }
  
  return node;
};

// Ana wrapper fonksiyonu
const processContent = (content: string | object): string => {
  // Eğer string ise, zaten HTML formatında (React Quill'den gelen)
  if (typeof content === "string") {
    return content;
  }

  // Eğer object ise, TipTap JSON formatında
  if (typeof content === "object" && content !== null) {
    try {
      // imageResize node'larını image node'larına dönüştür
      const convertedContent = convertImageResizeToImage(content as Record<string, unknown>);
      
      // TipTap'ın resmi generateHTML fonksiyonunu kullan
      return generateHTML(convertedContent, extensions);
    } catch (error) {
      console.error('TipTap JSON to HTML conversion error:', error);
      return '<p>İçerik yüklenirken hata oluştu.</p>';
    }
  }

  return "";
};

export default function TipTapWrapper({ content, className = "tiptap-content" }: TipTapWrapperProps) {
  const [htmlContent, setHtmlContent] = useState<string>("");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setHtmlContent(processContent(content));
  }, [content]);

  // SSR sırasında boş div göster, client-side'da HTML göster
  if (!isClient) {
    return <Box className={className} />;
  }
  
  return (
    <Box 
      className={className}
      css={{
        padding: "8px !important",
        "& img": {
          maxWidth: "100% !important",
          height: "auto !important",
          borderRadius: "8px !important",
          margin: "1rem 0 !important"
        },
        // Inline görseller için özel stil
        "& p img": {
          display: "inline-block !important",
          verticalAlign: "middle !important",
          margin: "0 0.5rem !important",
          maxWidth: "200px !important",
          minWidth: "50px !important",
          minHeight: "50px !important"
        },
        // Block görseller için stil
        "& img.block": {
          display: "block !important",
          margin: "1rem auto !important",
          textAlign: "center !important",
          maxWidth: "100% !important"
        },
        "& h1": {
          fontSize: "2rem !important",
          fontWeight: "bold !important",
          lineHeight: "1.2 !important",
          margin: "1.5rem 0 1rem 0 !important",
          color: "inherit !important"
        },
        "& h2": {
          fontSize: "1.5rem !important",
          fontWeight: "bold !important",
          lineHeight: "1.3 !important",
          margin: "1.25rem 0 0.75rem 0 !important",
          color: "inherit !important"
        },
        "& h3": {
          fontSize: "1.25rem !important",
          fontWeight: "semibold !important",
          lineHeight: "1.4 !important",
          margin: "1rem 0 0.5rem 0 !important",
          color: "inherit !important"
        },
        "& h4": {
          fontSize: "1.125rem !important",
          fontWeight: "semibold !important",
          lineHeight: "1.4 !important",
          margin: "0.875rem 0 0.5rem 0 !important",
          color: "inherit !important"
        },
        "& h5": {
          fontSize: "1rem !important",
          fontWeight: "semibold !important",
          lineHeight: "1.5 !important",
          margin: "0.75rem 0 0.5rem 0 !important",
          color: "inherit !important"
        },
        "& h6": {
          fontSize: "0.875rem !important",
          fontWeight: "semibold !important",
          lineHeight: "1.5 !important",
          margin: "0.75rem 0 0.5rem 0 !important",
          color: "inherit !important"
        },
        "& p": {
          margin: "0.75rem 0 !important",
          lineHeight: "1.6 !important"
        },
        "& ul, & ol": {
          margin: "0.75rem 0 !important",
          paddingLeft: "1.5rem !important"
        },
        "& li": {
          margin: "0.25rem 0 !important",
          lineHeight: "1.5 !important"
        }
      }}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}
