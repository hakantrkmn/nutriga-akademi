"use client";

import { EducationStatsSection } from "@/components/profile/EducationStatsSection";
import { MessagesSection } from "@/components/profile/MessagesSection";
import { ProfileEditForm } from "@/components/profile/ProfileEditForm";
import { PurchasesSection } from "@/components/profile/PurchasesSection";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toaster } from "@/components/ui/toaster";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiBook, FiMail, FiShoppingBag, FiUser } from "react-icons/fi";

export default function HesabimPage() {
  const router = useRouter();
  const {
    profile,
    purchasedItems,
    contactMessages,
    loading,
    saving,
    editForm,
    setEditForm,
    handleSave,
  } = useUserProfile();

  const [isEditing, setIsEditing] = useState(false);

  const handleSaveProfile = async () => {
    try {
      await handleSave();
      toaster.success("Profil bilgileriniz güncellendi");
    } catch {
      toaster.error("Profil güncellenirken bir hata oluştu");
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    // Form verileri hook'ta otomatik olarak reset edilir
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background-alt flex items-center justify-center site-root">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-secondary">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-background-alt flex items-center justify-center site-root">
        <Card className="w-full max-w-md bg-card border-border-color">
          <CardContent className="p-6 text-center">
            <p className="text-secondary mb-4">Profil bilgileri bulunamadı</p>
            <Button
              onClick={() => router.push("/")}
              variant="outline"
              className="border-primary text-primary hover:bg-primary-50"
            >
              Ana Sayfaya Dön
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-alt py-8 site-root">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Hesabım</h1>
          <p className="text-secondary mt-2">
            Profil bilgilerinizi yönetin ve aktivitelerinizi görüntüleyin
          </p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-card border-border-color rounded-lg">
            <TabsTrigger
              value="profile"
              className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              <FiUser className="h-4 w-4" />
              <span className="hidden sm:inline">Profil Bilgileri</span>
              <span className="sm:hidden">Profil</span>
            </TabsTrigger>
            <TabsTrigger
              value="purchases"
              className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              <FiShoppingBag className="h-4 w-4" />
              <span className="hidden sm:inline">Satın Alımlar</span>
              <span className="sm:hidden">Alımlar</span>
            </TabsTrigger>
            <TabsTrigger
              value="messages"
              className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              <FiMail className="h-4 w-4" />
              <span className="hidden sm:inline">Gönderilen Mesajlar</span>
              <span className="sm:hidden">Mesajlar</span>
            </TabsTrigger>
            <TabsTrigger
              value="education"
              className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              <FiBook className="h-4 w-4" />
              <span className="hidden sm:inline">Eğitim Bilgileri</span>
              <span className="sm:hidden">Eğitim</span>
            </TabsTrigger>
          </TabsList>

          {/* Profil Bilgileri */}
          <TabsContent value="profile" className="space-y-6">
            <Card className="bg-card border-border-color shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <FiUser className="h-5 w-5 text-primary" />
                  Profil Bilgileri
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ProfileEditForm
                  profile={profile}
                  editForm={editForm}
                  setEditForm={setEditForm}
                  isEditing={isEditing}
                  setIsEditing={setIsEditing}
                  saving={saving}
                  onSave={handleSaveProfile}
                  onCancel={handleCancelEdit}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Satın Alımlar */}
          <TabsContent value="purchases">
            <Card className="bg-card border-border-color shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <FiShoppingBag className="h-5 w-5 text-primary" />
                  Satın Aldığım Eğitimler
                </CardTitle>
              </CardHeader>
              <CardContent>
                <PurchasesSection purchasedItems={purchasedItems} />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Gönderilen Mesajlar */}
          <TabsContent value="messages">
            <Card className="bg-card border-border-color shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <FiMail className="h-5 w-5 text-primary" />
                  Gönderilen Mesajlar
                </CardTitle>
              </CardHeader>
              <CardContent>
                <MessagesSection contactMessages={contactMessages} />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Eğitim Bilgileri */}
          <TabsContent value="education">
            <Card className="bg-card border-border-color shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <FiBook className="h-5 w-5 text-primary" />
                  Eğitim Durumu
                </CardTitle>
              </CardHeader>
              <CardContent>
                <EducationStatsSection
                  profile={profile}
                  purchasedItems={purchasedItems}
                  contactMessages={contactMessages}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
