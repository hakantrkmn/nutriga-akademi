"use client";

import { getHTMLContent } from "@/utils";
import { Box, HStack, Icon, Separator, Text, VStack } from "@chakra-ui/react";
import BubbleMenuExt from "@tiptap/extension-bubble-menu";
import CharacterCount from "@tiptap/extension-character-count";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Color from "@tiptap/extension-color";
import FloatingMenuExt from "@tiptap/extension-floating-menu";
import FontFamily from "@tiptap/extension-font-family";
import Heading from "@tiptap/extension-heading";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
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
import { TextStyle } from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import Youtube from "@tiptap/extension-youtube";
import { EditorContent, useEditor } from "@tiptap/react";
import { BubbleMenu, FloatingMenu } from "@tiptap/react/menus";
import StarterKit from "@tiptap/starter-kit";
import { createLowlight } from "lowlight";
import { useEffect, useRef, useState } from "react";
import { ResizableImage } from "tiptap-extension-resizable-image";
import "tiptap-extension-resizable-image/styles.css";
interface TipTapEditorProps {
  content?: object | null;
  onChange?: (content: object) => void;
  placeholder?: string;
  readOnly?: boolean;
}

export default function TipTapEditor({
  content,
  onChange,
  placeholder = "İçeriğinizi buraya yazın...",
  readOnly = false,
}: TipTapEditorProps) {
  console.log("content", typeof content);

  const [, forceUpdate] = useState({});
  const [showColorPalette, setShowColorPalette] = useState(false);
  const colorPaletteRef = useRef<HTMLDivElement>(null);
  const editorBg = "white";
  const borderColor = "gray.200";
  const textColor = "gray.900";

  // Renk paleti
  const colors = [
    "#000000",
    "#333333",
    "#666666",
    "#999999",
    "#CCCCCC",
    "#FFFFFF",
    "#FF0000",
    "#FF6600",
    "#FFCC00",
    "#00FF00",
    "#0066FF",
    "#6600FF",
    "#FF0066",
    "#FF3366",
    "#FF6699",
    "#FF99CC",
    "#FFCCFF",
    "#CC99FF",
    "#9966FF",
    "#6633FF",
    "#3300FF",
    "#0033FF",
    "#0066CC",
    "#0099FF",
    "#00CCFF",
    "#00FFFF",
    "#00FFCC",
    "#00FF99",
    "#00FF66",
    "#00FF33",
    "#66FF00",
    "#99FF00",
    "#CCFF00",
    "#FFFF00",
    "#FF9900",
    "#FF3300",
    "#CC0000",
    "#990000",
    "#660000",
    "#330000",
    "#8B4513",
    "#FF1493",
  ];

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        colorPaletteRef.current &&
        !colorPaletteRef.current.contains(event.target as Node)
      ) {
        setShowColorPalette(false);
      }
    };

    if (showColorPalette) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showColorPalette]);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false, // CodeBlockLowlight kullanacağız
      }),
      Heading.configure({
        levels: [1, 2, 3, 4, 5, 6],
      }),
      Image.configure({
        HTMLAttributes: {
          class: "tiptap-image",
        },
      }),
      ResizableImage.configure({
        allowBase64: true,
        defaultWidth: 200,
        defaultHeight: 200,
        HTMLAttributes: {
          class: "tiptap-image-resizable",
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "tiptap-link",
        },
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      CodeBlockLowlight.configure({
        lowlight: createLowlight(),
      }),
      Highlight.configure({
        multicolor: true,
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Underline,
      TextStyle,
      Color.configure({
        types: ["textStyle"],
      }),
      FontFamily.configure({
        types: ["textStyle"],
      }),
      Subscript,
      Superscript,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Youtube.configure({
        controls: false,
        nocookie: true,
      }),
      Mention.configure({
        HTMLAttributes: {
          class: "mention",
        },
      }),
      CharacterCount,
      BubbleMenuExt,
      FloatingMenuExt,
      Placeholder.configure({
        placeholder,
      }),
    ],
    content: getHTMLContent(content) || "",
    editable: !readOnly,
    immediatelyRender: false, // SSR hydration mismatch'ini önler
    onUpdate: ({ editor }) => {
      if (onChange) {
        onChange(editor.getJSON());
      }
      forceUpdate({}); // Force re-render for button states
    },
    onSelectionUpdate: () => {
      forceUpdate({}); // Force re-render for button states
    },
  });

  if (!editor) {
    return null;
  }

  // Image upload handler
  const handleImageUpload = async () => {
    // File input oluştur
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.multiple = false;

    input.onchange = async (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (!file) return;

      // Dosya boyutunu kontrol et (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        alert("Dosya boyutu 10MB'dan küçük olmalıdır");
        return;
      }

      // Dosya türünü kontrol et
      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
        "image/webp",
        "image/svg+xml",
      ];
      if (!allowedTypes.includes(file.type)) {
        alert("Sadece JPG, PNG, GIF, WebP ve SVG dosyaları yüklenebilir");
        return;
      }

      try {
        // FormData oluştur
        const formData = new FormData();
        formData.append("file", file);

        // Upload API'sine gönder
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const result = await response.json();

        if (result.success) {
          // Başarılı upload - görseli editor'e inline olarak ekle
          editor
            .chain()
            .focus()
            .setImage({
              src: result.url,
            })
            .run();
        } else {
          alert(`Upload hatası: ${result.error}`);
        }
      } catch (error) {
        console.error("Upload hatası:", error);
        alert("Dosya yüklenirken bir hata oluştu");
      }
    };

    // File input'u tetikle
    input.click();
  };

  // Renk seçme fonksiyonu
  const handleColorSelect = (color: string) => {
    editor?.chain().focus().setColor(color).run();
    setShowColorPalette(false);
  };

  const ToolbarButton = ({
    onClick,
    isActive = false,
    icon,
    title,
    disabled = false,
    text,
  }: {
    onClick: () => void;
    isActive?: boolean;
    icon?: React.ComponentType;
    title: string;
    disabled?: boolean;
    text?: string;
  }) => (
    <button
      className={`toolbar-btn ${isActive ? "active" : ""} ${
        disabled ? "disabled" : ""
      }`}
      onClick={onClick}
      title={title}
      disabled={disabled}
    >
      {icon && <Icon as={icon} />}
      {text && <span className="btn-text">{text}</span>}
    </button>
  );

  return (
    <Box
      border="1px"
      borderColor={borderColor}
      borderRadius="md"
      overflow="hidden"
      bg={editorBg}
    >
      {/* Toolbar */}
      {!readOnly && (
        <VStack gap={0} align="stretch">
          <HStack p={3} gap={1} wrap="wrap">
            {/* Undo/Redo */}
            <ToolbarButton
              onClick={() => editor.chain().focus().undo().run()}
              text="↶"
              title="Geri Al (Ctrl+Z)"
              disabled={!editor.can().undo()}
            />
            <ToolbarButton
              onClick={() => editor.chain().focus().redo().run()}
              text="↷"
              title="İleri Al (Ctrl+Y)"
              disabled={!editor.can().redo()}
            />

            <Separator orientation="vertical" h="20px" />

            {/* Text Style Buttons */}
            <ToolbarButton
              onClick={() => editor.chain().focus().setParagraph().run()}
              isActive={editor.isActive("paragraph")}
              text="P"
              title="Paragraf"
            />
            <ToolbarButton
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 1 }).run()
              }
              isActive={editor.isActive("heading", { level: 1 })}
              text="H1"
              title="Başlık 1"
            />
            <ToolbarButton
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
              isActive={editor.isActive("heading", { level: 2 })}
              text="H2"
              title="Başlık 2"
            />
            <ToolbarButton
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 3 }).run()
              }
              isActive={editor.isActive("heading", { level: 3 })}
              text="H3"
              title="Başlık 3"
            />

            <Separator orientation="vertical" h="20px" />

            {/* Text Formatting */}
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleBold().run()}
              isActive={editor.isActive("bold")}
              text="B"
              title="Kalın"
            />
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleItalic().run()}
              isActive={editor.isActive("italic")}
              text="I"
              title="İtalik"
            />
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              isActive={editor.isActive("underline")}
              text="U"
              title="Alt Çizgi"
            />
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleHighlight().run()}
              isActive={editor.isActive("highlight")}
              text="🖍️"
              title="Vurgulama"
            />
            <Box position="relative">
              <ToolbarButton
                onClick={() => setShowColorPalette(!showColorPalette)}
                text="🎨"
                title="Metin Rengi"
              />

              {/* Renk Paleti */}
              {showColorPalette && (
                <Box
                  ref={colorPaletteRef}
                  position="absolute"
                  top="100%"
                  left="0"
                  mt={2}
                  p={3}
                  bg="white"
                  border="1px solid"
                  borderColor="gray.200"
                  borderRadius="md"
                  boxShadow="lg"
                  zIndex={1000}
                  minW="200px"
                >
                  <Text fontSize="sm" fontWeight="bold" mb={2}>
                    Renk Seçin:
                  </Text>
                  <Box
                    display="grid"
                    gridTemplateColumns="repeat(6, 1fr)"
                    gap={1}
                  >
                    {colors.map((color) => (
                      <Box
                        key={color}
                        w="24px"
                        h="24px"
                        bg={color}
                        border="1px solid"
                        borderColor={
                          color === "#FFFFFF" ? "gray.300" : "transparent"
                        }
                        borderRadius="sm"
                        cursor="pointer"
                        _hover={{ transform: "scale(1.1)" }}
                        transition="transform 0.1s"
                        onClick={() => handleColorSelect(color)}
                        title={color}
                      />
                    ))}
                  </Box>
                </Box>
              )}
            </Box>
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleCode().run()}
              isActive={editor.isActive("code")}
              text="</>"
              title="Kod"
            />

            <Separator orientation="vertical" h="20px" />

            {/* Lists */}
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              isActive={editor.isActive("bulletList")}
              text="•"
              title="Madde İşareti Listesi"
            />
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              isActive={editor.isActive("orderedList")}
              text="1."
              title="Numaralı Liste"
            />

            <Separator orientation="vertical" h="20px" />

            {/* Block Elements */}
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              isActive={editor.isActive("blockquote")}
              text="❝"
              title="Alıntı Bloğu"
            />
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              isActive={editor.isActive("codeBlock")}
              text="{}"
              title="Kod Bloğu"
            />

            <Separator orientation="vertical" h="20px" />

            {/* Text Alignment */}
            <ToolbarButton
              onClick={() => editor.chain().focus().setTextAlign("left").run()}
              isActive={editor.isActive({ textAlign: "left" })}
              text="≡"
              title="Sol Hizalama"
            />
            <ToolbarButton
              onClick={() =>
                editor.chain().focus().setTextAlign("center").run()
              }
              isActive={editor.isActive({ textAlign: "center" })}
              text="≡"
              title="Orta Hizalama"
            />
            <ToolbarButton
              onClick={() => editor.chain().focus().setTextAlign("right").run()}
              isActive={editor.isActive({ textAlign: "right" })}
              text="≡"
              title="Sağ Hizalama"
            />
            <ToolbarButton
              onClick={() =>
                editor.chain().focus().setTextAlign("justify").run()
              }
              isActive={editor.isActive({ textAlign: "justify" })}
              text="≡"
              title="İki Yana Hizalama"
            />

            <Separator orientation="vertical" h="20px" />

            {/* Table */}
            <ToolbarButton
              onClick={() =>
                editor
                  .chain()
                  .focus()
                  .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
                  .run()
              }
              text="⊞"
              title="Tablo Ekle"
            />

            <Separator orientation="vertical" h="20px" />

            {/* Links and Images */}
            <ToolbarButton
              onClick={() => {
                const url = window.prompt("Link URL:");
                if (url) {
                  editor.chain().focus().setLink({ href: url }).run();
                }
              }}
              isActive={editor.isActive("link")}
              text="🔗"
              title="Link Ekle"
            />
            <ToolbarButton
              onClick={() => handleImageUpload()}
              text="🖼️"
              title="Görsel Ekle"
            />

            {/* Image Inline/Block Toggle - yeni paket için güncellendi */}
            <Separator orientation="vertical" h="20px" />
            <ToolbarButton
              onClick={() => {
                // Yeni pakette görsel seçimini kontrol et
                const { selection } = editor.state;
                const { from } = selection;

                // Cursor pozisyonundaki node'u kontrol et
                const nodeAtPos = editor.state.doc.nodeAt(from);

                if (
                  nodeAtPos &&
                  (nodeAtPos.type.name === "image" ||
                    nodeAtPos.type.name === "resizableImage")
                ) {
                  // Yeni pakette inline/block geçişi farklı şekilde çalışır
                  // CSS class'ları ile kontrol edilir
                  const currentClass = nodeAtPos.attrs.class || "";
                  const isCurrentlyInline = currentClass.includes("inline");

                  if (isCurrentlyInline) {
                    // Block yap
                    editor
                      .chain()
                      .focus()
                      .updateAttributes("image", {
                        class: "tiptap-image-resizable block",
                      })
                      .run();
                  } else {
                    // Inline yap
                    editor
                      .chain()
                      .focus()
                      .updateAttributes("image", {
                        class: "tiptap-image-resizable inline",
                      })
                      .run();
                  }
                }
              }}
              text="🔄"
              title="Görsel Modu Değiştir (Inline/Block)"
              disabled={(() => {
                // Yeni pakette görsel seçimini kontrol et
                const { selection } = editor.state;
                const { from } = selection;

                // Cursor pozisyonundaki node'u kontrol et
                const nodeAtPos = editor.state.doc.nodeAt(from);

                return !(
                  nodeAtPos &&
                  (nodeAtPos.type.name === "image" ||
                    nodeAtPos.type.name === "resizableImage")
                );
              })()}
            />
          </HStack>
          <Box h="1px" bg="gray.300" />
        </VStack>
      )}

      {/* Editor Content */}
      <Box p={4} minH="300px" position="relative">
        <EditorContent
          editor={editor}
          className="tiptap-editor-container"
          style={{
            outline: "none",
            minHeight: "250px",
            color: textColor,
            maxWidth: "100%",
            overflow: "hidden",
          }}
        />

        {/* Bubble Menu - Seçim menüsü */}
        {!readOnly && editor && (
          <BubbleMenu editor={editor} className="bubble-menu">
            <Box
              bg="gray.900"
              color="white"
              p={2}
              borderRadius="lg"
              boxShadow="lg"
              display="flex"
              gap={1}
            >
              <ToolbarButton
                onClick={() => editor.chain().focus().toggleBold().run()}
                isActive={editor.isActive("bold")}
                text="B"
                title="Kalın"
              />
              <ToolbarButton
                onClick={() => editor.chain().focus().toggleItalic().run()}
                isActive={editor.isActive("italic")}
                text="I"
                title="İtalik"
              />
              <ToolbarButton
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                isActive={editor.isActive("underline")}
                text="U"
                title="Alt Çizgi"
              />
              <Box w="1px" bg="gray.600" />
              <ToolbarButton
                onClick={() => {
                  const url = window.prompt("Link URL:");
                  if (url) {
                    editor.chain().focus().setLink({ href: url }).run();
                  }
                }}
                isActive={editor.isActive("link")}
                text="🔗"
                title="Link Ekle"
              />
              <ToolbarButton
                onClick={() => editor.chain().focus().toggleHighlight().run()}
                isActive={editor.isActive("highlight")}
                text="🖍️"
                title="Vurgulama"
              />
            </Box>
          </BubbleMenu>
        )}

        {/* Floating Menu - Boş satır menüsü */}
        {!readOnly && editor && (
          <FloatingMenu editor={editor} className="floating-menu">
            <Box
              bg="white"
              border="1px solid"
              borderColor="gray.200"
              borderRadius="lg"
              boxShadow="lg"
              p={2}
              display="flex"
              gap={1}
            >
              <ToolbarButton
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 1 }).run()
                }
                text="H1"
                title="Başlık 1"
              />
              <ToolbarButton
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 2 }).run()
                }
                text="H2"
                title="Başlık 2"
              />
              <ToolbarButton
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                text="•"
                title="Liste"
              />
              <Box w="1px" bg="gray.300" />
              <ToolbarButton
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                text="❝"
                title="Alıntı"
              />
              <ToolbarButton
                onClick={() => handleImageUpload()}
                text="🖼️"
                title="Görsel"
              />
              <ToolbarButton
                onClick={() =>
                  editor
                    .chain()
                    .focus()
                    .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
                    .run()
                }
                text="⊞"
                title="Tablo"
              />
            </Box>
          </FloatingMenu>
        )}

        {/* Character Count */}
        {!readOnly && editor && (
          <Box mt={2} textAlign="right">
            <Text fontSize="sm" color="gray.500">
              {editor.storage.characterCount.characters()} karakter,{" "}
              {editor.storage.characterCount.words()} kelime
            </Text>
          </Box>
        )}
      </Box>
    </Box>
  );
}
