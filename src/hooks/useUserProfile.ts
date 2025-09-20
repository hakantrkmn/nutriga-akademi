"use client";

import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  profession: string;
  university?: string;
  department?: string;
  class?: string;
  email: string;
  phone: string;
  notificationPermission: boolean;
  desiredEducationId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  id: string;
  educationId: string;
  quantity: number;
  createdAt: string;
  education: {
    id: string;
    title: string;
    price: number;
    imageUrl?: string;
    category: string;
    instructor: string;
    level: string;
  };
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: string;
  isRead: boolean;
  createdAt: string;
}

export interface EditForm {
  firstName: string;
  lastName: string;
  profession: string;
  university: string;
  department: string;
  class: string;
  phone: string;
  notificationPermission: boolean;
}

export interface UseUserProfileReturn {
  user: User | null;
  profile: UserProfile | null;
  purchasedItems: CartItem[];
  contactMessages: ContactMessage[];
  loading: boolean;
  saving: boolean;
  editForm: EditForm;
  setEditForm: React.Dispatch<React.SetStateAction<EditForm>>;
  handleSave: () => Promise<void>;
  loadUserData: (userId: string) => Promise<void>;
}

export function useUserProfile(): UseUserProfileReturn {
  const router = useRouter();
  const supabase = createClient();
  
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [purchasedItems, setPurchasedItems] = useState<CartItem[]>([]);
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [editForm, setEditForm] = useState<EditForm>({
    firstName: "",
    lastName: "",
    profession: "",
    university: "",
    department: "",
    class: "",
    phone: "",
    notificationPermission: false,
  });

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/auth/login");
        return;
      }
      setUser(user);
      await loadUserData(user.id);
    };

    checkAuth();
  }, [router, supabase]);

  const loadUserData = async (userId: string) => {
    try {
      setLoading(true);
      
      // Kullanıcı profilini yükle
      const profileResponse = await fetch(`/api/user/profile-full?userId=${userId}`);
      const profileData = await profileResponse.json();
      
      if (profileData.success) {
        setProfile(profileData.data);
        setEditForm({
          firstName: profileData.data.firstName || "",
          lastName: profileData.data.lastName || "",
          profession: profileData.data.profession || "",
          university: profileData.data.university || "",
          department: profileData.data.department || "",
          class: profileData.data.class || "",
          phone: profileData.data.phone || "",
          notificationPermission: profileData.data.notificationPermission || false,
        });
      }

      // Satın alınan eğitimleri yükle
      const purchasesResponse = await fetch(`/api/user/purchases?userId=${userId}`);
      const purchasesData = await purchasesResponse.json();
      
      if (purchasesData.success) {
        setPurchasedItems(purchasesData.data);
      }

      // Gönderilen mesajları yükle
      const messagesResponse = await fetch(`/api/user/messages?userId=${userId}`);
      const messagesData = await messagesResponse.json();
      
      if (messagesData.success) {
        setContactMessages(messagesData.data);
      }
    } catch (error) {
      console.error("Kullanıcı verileri yüklenirken hata:", error);
      throw new Error("Kullanıcı verileri yüklenirken bir hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!user) return;
    
    try {
      setSaving(true);
      
      const response = await fetch("/api/user/profile-update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          ...editForm,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setProfile(result.data);
        return Promise.resolve();
      } else {
        throw new Error(result.error || "Güncelleme başarısız");
      }
    } catch (error) {
      console.error("Profil güncellenirken hata:", error);
      throw error;
    } finally {
      setSaving(false);
    }
  };

  return {
    user,
    profile,
    purchasedItems,
    contactMessages,
    loading,
    saving,
    editForm,
    setEditForm,
    handleSave,
    loadUserData,
  };
}