import { toaster } from "@/components/ui/toaster";
import { Editor } from "@tiptap/react";
import { ColorPalette } from "./ColorPalette";
import { ToolbarButton } from "./ToolbarButton";

interface ToolbarProps {
  editor: Editor;
  showColorPalette: boolean;
  setShowColorPalette: (show: boolean) => void;
  setLinkModalOpen: (open: boolean) => void;
  setYouTubeModalOpen: (open: boolean) => void;
}

export const Toolbar = ({
  editor,
  showColorPalette,
  setShowColorPalette,
  setLinkModalOpen,
  setYouTubeModalOpen,
}: ToolbarProps) => {
  const handleHTMLImport = () => {
    const htmlContent = window.prompt("HTML içeriğini yapıştırın:", "");

    if (htmlContent && htmlContent.trim()) {
      try {
        // HTML'i TipTap editor'e import et
        editor.commands.setContent(htmlContent);
        toaster.success("HTML içeriği başarıyla yüklendi");
      } catch (error) {
        console.error("HTML import hatası:", error);
        toaster.error("HTML içeriği yüklenirken bir hata oluştu");
      }
    }
  };
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
        toaster.error(
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

  return (
    <div className="tiptap-toolbar-container flex flex-col">
      <div className="p-3 flex gap-1 flex-wrap">
        <ToolbarButton
          onClick={() => editor.chain().focus().undo().run()}
          title="Geri Al"
          disabled={!editor.can().undo()}
        >
          ↶
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().redo().run()}
          title="İleri Al"
          disabled={!editor.can().redo()}
        >
          ↷
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().unsetAllMarks().run()}
          title="Formatı Temizle"
        >
          🧹
        </ToolbarButton>

        <div className="w-px h-5 bg-gray-300" />

        <ToolbarButton
          onClick={() => editor.chain().focus().setParagraph().run()}
          isActive={editor.isActive("paragraph")}
          title="Paragraf"
        >
          P
        </ToolbarButton>
        <ToolbarButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          isActive={editor.isActive("heading", { level: 1 })}
          title="Başlık 1"
        >
          H1
        </ToolbarButton>
        <ToolbarButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          isActive={editor.isActive("heading", { level: 2 })}
          title="Başlık 2"
        >
          H2
        </ToolbarButton>
        <ToolbarButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          isActive={editor.isActive("heading", { level: 3 })}
          title="Başlık 3"
        >
          H3
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().unsetAllMarks().run()}
          title="Formatı Temizle"
        >
          ��
        </ToolbarButton>
        {/* HTML Import Butonu */}
        <ToolbarButton onClick={handleHTMLImport} title="HTML İçeriği Yükle">
          📄
        </ToolbarButton>
        <div className="w-px h-5 bg-gray-300" />

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
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleSubscript().run()}
          isActive={editor.isActive("subscript")}
          title="Alt Simge"
        >
          x₂
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleSuperscript().run()}
          isActive={editor.isActive("superscript")}
          title="Üst Simge"
        >
          x²
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          isActive={editor.isActive("highlight")}
          title="Vurgulama"
        >
          🖍️
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleCode().run()}
          isActive={editor.isActive("code")}
          title="Kod"
        >
          {"</>"}
        </ToolbarButton>

        <div className="w-px h-5 bg-gray-300" />

        <ToolbarButton
          onClick={() => {
            if (editor.isActive("textStyle", { fontFamily: "monospace" })) {
              editor.chain().focus().unsetFontFamily().run();
            } else {
              editor.chain().focus().setFontFamily("monospace").run();
            }
          }}
          isActive={editor.isActive("textStyle", { fontFamily: "monospace" })}
          title="Monospace"
        >
          Mono
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setFontSize("12px").run()}
          isActive={editor.isActive("textStyle", { fontSize: "12px" })}
          title="Küçük Yazı"
        >
          A-
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().unsetFontSize().run()}
          title="Normal Yazı"
        >
          A
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setFontSize("20px").run()}
          isActive={editor.isActive("textStyle", { fontSize: "20px" })}
          title="Büyük Yazı"
        >
          A+
        </ToolbarButton>

        <div className="w-px h-5 bg-gray-300" />

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive("bulletList")}
          title="Madde İşareti Listesi"
        >
          •
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive("orderedList")}
          title="Numaralı Liste"
        >
          1.
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleTaskList().run()}
          isActive={editor.isActive("taskList")}
          title="Görev Listesi"
        >
          ☑
        </ToolbarButton>

        <div className="w-px h-5 bg-gray-300" />

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          isActive={editor.isActive("blockquote")}
          title="Alıntı Bloğu"
        >
          ❝
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          isActive={editor.isActive("codeBlock")}
          title="Kod Bloğu"
        >
          {"{ }"}
        </ToolbarButton>
        <ToolbarButton
          onClick={() => {
            const language = window.prompt(
              "Kod bloğu dilini girin:",
              editor.getAttributes("codeBlock").language || ""
            );
            if (language) {
              editor
                .chain()
                .focus()
                .updateAttributes("codeBlock", { language })
                .run();
            }
          }}
          text="Lang"
          title="Kod Dili Belirle"
          disabled={!editor.isActive("codeBlock")}
        />

        <div className="w-px h-5 bg-gray-300" />

        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          isActive={editor.isActive({ textAlign: "left" })}
          title="Sol Hizalama"
        >
          ≡
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          isActive={editor.isActive({ textAlign: "center" })}
          title="Orta Hizalama"
        >
          ≡
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          isActive={editor.isActive({ textAlign: "right" })}
          title="Sağ Hizalama"
        >
          ≡
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          isActive={editor.isActive({ textAlign: "justify" })}
          title="İki Yana Hizalama"
        >
          ≡
        </ToolbarButton>

        <div className="w-px h-5 bg-gray-300" />

        <ToolbarButton
          onClick={() =>
            editor
              .chain()
              .focus()
              .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
              .run()
          }
          title="Tablo Ekle"
        >
          ⊞
        </ToolbarButton>
        <ToolbarButton
          onClick={() => setYouTubeModalOpen(true)}
          title="YouTube Videosu Ekle"
        >
          ▶️
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          title="Yatay Çizgi Ekle"
        >
          —
        </ToolbarButton>

        <div className="w-px h-5 bg-gray-300" />

        <ToolbarButton
          onClick={() => setLinkModalOpen(true)}
          isActive={editor.isActive("link")}
          title="Link Ekle"
        >
          🔗
        </ToolbarButton>
        <ToolbarButton onClick={handleImageUpload} title="Görsel Ekle">
          🖼️
        </ToolbarButton>
        <ToolbarButton
          onClick={() => {
            const { from } = editor.state.selection;
            const node = editor.state.doc.nodeAt(from);
            if (node && ["image", "resizableImage"].includes(node.type.name)) {
              const nodeType = node.type.name;
              const currentClasses = (node.attrs.class || "").split(" ");
              const isCentered = currentClasses.includes("tiptap-image-center");
              const newClasses = currentClasses.filter(
                (cls: string) =>
                  !cls.startsWith("tiptap-image-") && cls.trim() !== ""
              );
              if (!isCentered) newClasses.push("tiptap-image-center");
              editor
                .chain()
                .focus()
                .updateAttributes(nodeType, { class: newClasses.join(" ") })
                .run();
            }
          }}
          title="Görseli Ortala / Satır İçi Yap"
          isActive={(() => {
            const { from } = editor.state.selection;
            const node = editor.state.doc.nodeAt(from);
            if (!node || !["image", "resizableImage"].includes(node.type.name))
              return false;
            return (node.attrs.class || "").includes("tiptap-image-center");
          })()}
          disabled={(() => {
            const { from } = editor.state.selection;
            const node = editor.state.doc.nodeAt(from);
            return (
              !node || !["image", "resizableImage"].includes(node.type.name)
            );
          })()}
        >
          🖼️↔️
        </ToolbarButton>

        <div className="relative">
          <ToolbarButton
            onClick={() => setShowColorPalette(!showColorPalette)}
            title="Metin Rengi"
          >
            🎨
          </ToolbarButton>
          <ColorPalette
            editor={editor}
            showColorPalette={showColorPalette}
            setShowColorPalette={setShowColorPalette}
          />
        </div>

        <div className="w-px h-5 bg-gray-300" />

        <ToolbarButton
          onClick={() =>
            editor.chain().focus().toggleTextStyle({ lineHeight: "1.2" }).run()
          }
          isActive={editor.isActive("textStyle", { lineHeight: "1.2" })}
          title="Satır Aralığı 1.2"
        >
          📏1.2
        </ToolbarButton>
        <ToolbarButton
          onClick={() =>
            editor.chain().focus().toggleTextStyle({ lineHeight: "1.5" }).run()
          }
          isActive={editor.isActive("textStyle", { lineHeight: "1.5" })}
          title="Satır Aralığı 1.5"
        >
          📏1.5
        </ToolbarButton>
        <ToolbarButton
          onClick={() =>
            editor.chain().focus().toggleTextStyle({ lineHeight: "2.0" }).run()
          }
          isActive={editor.isActive("textStyle", { lineHeight: "2.0" })}
          title="Satır Aralığı 2.0"
        >
          📏2.0
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().unsetLineHeight().run()}
          title="Satır Aralığını Sıfırla"
        >
          📏↺
        </ToolbarButton>
      </div>
    </div>
  );
};
