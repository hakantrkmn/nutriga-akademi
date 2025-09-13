"use client";

import { AccountInfoForm } from "@/components/auth/AccountInfoForm";
import { EducationSelection } from "@/components/auth/EducationSelection";
import { PersonalInfoForm } from "@/components/auth/PersonalInfoForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { toaster } from "@/components/ui/toaster";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RegisterModal({ isOpen, onClose }: RegisterModalProps) {
  const router = useRouter();
  const supabase = createClient();

  // Account Info
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Personal Info
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [profession, setProfession] = useState("");
  const [university, setUniversity] = useState("");
  const [department, setDepartment] = useState("");
  const [classValue, setClassValue] = useState("");

  // Education Selection
  const [selectedEducationId, setSelectedEducationId] = useState("");

  // KVKK Acceptance
  const [kvkkAccepted, setKvkkAccepted] = useState(false);

  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    if (password !== confirmPassword) {
      toaster.error("Şifreler eşleşmiyor");
      return false;
    }

    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !email.trim() ||
      !profession ||
      !phone.trim()
    ) {
      toaster.error("Lütfen zorunlu alanları doldurun");
      return false;
    }

    if (profession === "Öğrenci") {
      if (!university.trim() || !department.trim() || !classValue) {
        toaster.error(
          "Öğrenciler için üniversite, bölüm ve sınıf bilgileri zorunludur"
        );
        return false;
      }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toaster.error("Geçerli bir e-posta adresi girin");
      return false;
    }

    if (password.length < 6) {
      toaster.error("Şifre en az 6 karakter olmalıdır");
      return false;
    }

    // KVKK acceptance validation
    if (!kvkkAccepted) {
      toaster.error(
        "KVKK Aydınlatma Metni'ni okuyup onaylamanız gerekmektedir"
      );
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      // First create the auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName.trim(),
            last_name: lastName.trim(),
          },
        },
      });

      if (authError) throw authError;

      if (authData.user) {
        // Auto sign in after signup
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (signInError) {
          console.error("Auto sign-in error:", signInError);
        }

        // Wait for session to be established
        let attempts = 0;
        while (!supabase.auth.getUser() && attempts < 5) {
          await new Promise((resolve) => setTimeout(resolve, 500));
          attempts++;
        }

        // Create the user profile
        const userData = {
          id: authData.user.id,
          first_name: firstName.trim(),
          last_name: lastName.trim(),
          profession,
          university: profession === "Öğrenci" ? university.trim() : null,
          department: profession === "Öğrenci" ? department.trim() : null,
          class: profession === "Öğrenci" ? classValue : null,
          email: email.trim(),
          phone: phone.trim() || null,
          desired_education_id:
            selectedEducationId === "none" ? null : selectedEducationId || null,
        };

        // Use API route to create profile (bypasses RLS)
        const response = await fetch("/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });

        const result = await response.json();

        if (!response.ok) {
          console.error("Profile creation error:", result);
          throw new Error(result.error || "Failed to create user profile");
        }

        toaster.success("Kayıt başarılı! Ana sayfaya yönlendiriliyorsunuz...");
        onClose(); // Modal'ı kapat
        router.replace("/");
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Kayıt başarısız";
      toaster.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    onClose();
    // Form'u temizle
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setFirstName("");
    setLastName("");
    setPhone("");
    setProfession("");
    setUniversity("");
    setDepartment("");
    setClassValue("");
    setSelectedEducationId("");
    setKvkkAccepted(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            🎓 Ücretsiz Kayıt Olun
          </DialogTitle>
          <p className="text-center text-gray-600 mt-2">
            Beslenme uzmanlığı yolculuğunuza başlayın
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          {/* Account Information */}
          <div className="space-y-4">
            <h3 className="text-md font-semibold text-gray-900">
              Hesap Bilgileri
            </h3>
            <AccountInfoForm
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              confirmPassword={confirmPassword}
              setConfirmPassword={setConfirmPassword}
              kvkkAccepted={kvkkAccepted}
              setKvkkAccepted={setKvkkAccepted}
            />
          </div>

          <Separator />

          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-md font-semibold text-gray-900">
              Kişisel Bilgiler
            </h3>
            <PersonalInfoForm
              firstName={firstName}
              setFirstName={setFirstName}
              lastName={lastName}
              setLastName={setLastName}
              phone={phone}
              setPhone={setPhone}
              profession={profession}
              setProfession={setProfession}
              university={university}
              setUniversity={setUniversity}
              department={department}
              setDepartment={setDepartment}
              class={classValue}
              setClass={setClassValue}
            />
          </div>

          <Separator />

          {/* Education Selection */}
          <div className="space-y-4">
            <h3 className="text-md font-semibold text-gray-900">
              Eğitim Tercihi
            </h3>
            <EducationSelection
              selectedEducationId={selectedEducationId}
              setSelectedEducationId={setSelectedEducationId}
            />
          </div>

          <Separator />

          {/* Submit Button */}
          <div className="flex gap-4">
            <Button
              type="submit"
              className="flex-1 bg-green-600 hover:bg-green-700"
              disabled={loading}
            >
              {loading ? "Kayıt oluşturuluyor..." : "Ücretsiz Kayıt Ol"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={loading}
            >
              İptal
            </Button>
          </div>

          <div className="text-center text-sm text-gray-500">
            Zaten hesabınız var mı?{" "}
            <Button
              type="button"
              variant="link"
              className="text-green-600 hover:text-green-700 p-0 h-auto"
              onClick={() => {
                handleClose();
                router.push("/auth/login");
              }}
            >
              Giriş yapın
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
