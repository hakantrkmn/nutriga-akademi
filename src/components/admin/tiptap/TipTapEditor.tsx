"use client";

import { getHTMLContent } from "@/utils";
import { EditorContent, useEditor } from "@tiptap/react";
import { BubbleMenu, FloatingMenu } from "@tiptap/react/menus";
import { useState } from "react";
import "tiptap-extension-resizable-image/styles.css";
import { getEditorExtensions } from "./editorConfig";
import { LinkModal } from "./LinkModal";
import { Toolbar } from "./Toolbar";
import { ToolbarButton } from "./ToolbarButton";
import { YouTubeModal } from "./YouTubeModal";

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
  const [, forceUpdate] = useState({});
  const [showColorPalette, setShowColorPalette] = useState(false);
  const [isLinkModalOpen, setLinkModalOpen] = useState(false);
  const [isYouTubeModalOpen, setYouTubeModalOpen] = useState(false);

  const editorBg = "white";
  const borderColor = "gray.200";
  const textColor = "gray.900";

  const editor = useEditor({
    extensions: getEditorExtensions(placeholder),
    content: getHTMLContent(content) || "",
    editable: !readOnly,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      if (onChange) onChange(editor.getJSON());
      forceUpdate({});
    },
    onSelectionUpdate: () => {
      forceUpdate({});
    },
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
        console.error("Dosya boyutu 10MB'dan küçük olmalıdır");
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
        console.error(
          "Sadece JPG, PNG, GIF, WebP ve SVG dosyaları yüklenebilir"
        );
        return;
      }

      try {
        const formData = new FormData();
        formData.append("file", file);
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        const result = await response.json();

        if (result.success) {
          editor.chain().focus().setImage({ src: result.url }).run();
        } else {
          console.error(`Upload hatası: ${result.error}`);
        }
      } catch (error) {
        console.error("Upload hatası:", error);
      }
    };
    input.click();
  };

  return (
    <div
      className={`border border-gray-300 rounded-md overflow-hidden ${
        editorBg === "white" ? "bg-white" : "bg-gray-50"
      }`}
    >
      {!readOnly && (
        <Toolbar
          editor={editor}
          showColorPalette={showColorPalette}
          setShowColorPalette={setShowColorPalette}
          setLinkModalOpen={setLinkModalOpen}
          setYouTubeModalOpen={setYouTubeModalOpen}
        />
      )}

      <div className="p-4 min-h-[300px] relative">
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

        {!readOnly && editor && (
          <BubbleMenu editor={editor} className="bubble-menu">
            <div className="bg-gray-900 text-white p-2 rounded-lg shadow-lg flex gap-1">
              <ToolbarButton
                onClick={() => editor.chain().focus().toggleBold().run()}
                isActive={editor.isActive("bold")}
                title="Kalın"
              >
                B
              </ToolbarButton>
              <ToolbarButton
                onClick={() => editor.chain().focus().toggleItalic().run()}
                isActive={editor.isActive("italic")}
                title="İtalik"
              >
                I
              </ToolbarButton>
              <ToolbarButton
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                isActive={editor.isActive("underline")}
                title="Alt Çizgi"
              >
                U
              </ToolbarButton>
            </div>
          </BubbleMenu>
        )}

        {!readOnly && editor && (
          <FloatingMenu editor={editor} className="floating-menu">
            <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-2 flex gap-1">
              <ToolbarButton
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 1 }).run()
                }
                title="Başlık 1"
              >
                H1
              </ToolbarButton>
              <ToolbarButton
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 2 }).run()
                }
                title="Başlık 2"
              >
                H2
              </ToolbarButton>
              <ToolbarButton
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                title="Liste"
              >
                •
              </ToolbarButton>
              <ToolbarButton
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                title="Alıntı"
              >
                ❝
              </ToolbarButton>
              <ToolbarButton onClick={handleImageUpload} title="Görsel">
                🖼️
              </ToolbarButton>
              <ToolbarButton
                onClick={() =>
                  editor
                    .chain()
                    .focus()
                    .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
                    .run()
                }
                title="Tablo"
              >
                ⊞
              </ToolbarButton>
            </div>
          </FloatingMenu>
        )}

        {!readOnly && editor && (
          <div className="mt-2 text-right">
            <p className="text-sm text-gray-500">
              {editor.storage.characterCount.characters()} karakter,{" "}
              {editor.storage.characterCount.words()} kelime
            </p>
          </div>
        )}
      </div>

      <LinkModal
        editor={editor}
        isOpen={isLinkModalOpen}
        onClose={() => setLinkModalOpen(false)}
      />

      <YouTubeModal
        editor={editor}
        isOpen={isYouTubeModalOpen}
        onClose={() => setYouTubeModalOpen(false)}
      />
    </div>
  );
}
