import BlogCard from "@/components/blog/BlogCard";
import { BlogGridProps } from "@/types";

export default function BlogGrid({ posts }: BlogGridProps) {
  if (posts.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-16">
        <div className="flex flex-col gap-4 text-center">
          <p className="text-xl text-gray-600">
            Bu kategoride henüz blog yazısı bulunmuyor.
          </p>
          <p className="text-gray-500">
            Yakında yeni içeriklerle karşınızda olacağız!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}