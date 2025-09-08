"use client";

import BlogCard from "@/components/blog/BlogCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BlogPost } from "@/types";
import Link from "next/link";
import { useEffect, useState } from "react";

interface BlogSectionProps {
  posts: BlogPost[];
}

export default function BlogSection({ posts }: BlogSectionProps) {
  const [columns, setColumns] = useState(3);

  useEffect(() => {
    const checkColumns = () => {
      if (window.innerWidth < 768) setColumns(1);
      else if (window.innerWidth < 1024) setColumns(2);
      else setColumns(3);
    };
    checkColumns();
    window.addEventListener("resize", checkColumns);
    return () => window.removeEventListener("resize", checkColumns);
  }, []);

  // En son blog yazılarını al (createdAt'e göre sırala)
  const latestBlogPosts = posts
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 6);

  return (
    <div className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex flex-col gap-12 items-center">
          {/* Section Header */}
          <div className="flex flex-col gap-4 text-center max-w-[600px]">
            <Badge className="text-green-600 bg-green-50 px-4 py-2 rounded-full text-sm font-semibold w-fit mx-auto">
              Blog
            </Badge>

            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              En Güncel
              <span className="block text-green-600">Beslenme İçerikleri</span>
            </h2>

            <p className="text-base md:text-lg text-gray-600 leading-relaxed">
              Beslenme alanındaki son gelişmeler, uzman görüşleri ve pratik
              öneriler için blog yazılarımızı takip edin.
            </p>
          </div>

          {/* Blog Grid */}
          <div
            className={`grid gap-6 md:gap-8 w-full max-w-6xl ${
              columns === 1
                ? "grid-cols-1"
                : columns === 2
                ? "grid-cols-1 md:grid-cols-2"
                : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            }`}
          >
            {latestBlogPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>

          {/* Newsletter Section */}
          <div className="w-full max-w-2xl">
            <div className="bg-gray-50 rounded-2xl p-8 text-center">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Güncel İçeriklerden Haberdar Olun
              </h3>
              <p className="text-gray-600 mb-6">
                Yeni blog yazıları ve eğitim duyuruları için e-posta listemize
                katılın.
              </p>
              <div className="flex gap-3 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="E-posta adresiniz"
                  className="flex-1 focus:border-green-500 focus:ring-1 focus:ring-green-500"
                />
                <Button className="bg-green-600 hover:bg-green-700 text-white px-6">
                  Abone Ol
                </Button>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <Link href="/blog">
              <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg font-semibold rounded-xl hover:-translate-y-0.5 hover:shadow-lg transition-all">
                Tüm Blog Yazılarını Gör
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
