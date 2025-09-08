import { EgitimContentProps } from "@/types";
import dynamic from "next/dynamic";

const TipTapWrapper = dynamic(
  () => import("@/components/common/TipTapWrapper"),
  {
    ssr: false,
  }
);
const TipTapEditor = dynamic(() => import("@/components/admin/TipTapEditor"), {
  ssr: false,
});

export default function EgitimContent({
  egitim,
  isEditing,
  setFormData,
}: EgitimContentProps) {
  return (
    <div className="w-full bg-white rounded-xl p-8 shadow-sm border border-gray-100">
      {isEditing ? (
        <TipTapEditor
          content={egitim.content as object}
          onChange={(content) => setFormData?.({ ...egitim, content })}
          placeholder="Eğitim içeriğini buraya yazın..."
        />
      ) : (
        <TipTapWrapper
          content={egitim.content as object}
          className="egitim-content"
        />
      )}
    </div>
  );
}
