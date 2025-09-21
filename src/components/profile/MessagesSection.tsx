"use client";

import { Button } from "@/components/ui/button";
import { ContactMessage } from "@/hooks/useUserProfile";
import { useRouter } from "next/navigation";
import { FiMail } from "react-icons/fi";

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
        className:
          "bg-success-light text-success-text border border-primary-200",
        label: "Yanıtlandı",
      },
      pending: {
        className:
          "bg-warning-light text-warning-text border border-yellow-200",
        label: "Bekliyor",
      },
      archived: {
        className: "bg-gray-100 text-gray-800 border border-gray-200",
        label: "Arşivlendi",
      },
    };

    const config =
      statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;

    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium ${config.className}`}
      >
        {config.label}
      </span>
    );
  };

  if (contactMessages.length === 0) {
    return (
      <div className="text-center py-12 bg-background-alt rounded-lg border border-border-color">
        <FiMail className="h-16 w-16 text-gray-300 mx-auto mb-6" />
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Henüz gönderilen mesaj bulunmuyor
        </h3>
        <p className="text-secondary mb-6">
          Sorularınız veya önerileriniz için bizimle iletişime geçebilirsiniz.
        </p>
        <Button
          className="bg-primary hover:bg-primary-hover text-white px-6 py-3"
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
        <h3 className="text-lg font-semibold text-foreground">
          Gönderilen Mesajlar ({contactMessages.length})
        </h3>
      </div>

      <div className="space-y-4">
        {contactMessages.map((message) => (
          <div
            key={message.id}
            className="bg-background border border-border-color rounded-lg p-6 hover:shadow-sm transition-shadow duration-200"
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                {getStatusBadge(message.status)}
                <span className="text-sm text-muted">
                  {formatDate(message.createdAt)}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="prose prose-sm max-w-none">
                <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                  {message.message}
                </p>
              </div>

              {message.status === "answered" && (
                <div className="bg-success-light border border-primary-200 rounded-lg p-4 mt-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span className="text-sm font-medium text-success-text">
                      Bu mesajınız yanıtlandı
                    </span>
                  </div>
                  <p className="text-sm text-success">
                    Yanıtımızı e-posta adresinize gönderdik. E-posta kutunuzu
                    kontrol etmeyi unutmayın.
                  </p>
                </div>
              )}

              {message.status === "pending" && (
                <div className="bg-warning-light border border-yellow-200 rounded-lg p-4 mt-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-warning rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-warning-text">
                      Mesajınızı değerlendiriyoruz
                    </span>
                  </div>
                  <p className="text-sm text-yellow-700">
                    En kısa sürede size dönüş yapacağız. Sabırlı olduğunuz için
                    teşekkürler.
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="text-center pt-4 border-t border-border-color">
        <Button
          variant="outline"
          onClick={() => router.push("/iletisim")}
          className="border-primary text-primary hover:bg-primary-50"
        >
          Yeni Mesaj Gönder
        </Button>
      </div>
    </div>
  );
}
