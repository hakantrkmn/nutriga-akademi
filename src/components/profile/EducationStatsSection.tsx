"use client";

import { CartItem, ContactMessage, UserProfile } from "@/hooks/useUserProfile";

interface EducationStatsSectionProps {
  profile: UserProfile;
  purchasedItems: CartItem[];
  contactMessages: ContactMessage[];
}

export function EducationStatsSection({
  profile,
  purchasedItems,
  contactMessages,
}: EducationStatsSectionProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const answeredMessagesCount = contactMessages.filter(
    (m) => m.status === "answered"
  ).length;
  const membershipYear = new Date(profile.createdAt).getFullYear();

  const stats = [
    {
      title: "Satın Aldığım Eğitim",
      value: purchasedItems.length,
      color: "info",
      icon: "📚",
    },
    {
      title: "Yanıtlanan Mesaj",
      value: answeredMessagesCount,
      color: "success",
      icon: "✉️",
    },
    {
      title: "Üyelik Yılı",
      value: membershipYear,
      color: "primary",
      icon: "🎓",
    },
  ];

  const getStatCardClasses = (color: string) => {
    const colorMap = {
      info: "bg-info-light border-info",
      success: "bg-success-light border-success",
      primary: "bg-primary-50 border-primary-200",
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.info;
  };

  const getTextClasses = (color: string) => {
    const colorMap = {
      info: "text-info-text",
      success: "text-success-text",
      primary: "text-primary",
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.info;
  };

  const getValueClasses = (color: string) => {
    const colorMap = {
      info: "text-info",
      success: "text-success",
      primary: "text-primary-700",
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.info;
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-foreground">Eğitim Durumu</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`text-center p-6 border rounded-lg transition-all duration-200 hover:shadow-sm ${getStatCardClasses(stat.color)}`}
          >
            <div className="text-2xl mb-3">{stat.icon}</div>
            <div
              className={`text-3xl font-bold mb-2 ${getValueClasses(stat.color)}`}
            >
              {stat.value}
            </div>
            <p className={`font-medium ${getTextClasses(stat.color)}`}>
              {stat.title}
            </p>
          </div>
        ))}
      </div>

      <div className="border-t border-border-color pt-6">
        <h4 className="text-lg font-medium text-foreground mb-4">
          Profil Özeti
        </h4>
        <div className="bg-background-alt rounded-lg p-6 border border-border-color">
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <dt className="text-sm font-medium text-muted">Ad Soyad</dt>
              <dd className="text-sm text-foreground font-semibold">
                {profile.firstName} {profile.lastName}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted">Meslek</dt>
              <dd className="text-sm text-foreground font-semibold">
                {profile.profession}
              </dd>
            </div>
            {profile.university && (
              <div>
                <dt className="text-sm font-medium text-muted">Üniversite</dt>
                <dd className="text-sm text-foreground font-semibold">
                  {profile.university}
                </dd>
              </div>
            )}
            {profile.department && (
              <div>
                <dt className="text-sm font-medium text-muted">Bölüm</dt>
                <dd className="text-sm text-foreground font-semibold">
                  {profile.department}
                </dd>
              </div>
            )}
            {profile.class && (
              <div>
                <dt className="text-sm font-medium text-muted">Sınıf</dt>
                <dd className="text-sm text-foreground font-semibold">
                  {profile.class}. Sınıf
                </dd>
              </div>
            )}
            <div>
              <dt className="text-sm font-medium text-muted">Üyelik Tarihi</dt>
              <dd className="text-sm text-foreground font-semibold">
                {formatDate(profile.createdAt)}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
