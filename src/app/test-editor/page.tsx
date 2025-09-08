"use client";

import TipTapEditor from "@/components/admin/TipTapEditor";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function TestEditorPage() {
  const [content, setContent] = useState<object | null>(null);
  const [savedContent, setSavedContent] = useState<object | null>(null);

  const handleSave = () => {
    if (!content) {
      alert("Kaydedilecek içerik bulunamadı!");
      return;
    }

    setSavedContent(content);

    // JSON dosyası olarak indir
    const dataStr = JSON.stringify(content, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `tiptap-content-${new Date()
      .toISOString()
      .slice(0, 19)
      .replace(/:/g, "-")}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    console.log("Saved content:", content);
  };

  const handleClear = () => {
    setContent(null);
    setSavedContent(null);
  };

  const handleLoadSample = () => {
    const sampleContent = {
      type: "doc",
      content: [
        {
          type: "heading",
          attrs: { level: 1 },
          content: [{ type: "text", text: "TipTap Editör Test Sayfası" }],
        },
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Bu bir " },
            { type: "text", marks: [{ type: "bold" }], text: "kalın" },
            { type: "text", text: " ve " },
            { type: "text", marks: [{ type: "italic" }], text: "italik" },
            { type: "text", text: " metin örneğidir." },
          ],
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "Özellikler" }],
        },
        {
          type: "bulletList",
          content: [
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [
                    { type: "text", text: "Görsel yükleme ve boyutlandırma" },
                  ],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Tablo ekleme" }],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Kod blokları" }],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Link ekleme" }],
                },
              ],
            },
          ],
        },
        {
          type: "heading",
          attrs: { level: 3 },
          content: [{ type: "text", text: "Kod Örneği" }],
        },
        {
          type: "codeBlock",
          attrs: { language: "javascript" },
          content: [
            {
              type: "text",
              text: "const editor = useEditor({\n  extensions: [StarterKit],\n  content: '<p>Hello World!</p>',\n})",
            },
          ],
        },
        {
          type: "heading",
          attrs: { level: 3 },
          content: [{ type: "text", text: "Alıntı" }],
        },
        {
          type: "blockquote",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "TipTap, modern web uygulamaları için güçlü bir rich text editörüdür.",
                },
              ],
            },
          ],
        },
      ],
    };
    setContent(sampleContent);
  };

  return (
    <div className="w-full h-screen p-0">
      <div className="flex flex-col h-screen gap-0">
        {/* Header */}
        <div className="w-full bg-gray-50 p-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div className="flex flex-col items-start gap-1">
              <h1 className="text-xl font-semibold text-gray-800">
                TipTap Editör Test Sayfası
              </h1>
              <p className="text-gray-600 text-sm">
                Tüm editör özelliklerini test edebilirsiniz
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={handleLoadSample}
                variant="outline"
                size="sm"
                className="border-blue-200 text-blue-600 hover:bg-blue-50"
              >
                Örnek İçerik Yükle
              </Button>
              <Button
                onClick={handleSave}
                size="sm"
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                Kaydet
              </Button>
              <Button
                onClick={handleClear}
                variant="outline"
                size="sm"
                className="border-red-200 text-red-600 hover:bg-red-50"
              >
                Temizle
              </Button>
            </div>
          </div>
        </div>

        {/* Editor */}
        <div className="w-full flex-1 p-4 relative">
          <TipTapEditor
            content={content}
            onChange={setContent}
            placeholder="Buraya yazmaya başlayın... Tüm editör özelliklerini test edebilirsiniz!"
          />

          {/* Floating Save Button - Sağ alt köşe */}
          <Button
            onClick={handleSave}
            size="lg"
            className="fixed bottom-5 right-5 rounded-full shadow-lg z-[1000] bg-green-600 hover:bg-green-700 text-white hover:scale-105 hover:shadow-xl transition-all duration-200"
            disabled={!content}
          >
            💾 Kaydet
          </Button>
        </div>

        {/* Footer - Content Preview */}
        {savedContent && (
          <div className="w-full bg-gray-100 p-4 border-t border-gray-200 max-h-48 overflow-auto">
            <div className="flex flex-col items-start gap-2">
              <p className="font-bold text-gray-700">
                Kaydedilen İçerik (JSON):
              </p>
              <div className="bg-white p-3 rounded-md border border-gray-300 w-full text-xs font-mono overflow-auto">
                <pre>{JSON.stringify(savedContent, null, 2)}</pre>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
