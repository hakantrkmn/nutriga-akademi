"use client";
import BubbleMenuExt from "@tiptap/extension-bubble-menu";
import CharacterCount from "@tiptap/extension-character-count";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Color from "@tiptap/extension-color";
import FloatingMenuExt from "@tiptap/extension-floating-menu";
import FontFamily from "@tiptap/extension-font-family";
import FontSize from "@tiptap/extension-font-size";
import Heading from "@tiptap/extension-heading";
import Highlight from "@tiptap/extension-highlight";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import Link from "@tiptap/extension-link";
import Mention from "@tiptap/extension-mention";
import Placeholder from "@tiptap/extension-placeholder";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import { Table } from "@tiptap/extension-table";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";
import { TableRow } from "@tiptap/extension-table-row";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import TextAlign from "@tiptap/extension-text-align";
import { LineHeight, TextStyle } from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import Youtube from "@tiptap/extension-youtube";
import StarterKit from "@tiptap/starter-kit";
import { createLowlight } from "lowlight";
import { ResizableImage } from "tiptap-extension-resizable-image";
// Chakra UI import removed
import { generateHTML } from "@tiptap/html";
import { useEffect, useMemo, useState } from "react";
interface TipTapWrapperProps {
  content: string | object;
  className?: string;
}

// TipTap extensions - sadece görüntüleme için gerekli olanlar
const extensions = [
  StarterKit.configure({ codeBlock: false, horizontalRule: false }),
  Heading.configure({ levels: [1, 2, 3, 4, 5, 6] }),
  ResizableImage.configure({
    allowBase64: true,
    defaultWidth: 200,
    defaultHeight: 200,
    HTMLAttributes: {
      class: "tiptap-image-resizable",
      style: "display: block; margin: 0 auto; text-align: center;",
    },
  }),
  Link.configure({
    openOnClick: false,
    HTMLAttributes: { class: "tiptap-link" },
  }),
  Table.configure({ resizable: true }),
  TableRow,
  TableHeader,
  TableCell,
  CodeBlockLowlight.configure({ lowlight: createLowlight() }),
  Highlight.configure({ multicolor: true }),
  TextAlign.configure({ types: ["heading", "paragraph", "image"] }),
  Underline,
  TextStyle,
  Color.configure({ types: ["textStyle"] }),
  FontFamily.configure({ types: ["textStyle"] }),
  FontSize.configure({ types: ["textStyle"] }),
  LineHeight.configure({ types: ["heading", "paragraph"] }),
  Subscript,
  Superscript,
  TaskList,
  TaskItem.configure({ nested: true }),
  Youtube.configure({ controls: false, nocookie: true }),
  HorizontalRule,
  Mention.configure({ HTMLAttributes: { class: "mention" } }),
  CharacterCount,
  BubbleMenuExt,
  FloatingMenuExt,
  Placeholder.configure({ placeholder: "Yükleniyor..." }),
];

// imageResize node'larını image node'larına dönüştür
const convertImageResizeToImage = (
  node: Record<string, unknown>
): Record<string, unknown> => {
  if (node.type === "imageResize") {
    const attrs = (node.attrs as Record<string, unknown>) || {};
    return {
      ...node,
      type: "image",
      attrs: {
        ...attrs,
        // imageResize specific attrs'ları temizle
        containerStyle: undefined,
        wrapperStyle: undefined,
      },
    };
  }

  if (node.content && Array.isArray(node.content)) {
    return {
      ...node,
      content: (node.content as Record<string, unknown>[]).map(
        convertImageResizeToImage
      ),
    };
  }

  return node;
};

// Boş paragrafları koruma fonksiyonu
const preserveEmptyParagraphs = (
  content: Record<string, unknown>
): Record<string, unknown> => {
  if (content && content.content && Array.isArray(content.content)) {
    content.content = content.content.map((node: Record<string, unknown>) => {
      if (
        node.type === "paragraph" &&
        (!node.content ||
          (Array.isArray(node.content) && node.content.length === 0))
      ) {
        // Boş paragrafı &nbsp; ile doldur
        return {
          ...node,
          content: [{ type: "text", text: "\u00A0" }], // &nbsp; karakteri
        };
      }
      return node;
    });
  }
  return content;
};

// Ana wrapper fonksiyonu
const processContent = (content: string | object): string => {
  console.log("content", typeof content);
  // Eğer string ise, JSON string mi yoksa HTML string mi kontrol et
  if (typeof content === "string") {
    // JSON string olup olmadığını kontrol et
    try {
      let tet = null;
      const parsedContent = JSON.parse(content);
      if (typeof parsedContent === "string") {
        tet = JSON.parse(parsedContent);
      } else {
        tet = parsedContent;
      }

      // Boş paragrafları koru
      tet = preserveEmptyParagraphs(tet);

      // imageResize node'larını image node'larına dönüştür
      console.log("parsedContent", typeof tet);
      // TipTap'ın resmi generateHTML fonksiyonunu kullan
      return generateHTML(tet, extensions);
    } catch (error) {
      console.error("JSON string parse error:", error);
      return "<p>İçerik yüklenirken hata oluştu.</p>";
    }
    // HTML string ise direkt döndür
  }

  // Eğer object ise, TipTap JSON formatında
  if (typeof content === "object" && content !== null) {
    try {
      // Boş paragrafları koru
      const contentWithEmptyParagraphs = preserveEmptyParagraphs(
        content as Record<string, unknown>
      );

      // imageResize node'larını image node'larına dönüştür
      const convertedContent = convertImageResizeToImage(
        contentWithEmptyParagraphs as Record<string, unknown>
      );

      // TipTap'ın resmi generateHTML fonksiyonunu kullan
      return generateHTML(convertedContent, extensions);
    } catch (error) {
      console.error("TipTap JSON to HTML conversion error:", error);
      return "<p>İçerik yüklenirken hata oluştu.</p>";
    }
  }

  return "";
};

export default function TipTapWrapper({
  content,
  className = "tiptap-content",
}: TipTapWrapperProps) {
  const [isClient, setIsClient] = useState(false);

  // Client-side rendering kontrolü
  useEffect(() => {
    setIsClient(true);
  }, []);

  // useMemo ile içeriği işle, render sırasında state güncellemesi yapmadan
  const htmlContent = useMemo(() => {
    if (!isClient) return "";
    console.log("content", typeof content);
    return processContent(content);
  }, [content, isClient]);

  // SSR sırasında boş div göster, client-side'da HTML göster
  if (!isClient) {
    return <div className={className} />;
  }

  return (
    <div
      className={`prose ProseMirror max-w-none ${className || ""}`}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}
