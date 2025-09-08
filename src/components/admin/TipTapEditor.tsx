"use client";

import { getHTMLContent } from "@/utils";
import { Box, HStack, VStack } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import { Separator, Text } from "@chakra-ui/react";
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
import React, { useEffect, useRef, useState } from "react";
import { ResizableImage } from "tiptap-extension-resizable-image";
import "tiptap-extension-resizable-image/styles.css";
import { toaster } from "@/components/ui/toaster";

interface TipTapEditorProps {
  content?: object | null;
  onChange?: (content: object) => void;
  placeholder?: string;
  readOnly?: boolean;
}

interface ToolbarButtonProps {
  onClick: () => void;
  isActive?: boolean;
  title: string;
  disabled?: boolean;
  text?: string;
  children?: React.ReactNode;
}

export default function TipTapEditor({
  content,
  onChange,
  placeholder = "İçeriğinizi buraya yazın...",
  readOnly = false,
}: TipTapEditorProps) {
  const [, forceUpdate] = useState({});
  const [showColorPalette, setShowColorPalette] = useState(false);
  const colorPaletteRef = useRef<HTMLDivElement>(null);
  const [isLinkModalOpen, setLinkModalOpen] = useState(false);
  const [isYouTubeModalOpen, setYouTubeModalOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");

  const editorBg = "white";
  const borderColor = "gray.200";
  const textColor = "gray.900";

  const colors = [
    "#000000", "#333333", "#666666", "#999999", "#CCCCCC", "#FFFFFF",
    "#FF0000", "#FF6600", "#FFCC00", "#00FF00", "#0066FF", "#6600FF",
    "#FF0066", "#FF3366", "#FF6699", "#FF99CC", "#FFCCFF", "#CC99FF",
    "#9966FF", "#6633FF", "#3300FF", "#0033FF", "#0066CC", "#0099FF",
    "#00CCFF", "#00FFFF", "#00FFCC", "#00FF99", "#00FF66", "#00FF33",
    "#66FF00", "#99FF00", "#CCFF00", "#FFFF00", "#FF9900", "#FF3300",
    "#CC0000", "#990000", "#660000", "#330000", "#8B4513", "#FF1493",
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (colorPaletteRef.current && !colorPaletteRef.current.contains(event.target as Node)) {
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
      StarterKit.configure({ codeBlock: false, horizontalRule: false }),
      Heading.configure({ levels: [1, 2, 3, 4, 5, 6] }),
      Image.configure({ HTMLAttributes: { class: "tiptap-image" } }),
      ResizableImage.configure({ allowBase64: true, defaultWidth: 200, defaultHeight: 200, HTMLAttributes: { class: "tiptap-image-resizable" } }),
      Link.configure({ openOnClick: false, HTMLAttributes: { class: "tiptap-link" } }),
      Table.configure({ resizable: true }),
      TableRow, TableHeader, TableCell,
      CodeBlockLowlight.configure({ lowlight: createLowlight() }),
      Highlight.configure({ multicolor: true }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Underline, TextStyle,
      Color.configure({ types: ["textStyle"] }),
      FontFamily.configure({ types: ["textStyle"] }),
      FontSize.configure({ types: ["textStyle"] }),
      Subscript, Superscript, TaskList,
      TaskItem.configure({ nested: true }),
      Youtube.configure({ controls: false, nocookie: true }),
      HorizontalRule,
      Mention.configure({ HTMLAttributes: { class: "mention" } }),
      CharacterCount, BubbleMenuExt, FloatingMenuExt,
      Placeholder.configure({ placeholder }),
    ],
    content: getHTMLContent(content) || "",
    editable: !readOnly,
    immediatelyRender: false,
    onUpdate: ({ editor }) => { if (onChange) onChange(editor.getJSON()); forceUpdate({}); },
    onSelectionUpdate: () => { forceUpdate({}); },
  });

  if (!editor) return null;

  const handleImageUpload = async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (!file) return;
      if (file.size > 10 * 1024 * 1024) {
        toaster.error("Dosya boyutu 10MB'dan küçük olmalıdır");
        return;
      }
      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
        "image/webp",
        "image/svg+xml",
      ];
      if (!allowedTypes.includes(file.type)) {
        toaster.error("Sadece JPG, PNG, GIF, WebP ve SVG dosyaları yüklenebilir");
        return;
      }
      try {
        const formData = new FormData();
        formData.append("file", file);
        const response = await fetch("/api/upload", { method: "POST", body: formData });
        const result = await response.json();
        if (result.success) {
          editor.chain().focus().setImage({ src: result.url }).run();
          toaster.success("Görsel başarıyla yüklendi");
        } else {
          toaster.error(`Upload hatası: ${result.error}`);
        }
      } catch (error) {
        console.error("Upload hatası:", error);
        toaster.error("Dosya yüklenirken bir hata oluştu");
      }
    };
    input.click();
  };

  const handleColorSelect = (color: string) => { editor?.chain().focus().setColor(color).run(); setShowColorPalette(false); };

  const handleLinkSubmit = () => { if (linkUrl) { editor.chain().focus().setLink({ href: linkUrl }).run(); } setLinkModalOpen(false); setLinkUrl(""); };
  const handleYouTubeSubmit = () => { if (youtubeUrl) { editor.commands.setYoutubeVideo({ src: youtubeUrl }); } setYouTubeModalOpen(false); setYoutubeUrl(""); };

  const ToolbarButton = ({ onClick, isActive = false, title, disabled = false, text, children }: ToolbarButtonProps) => (
    <button
      className={`toolbar-btn ${isActive ? "active" : ""} ${
        disabled ? "disabled" : ""
      }`}
      onClick={onClick}
      title={title}
      disabled={disabled}
    >
      {text && <span className="btn-text">{text}</span>}
      {children}
    </button>
  );

  return (
    <Box border="1px" borderColor={borderColor} borderRadius="md" overflow="hidden" bg={editorBg}>
      {!readOnly && (
        <VStack className="tiptap-toolbar-container" gap={0} align="stretch">
          <HStack p={3} gap={1} wrap="wrap">
            <ToolbarButton onClick={() => editor.chain().focus().undo().run()} title="Geri Al" disabled={!editor.can().undo()}>
              ↶
            </ToolbarButton>
            <ToolbarButton onClick={() => editor.chain().focus().redo().run()} title="İleri Al" disabled={!editor.can().redo()}>
              ↷
            </ToolbarButton>
            <ToolbarButton onClick={() => editor.chain().focus().unsetAllMarks().run()} title="Formatı Temizle">
              🧹
            </ToolbarButton>

            <Separator orientation="vertical" h="20px" />

            <ToolbarButton onClick={() => editor.chain().focus().setParagraph().run()} isActive={editor.isActive("paragraph")} title="Paragraf">P</ToolbarButton>
            <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} isActive={editor.isActive("heading", { level: 1 })} title="Başlık 1">H1</ToolbarButton>
            <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} isActive={editor.isActive("heading", { level: 2 })} title="Başlık 2">H2</ToolbarButton>
            <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} isActive={editor.isActive("heading", { level: 3 })} title="Başlık 3">H3</ToolbarButton>

            <Separator orientation="vertical" h="20px" />

            <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} isActive={editor.isActive("bold")} title="Kalın">B</ToolbarButton>
            <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} isActive={editor.isActive("italic")} title="İtalik">I</ToolbarButton>
            <ToolbarButton onClick={() => editor.chain().focus().toggleUnderline().run()} isActive={editor.isActive("underline")} title="Alt Çizgi">U</ToolbarButton>
            <ToolbarButton onClick={() => editor.chain().focus().toggleSubscript().run()} isActive={editor.isActive("subscript")} title="Alt Simge">x₂</ToolbarButton>
            <ToolbarButton onClick={() => editor.chain().focus().toggleSuperscript().run()} isActive={editor.isActive("superscript")} title="Üst Simge">x²</ToolbarButton>
            <ToolbarButton onClick={() => editor.chain().focus().toggleHighlight().run()} isActive={editor.isActive("highlight")} title="Vurgulama">🖍️</ToolbarButton>
            <ToolbarButton onClick={() => editor.chain().focus().toggleCode().run()} isActive={editor.isActive("code")} title="Kod">{"</>"}</ToolbarButton>

            <Separator orientation="vertical" h="20px" />

            <ToolbarButton onClick={() => { if (editor.isActive("textStyle", { fontFamily: "monospace" })) { editor.chain().focus().unsetFontFamily().run(); } else { editor.chain().focus().setFontFamily("monospace").run(); } }} isActive={editor.isActive("textStyle", { fontFamily: "monospace" })} title="Monospace">Mono</ToolbarButton>
            <ToolbarButton onClick={() => editor.chain().focus().setFontSize("12px").run()} isActive={editor.isActive("textStyle", { fontSize: "12px" })} title="Küçük Yazı">A-</ToolbarButton>
            <ToolbarButton onClick={() => editor.chain().focus().unsetFontSize().run()} title="Normal Yazı">A</ToolbarButton>
            <ToolbarButton onClick={() => editor.chain().focus().setFontSize("20px").run()} isActive={editor.isActive("textStyle", { fontSize: "20px" })} title="Büyük Yazı">A+</ToolbarButton>

            <Separator orientation="vertical" h="20px" />

            <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} isActive={editor.isActive("bulletList")} title="Madde İşareti Listesi">•</ToolbarButton>
            <ToolbarButton onClick={() => editor.chain().focus().toggleOrderedList().run()} isActive={editor.isActive("orderedList")} title="Numaralı Liste">1.</ToolbarButton>
            <ToolbarButton onClick={() => editor.chain().focus().toggleTaskList().run()} isActive={editor.isActive("taskList")} title="Görev Listesi">☑</ToolbarButton>

            <Separator orientation="vertical" h="20px" />

            <ToolbarButton onClick={() => editor.chain().focus().toggleBlockquote().run()} isActive={editor.isActive("blockquote")} title="Alıntı Bloğu">❝</ToolbarButton>
            <ToolbarButton onClick={() => editor.chain().focus().toggleCodeBlock().run()} isActive={editor.isActive("codeBlock")} title="Kod Bloğu">{'{ }'}</ToolbarButton>
            <ToolbarButton onClick={() => { const language = window.prompt("Kod bloğu dilini girin:", editor.getAttributes("codeBlock").language || ""); if (language) { editor.chain().focus().updateAttributes("codeBlock", { language }).run(); } }} text="Lang" title="Kod Dili Belirle" disabled={!editor.isActive("codeBlock")} />

            <Separator orientation="vertical" h="20px" />

            <ToolbarButton onClick={() => editor.chain().focus().setTextAlign("left").run()} isActive={editor.isActive({ textAlign: "left" })} title="Sol Hizalama">≡</ToolbarButton>
            <ToolbarButton onClick={() => editor.chain().focus().setTextAlign("center").run()} isActive={editor.isActive({ textAlign: "center" })} title="Orta Hizalama">≡</ToolbarButton>
            <ToolbarButton onClick={() => editor.chain().focus().setTextAlign("right").run()} isActive={editor.isActive({ textAlign: "right" })} title="Sağ Hizalama">≡</ToolbarButton>
            <ToolbarButton onClick={() => editor.chain().focus().setTextAlign("justify").run()} isActive={editor.isActive({ textAlign: "justify" })} title="İki Yana Hizalama">≡</ToolbarButton>

            <Separator orientation="vertical" h="20px" />

            <ToolbarButton onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()} title="Tablo Ekle">⊞</ToolbarButton>
            <ToolbarButton onClick={() => setYouTubeModalOpen(true)} title="YouTube Videosu Ekle">▶️</ToolbarButton>
            <ToolbarButton onClick={() => editor.chain().focus().setHorizontalRule().run()} title="Yatay Çizgi Ekle">—</ToolbarButton>

            <Separator orientation="vertical" h="20px" />

            <ToolbarButton onClick={() => setLinkModalOpen(true)} isActive={editor.isActive("link")} title="Link Ekle">🔗</ToolbarButton>
            <ToolbarButton onClick={handleImageUpload} title="Görsel Ekle">🖼️</ToolbarButton>
            <ToolbarButton
              onClick={() => {
                const { from } = editor.state.selection;
                const node = editor.state.doc.nodeAt(from);
                if (node && ["image", "resizableImage"].includes(node.type.name)) {
                  const nodeType = node.type.name;
                  const currentClasses = (node.attrs.class || "").split(" ");
                  const isCentered = currentClasses.includes("tiptap-image-center");
                  const newClasses = currentClasses.filter((cls: string) => !cls.startsWith("tiptap-image-") && cls.trim() !== "");
                  if (!isCentered) newClasses.push("tiptap-image-center");
                  editor.chain().focus().updateAttributes(nodeType, { class: newClasses.join(" ") }).run();
                }
              }}
              title="Görseli Ortala / Satır İçi Yap"
              isActive={(() => {
                const { from } = editor.state.selection;
                const node = editor.state.doc.nodeAt(from);
                if (!node || !["image", "resizableImage"].includes(node.type.name)) return false;
                return (node.attrs.class || "").includes("tiptap-image-center");
              })()}
              disabled={(() => {
                const { from } = editor.state.selection;
                const node = editor.state.doc.nodeAt(from);
                return !node || !["image", "resizableImage"].includes(node.type.name);
              })()}
            >
              🖼️↔️
            </ToolbarButton>

            <Box position="relative">
              <ToolbarButton onClick={() => setShowColorPalette(!showColorPalette)} title="Metin Rengi">🎨</ToolbarButton>
              {showColorPalette && (
                <Box ref={colorPaletteRef} position="absolute" top="100%" left="0" mt={2} p={3} bg="white" border="1px solid" borderColor="gray.200" borderRadius="md" boxShadow="lg" zIndex={1000} minW="200px">
                  <Text fontSize="sm" fontWeight="bold" mb={2}>Renk Seçin:</Text>
                  <Box display="grid" gridTemplateColumns="repeat(6, 1fr)" gap={1}>
                    {colors.map((color) => (
                      <Box key={color} w="24px" h="24px" bg={color} border="1px solid" borderColor={color === "#FFFFFF" ? "gray.300" : "transparent"} borderRadius="sm" cursor="pointer" _hover={{ transform: "scale(1.1)" }} transition="transform 0.1s" onClick={() => handleColorSelect(color)} title={color} />
                    ))}
                  </Box>
                </Box>
              )}
            </Box>

          </HStack>
        </VStack>
      )}

      <Box p={4} minH="300px" position="relative">
        <EditorContent editor={editor} className="tiptap-editor-container" style={{ outline: "none", minHeight: "250px", color: textColor, maxWidth: "100%", overflow: "hidden" }} />
        {!readOnly && editor && (
          <BubbleMenu editor={editor} className="bubble-menu">
            <Box bg="gray.900" color="white" p={2} borderRadius="lg" boxShadow="lg" display="flex" gap={1}>
              <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} isActive={editor.isActive("bold")} title="Kalın">B</ToolbarButton>
              <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} isActive={editor.isActive("italic")} title="İtalik">I</ToolbarButton>
              <ToolbarButton onClick={() => editor.chain().focus().toggleUnderline().run()} isActive={editor.isActive("underline")} title="Alt Çizgi">U</ToolbarButton>
            </Box>
          </BubbleMenu>
        )}
        {!readOnly && editor && (
          <FloatingMenu editor={editor} className="floating-menu">
            <Box bg="white" border="1px solid" borderColor="gray.200" borderRadius="lg" boxShadow="lg" p={2} display="flex" gap={1}>
              <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} title="Başlık 1">H1</ToolbarButton>
              <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} title="Başlık 2">H2</ToolbarButton>
              <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} title="Liste">•</ToolbarButton>
              <ToolbarButton onClick={() => editor.chain().focus().toggleBlockquote().run()} title="Alıntı">❝</ToolbarButton>
              <ToolbarButton onClick={handleImageUpload} title="Görsel">🖼️</ToolbarButton>
              <ToolbarButton onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()} title="Tablo">⊞</ToolbarButton>
            </Box>
          </FloatingMenu>
        )}
        {!readOnly && editor && (
          <Box mt={2} textAlign="right">
            <Text fontSize="sm" color="gray.500">
              {editor.storage.characterCount.characters()} karakter, {editor.storage.characterCount.words()} kelime
            </Text>
          </Box>
        )}
      </Box>

      {/* Link Modal */}
      <Modal isOpen={isLinkModalOpen} onClose={() => setLinkModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Link Ekle/Düzenle</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>URL</FormLabel>
              <Input type="url" value={linkUrl} onChange={(e) => setLinkUrl(e.target.value)} placeholder="https://example.com" />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="gray" mr={3} onClick={() => setLinkModalOpen(false)}>İptal</Button>
            <Button colorScheme="green" onClick={handleLinkSubmit}>Kaydet</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* YouTube Modal */}
      <Modal isOpen={isYouTubeModalOpen} onClose={() => setYouTubeModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>YouTube Videosu Ekle</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>YouTube Video URL</FormLabel>
              <Input type="url" value={youtubeUrl} onChange={(e) => setYoutubeUrl(e.target.value)} placeholder="https://www.youtube.com/watch?v=..." />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="gray" mr={3} onClick={() => setYouTubeModalOpen(false)}>İptal</Button>
            <Button colorScheme="green" onClick={handleYouTubeSubmit}>Ekle</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
