import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BlogPost } from "@/types";
import { ArrowLeft, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface BlogDetailHeaderProps {
  post: BlogPost;
}

export default function BlogDetailHeader({ post }: BlogDetailHeaderProps) {
  return (
    <>
      <Link href="/blog">
        <Button variant="ghost" className="text-primary hover:bg-primary/10">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Blog&apos;a Dön
        </Button>
      </Link>

      <div className="flex flex-col gap-6 items-start w-full">
        <Badge className="text-sm px-3 py-1 rounded-lg bg-primary-100 text-primary">
          {post.category}
        </Badge>

        <h1 className="text-3xl font-bold text-foreground leading-tight">
          {post.title}
        </h1>

        <div className="flex justify-between items-center w-full flex-wrap gap-4">
          <div className="flex items-center gap-4 text-sm text-secondary">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{post.author}</span>
            </div>
          </div>

          <span className="text-sm text-text-muted">
            {new Date(post.createdAt).toLocaleDateString("tr-TR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
      </div>

      <Image
        src={post.imageUrl || ""}
        alt={post.title}
        width={800}
        height={400}
        className="w-full h-[400px] object-cover rounded-xl"
      />
    </>
  );
}
