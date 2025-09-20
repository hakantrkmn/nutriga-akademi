"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { FiMail } from "react-icons/fi";
import { ContactMessage } from "@/hooks/useUserProfile";

interface MessagesSectionProps {
  contactMessages: ContactMessage[];
}

export function MessagesSection({ contactMessages }: MessagesSectionProps) {
  const router = useRouter();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      answered: {
        className: "bg-green-100 text-green-800 border border-green-200",
        label: "Yanıtlandı"
      },
      pending: {
        className: "bg-yellow-100 text-yellow-800 border border-yellow-200",
        label: "Bekliyor"
      },
      archived: {
        className: "bg-gray-100 text-gray-800 border border-gray-200",
        label: "Arşivlendi"
      }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${config.className}`}>
        {config.label}
      </span>
    );
  };

  if (contactMessages.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
        <FiMail className="h-16 w-16 text-gray-300 mx-auto mb-6" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Henüz gönderilen mesaj bulunmuyor
        </h3>
        <p className="text-gray-600 mb-6">
          Sorularınız veya önerileriniz için bizimle iletişime geçebilirsiniz.
        </p>
        <Button
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3"
          onClick={() => router.push("/iletisim")}
        >
          İletişime Geçin
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">
          Gönderilen Mesajlar ({contactMessages.length})
        </h3>
      </div>
      
      <div className="space-y-4">
        {contactMessages.map((message) => (
          <div
            key={message.id}
            className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-sm transition-shadow duration-200"
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                {getStatusBadge(message.status)}
                <span className="text-sm text-gray-500">
                  {formatDate(message.createdAt)}
                </span>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="prose prose-sm max-w-none">
                <p className="text-gray-900 leading-relaxed whitespace-pre-wrap">
                  {message.message}
                </p>
              </div>
              
              {message.status === "answered" && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-green-800">
                      Bu mesajınız yanıtlandı
                    </span>
                  </div>
                  <p className="text-sm text-green-700">
                    Yanıtımızı e-posta adresinize gönderdik. E-posta kutunuzu kontrol etmeyi unutmayın.
                  </p>
                </div>
              )}
              
              {message.status === "pending" && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-yellow-800">
                      Mesajınızı değerlendiriyoruz
                    </span>
                  </div>
                  <p className="text-sm text-yellow-700">
                    En kısa sürede size dönüş yapacağız. Sabırlı olduğunuz için teşekkürler.
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-center pt-4 border-t border-gray-200">
        <Button
          variant="outline"
          onClick={() => router.push("/iletisim")}
          className="border-green-600 text-green-600 hover:bg-green-50"
        >
          Yeni Mesaj Gönder
        </Button>
      </div>
    </div>
  );
}