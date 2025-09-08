"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toaster } from "@/components/ui/toaster";
import { blogApi } from "@/lib/api";
import { BlogPost } from "@/types";
import { Edit, Loader2, Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export default function BlogManagement() {
  const router = useRouter();
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  // Blog yazılarını yükle
  const loadBlogPosts = async () => {
    try {
      setLoading(true);
      const response = await blogApi.getAll();

      if (response.success && response.data) {
        setBlogPosts(response.data);
      } else {
        toaster.error("Blog yazıları yüklenemedi");
        console.error("Blog yazıları yüklenemedi:", response.error);
      }
    } catch (error) {
      toaster.error("Blog yazıları yüklenirken bir hata oluştu");
      console.error("Blog yazıları yüklenirken hata:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBlogPosts();
  }, []);

  // Yeni blog yazısı ekle
  const handleAddPost = () => {
    router.push("/admin/blog/yeni");
  };

  // Blog yazısı düzenle
  const handleEditPost = (post: BlogPost) => {
    if (post.id) {
      router.push(`/admin/blog/yeni/${post.id}`);
    }
  };

  // Blog yazısı sil
  const handleDeletePost = async (id: string) => {
    try {
      const response = await blogApi.delete(id);

      if (response.success) {
        await loadBlogPosts(); // Listeyi yenile
        toaster.success("Blog yazısı başarıyla silindi");
      } else {
        toaster.error("Blog yazısı silinemedi");
        console.error("Blog yazısı silinemedi");
      }
    } catch (error) {
      toaster.error("Blog yazısı silinirken bir hata oluştu");
      console.error("Blog yazısı silinirken hata:", error);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8">
        <div className="flex flex-col gap-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                Blog Yönetimi
              </h1>
              <p className="text-gray-600">
                Blog yazılarınızı ekleyin, düzenleyin ve yönetin
              </p>
            </div>
            <Button
              onClick={handleAddPost}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Yeni Blog Yazısı
            </Button>
          </div>

          {/* Loading State */}
          <Card className="bg-white">
            <CardContent className="p-6">
              <div className="flex justify-center items-center py-20">
                <div className="flex flex-col items-center gap-4">
                  <Loader2 className="w-8 h-8 text-green-500 animate-spin" />
                  <p className="text-gray-600 text-lg">
                    Blog yazıları yükleniyor...
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8">
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">
              Blog Yönetimi
            </h1>
            <p className="text-gray-600">
              Blog yazılarınızı ekleyin, düzenleyin ve yönetin
            </p>
          </div>
          <Button
            onClick={handleAddPost}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Yeni Blog Yazısı
          </Button>
        </div>

        {/* Blog Yazıları Tablosu */}
        <Card className="bg-white rounded-lg shadow-sm">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="text-gray-700 font-semibold text-sm py-4 px-6">
                    Başlık
                  </TableHead>
                  <TableHead className="text-gray-700 font-semibold text-sm py-4 px-6">
                    Kategori
                  </TableHead>
                  <TableHead className="text-gray-700 font-semibold text-sm py-4 px-6">
                    Yazar
                  </TableHead>
                  <TableHead className="text-gray-700 font-semibold text-sm py-4 px-6">
                    Özet
                  </TableHead>
                  <TableHead className="text-gray-700 font-semibold text-sm py-4 px-6">
                    Tarih
                  </TableHead>
                  <TableHead className="text-gray-700 font-semibold text-sm py-4 px-6 text-center">
                    İşlemler
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {blogPosts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-12">
                      <div className="flex flex-col items-center gap-3">
                        <p className="text-gray-500 text-lg">
                          Henüz blog yazısı eklenmemiş
                        </p>
                        <p className="text-gray-400 text-sm">
                          İlk blog yazınızı eklemek için &quot;Yeni Blog
                          Yazısı&quot; butonuna tıklayın
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  blogPosts.map((post, index) => (
                    <TableRow
                      key={post.id}
                      className={`hover:bg-gray-50 ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-25"
                      }`}
                    >
                      <TableCell className="py-4 px-6">
                        <div className="flex flex-col items-start gap-1">
                          <p className="font-medium text-gray-900">
                            {post.title}
                          </p>
                          <p className="text-sm text-gray-500">/{post.slug}</p>
                        </div>
                      </TableCell>
                      <TableCell className="py-4 px-6">
                        {post.category ? (
                          <Badge className="bg-purple-100 text-purple-800">
                            {post.category}
                          </Badge>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </TableCell>
                      <TableCell className="py-4 px-6">
                        <p className="text-sm text-gray-700">
                          {post.author || "-"}
                        </p>
                      </TableCell>
                      <TableCell className="py-4 px-6">
                        <p className="text-sm text-gray-600 max-w-[200px] truncate">
                          {post.excerpt || "-"}
                        </p>
                      </TableCell>
                      <TableCell className="py-4 px-6">
                        <p className="text-sm text-gray-500">
                          {post.createdAt
                            ? new Date(post.createdAt).toLocaleDateString(
                                "tr-TR"
                              )
                            : "-"}
                        </p>
                      </TableCell>
                      <TableCell className="py-4 px-6 text-center">
                        <div className="flex gap-2 justify-center">
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-blue-200 text-blue-600 hover:bg-blue-50"
                            onClick={() => handleEditPost(post)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-red-200 text-red-600 hover:bg-red-50"
                            onClick={() => post.id && handleDeletePost(post.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
