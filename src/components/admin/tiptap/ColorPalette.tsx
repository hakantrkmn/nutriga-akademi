import { Editor } from "@tiptap/react";
import { useEffect, useRef } from "react";
import { colors } from "./editorConfig";

interface ColorPaletteProps {
  editor: Editor;
  showColorPalette: boolean;
  setShowColorPalette: (show: boolean) => void;
}

export const ColorPalette = ({
  editor,
  showColorPalette,
  setShowColorPalette,
}: ColorPaletteProps) => {
  const colorPaletteRef = useRef<HTMLDivElement>(null);

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
  }, [showColorPalette, setShowColorPalette]);

  const handleColorSelect = (color: string) => {
    editor?.chain().focus().setColor(color).run();
    setShowColorPalette(false);
  };

  if (!showColorPalette) return null;

  return (
    <div
      ref={colorPaletteRef}
      className="absolute top-full left-0 mt-2 p-3 bg-white border border-gray-200 rounded-md shadow-lg z-[1000] min-w-[200px]"
    >
      <p className="text-sm font-bold mb-2">Renk Seçin:</p>
      <div className="grid grid-cols-6 gap-1">
        {colors.map((color) => (
          <div
            key={color}
            className="w-6 h-6 rounded-sm cursor-pointer border transition-transform hover:scale-110"
            style={{
              backgroundColor: color,
              borderColor: color === "#FFFFFF" ? "#d1d5db" : "transparent",
            }}
            onClick={() => handleColorSelect(color)}
            title={color}
          />
        ))}
      </div>
    </div>
  );
};
