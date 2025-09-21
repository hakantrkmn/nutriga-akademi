"use client";

import { BlogDetailContentProps } from "@/types";
import BlogDetailFooter from "./BlogDetailFooter";
import BlogDetailHeader from "./BlogDetailHeader";
import BlogDetailContentTipTap from "./BlogDetailTipTapSection";

export default function BlogDetailContent({ post }: BlogDetailContentProps) {
  return (
    <div className="bg-background-alt min-h-screen">
      <div className="container mx-auto px-4 md:px-6 py-8 max-w-4xl">
        <div className="flex flex-col gap-8 w-full">
          <BlogDetailHeader post={post} />

          <BlogDetailContentTipTap
            formData={post}
            setFormData={() => {}}
            isEditing={false}
            content={post.content as object}
          />

          <BlogDetailFooter />
        </div>
      </div>
    </div>
  );
}
