import { Box } from "@chakra-ui/react";
import { useMemo } from "react";

interface TipTapContent {
  type: string;
  content?: TipTapContent[];
  attrs?: Record<string, unknown>;
  text?: string;
}

interface TipTapWrapperProps {
  content: string | object;
  className?: string;
}

// TipTap JSON verisini HTML string'e çeviren fonksiyon
const convertTipTapToHTML = (content: TipTapContent): string => {
  if (!content) return "";

  const { type, content: children, attrs, text } = content;

  // Text node
  if (type === "text") {
    return text || "";
  }

  // Paragraph
  if (type === "paragraph") {
    const innerHTML = children ? children.map(convertTipTapToHTML).join("") : "";
    return `<p>${innerHTML}</p>`;
  }

  // Headings
  if (type === "heading") {
    const level = attrs?.level || 1;
    const innerHTML = children ? children.map(convertTipTapToHTML).join("") : "";
    return `<h${level}>${innerHTML}</h${level}>`;
  }

  // Bullet List
  if (type === "bulletList") {
    const innerHTML = children ? children.map(convertTipTapToHTML).join("") : "";
    return `<ul>${innerHTML}</ul>`;
  }

  // List Item
  if (type === "listItem") {
    const innerHTML = children ? children.map(convertTipTapToHTML).join("") : "";
    return `<li>${innerHTML}</li>`;
  }

  // Ordered List
  if (type === "orderedList") {
    const innerHTML = children ? children.map(convertTipTapToHTML).join("") : "";
    return `<ol>${innerHTML}</ol>`;
  }

  // Bold text
  if (type === "text" && attrs?.bold) {
    return `<strong>${text || ""}</strong>`;
  }

  // Italic text
  if (type === "text" && attrs?.italic) {
    return `<em>${text || ""}</em>`;
  }

  // Link
  if (type === "text" && attrs?.link) {
    const linkAttrs = attrs.link as { href?: string };
    const href = linkAttrs.href || "#";
    return `<a href="${href}">${text || ""}</a>`;
  }

  // Default: process children if available
  if (children) {
    return children.map(convertTipTapToHTML).join("");
  }

  return "";
};

// Ana wrapper fonksiyonu
const processContent = (content: string | object): string => {
  // Eğer string ise, zaten HTML formatında
  if (typeof content === "string") {
    return content;
  }

  // Eğer object ise, TipTap JSON formatında
  if (typeof content === "object" && content !== null) {
    const tipTapContent = content as TipTapContent;
    
    // Eğer doc type'ı varsa, content array'ini işle
    if (tipTapContent.type === "doc" && tipTapContent.content) {
      return tipTapContent.content.map(convertTipTapToHTML).join("");
    }
    
    // Diğer durumlarda direkt işle
    return convertTipTapToHTML(tipTapContent);
  }

  return "";
};

export default function TipTapWrapper({ content, className = "tiptap-content" }: TipTapWrapperProps) {
  // Memoize HTML content processing for better performance
  const htmlContent = useMemo(() => processContent(content), [content]);

  // Eğitim içeriği için özel styling
  const isEgitimContent = className === "egitim-content";
  
  return (
    <Box 
      className={className}
      css={{
        "h1, h2, h3, h4, h5, h6": {
          fontWeight: "bold",
          marginBottom: "1rem",
          marginTop: "2rem",
          color: "var(--chakra-colors-gray-700)"
        },
        "h2": {
          fontSize: isEgitimContent ? "1.75rem" : "1.8rem",
          color: isEgitimContent ? "var(--chakra-colors-green-600)" : "var(--chakra-colors-gray-700)"
        },
        "h3": {
          fontSize: "1.4rem"
        },
        "p": {
          marginBottom: "1rem",
          lineHeight: "1.8",
          color: "var(--chakra-colors-gray-700)",
          fontSize: "1rem"
        },
        "ul, ol": {
          marginBottom: "1rem",
          paddingLeft: "1.5rem"
        },
        "li": {
          marginBottom: "0.5rem",
          color: "var(--chakra-colors-gray-700)",
          lineHeight: "1.6"
        },
        "strong": {
          fontWeight: "600",
          color: "var(--chakra-colors-gray-800)"
        },
        "em": {
          fontStyle: "italic",
          color: "var(--chakra-colors-gray-700)"
        },
        "a": {
          color: "var(--chakra-colors-green-500)",
          textDecoration: "underline"
        },
        "a:hover": {
          color: "var(--chakra-colors-green-600)"
        },
        // Eğitim içeriği için ekstra styling
        ...(isEgitimContent && {
          "h2": {
            fontSize: "1.75rem",
            color: "var(--chakra-colors-green-600)",
            borderBottom: "2px solid var(--chakra-colors-green-100)",
            paddingBottom: "0.5rem",
            marginBottom: "1.5rem"
          },
          "h3": {
            fontSize: "1.4rem",
            color: "var(--chakra-colors-gray-700)",
            marginTop: "2rem",
            marginBottom: "1rem"
          },
          "ul": {
            backgroundColor: "var(--chakra-colors-gray-50)",
            padding: "1rem",
            borderRadius: "8px",
            border: "1px solid var(--chakra-colors-gray-200)"
          },
          "li": {
            marginBottom: "0.75rem",
            position: "relative",
            paddingLeft: "1rem"
          },
          "li::before": {
            content: '"•"',
            color: "var(--chakra-colors-green-500)",
            fontWeight: "bold",
            position: "absolute",
            left: "0"
          }
        })
      }}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}
