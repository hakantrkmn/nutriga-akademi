"use client";
import { BlogPost } from "@/types";
import dynamic from "next/dynamic";

const TipTapWrapper = dynamic(() => import("../common/TipTapWrapper"), {
  ssr: false,
});
const TipTapEditor = dynamic(() => import("../admin/TipTapEditor"), {
  ssr: false,
});
interface BlogDetailContentTipTapProps {
  content: object;
  isEditing: boolean;
  formData: BlogPost;
  setFormData: (formData: BlogPost) => void;
}
export default function BlogDetailContentTipTap({
  isEditing,
  content,
  setFormData,
  formData,
}: BlogDetailContentTipTapProps) {
  return (
    <>
      {isEditing ? (
        <TipTapEditor
          content={content as object}
          placeholder="Blog yazısının içeriğini buraya yazın..."
          onChange={(content) => setFormData({ ...formData, content })}
        />
      ) : (
        <TipTapWrapper content={content as object} className="blog-content" />
      )}
    </>
  );
}
