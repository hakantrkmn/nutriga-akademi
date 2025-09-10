import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { BlogCardProps } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { FiUser } from "react-icons/fi";

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <Card className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer h-full">
        <div className="h-48 w-full bg-gray-100 relative overflow-hidden">
          <Image
            src={post.imageUrl || "/images/blog-default.jpg"}
            alt={post.title}
            width={400}
            height={200}
            loading="lazy"
            className="w-full h-48 object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        <CardContent className="p-6">
          <div className="flex flex-col gap-4 h-full">
            <Badge className="text-primary-600 bg-primary-50 text-xs px-2 py-1 rounded-md w-fit">
              {post.category}
            </Badge>

            <h3 className="text-lg font-semibold text-gray-800 leading-tight hover:text-primary-600 transition-colors line-clamp-2">
              {post.title}
            </h3>

            <p className="text-sm text-gray-600 leading-relaxed flex-1 line-clamp-3">
              {post.excerpt}
            </p>

            <div className="flex justify-between items-center w-full pt-2">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <FiUser className="w-4 h-4" />
                <span>{post.author}</span>
              </div>
            </div>

            <p className="text-xs text-gray-400">
              {new Date(post.createdAt).toLocaleDateString("tr-TR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
