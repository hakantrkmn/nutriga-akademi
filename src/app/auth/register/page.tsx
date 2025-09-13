"use client";

import { AccountInfoForm } from "@/components/auth/AccountInfoForm";
import { EducationSelection } from "@/components/auth/EducationSelection";
import { PersonalInfoForm } from "@/components/auth/PersonalInfoForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toaster } from "@/components/ui/toaster";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
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
    // Check password confirmation
    if (password !== confirmPassword) {
      toaster.error("Şifreler eşleşmiyor");
      return false;
    }

    // Check required fields
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

    // If profession is "öğrenci", university, department, and class are required
    if (profession === "Öğrenci") {
      if (!university.trim() || !department.trim() || !classValue) {
        toaster.error(
          "Öğrenciler için üniversite, bölüm ve sınıf bilgileri zorunludur"
        );
        return false;
      }
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toaster.error("Geçerli bir e-posta adresi girin");
      return false;
    }

    // Password validation
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
        // Create the user profile using API route (admin client)
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

        console.log("Profile created successfully:", result);
      }

      toaster.success("Kayıt başarılı! Ana sayfaya yönlendiriliyorsunuz...");
      router.replace("/");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Kayıt başarısız";
      toaster.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 md:px-0 py-10 md:py-16">
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Kayıt Ol</h1>
          <p className="text-gray-600">Yeni hesabını oluştur</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Kayıt Formu</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
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
              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700"
                disabled={loading}
              >
                {loading ? "Kayıt oluşturuluyor..." : "Kayıt Ol"}
              </Button>

              <p className="text-gray-600 text-sm text-center">
                Zaten hesabın var mı?{" "}
                <Button
                  type="button"
                  variant="link"
                  className="text-green-600 hover:text-green-700 p-0 h-auto"
                  onClick={() => router.push("/auth/login")}
                >
                  Giriş yap
                </Button>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
