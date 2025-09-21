"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toaster } from "@/components/ui/toaster";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  notificationPermission?: boolean;
}

export default function ContactForm() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);

  // Fetch user data when user is logged in
  useEffect(() => {
    const fetchUserData = async () => {
      if (user?.email) {
        try {
          const response = await fetch(`/api/user/profile?email=${user.email}`);
          if (response.ok) {
            const data = await response.json();
            setUserData(data);
            // Auto-fill form with user data
            setFormData({
              name: `${data.firstName} ${data.lastName}`,
              email: data.email,
              phone: data.phone || "",
              message: "",
            });
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Send message to API
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          userId: user?.id || null,
        }),
      });

      if (!response.ok) {
        throw new Error("Mesaj gönderilemedi");
      }

      // Reset form - keep user data if logged in
      if (user && userData) {
        setFormData({
          name: `${userData.firstName} ${userData.lastName}`,
          email: userData.email,
          phone: userData.phone || "",
          message: "",
        });
      } else {
        setFormData({ name: "", email: "", phone: "", message: "" });
      }

      toaster.success("Mesajınız başarıyla gönderildi!");
    } catch (error) {
      console.error("Form submission error:", error);
      toaster.error(
        "Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-background p-8 rounded-xl shadow-lg max-w-2xl w-full">
      <div className="flex flex-col gap-6">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Bize Soru Sorun
          </h2>
          <p className="text-secondary text-sm">
            Sorularınız için bize mesaj gönderin, size en kısa sürede dönüş
            yapalım.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-5">
            {/* Name Input */}
            <div className="w-full">
              <label className="block text-sm font-medium text-foreground mb-2">
                İsim Soyisim *
              </label>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Adınızı ve soyadınızı girin"
                required
              />
            </div>

            {/* Email Input */}
            <div className="w-full">
              <label className="block text-sm font-medium text-foreground mb-2">
                E-posta Adresi *
              </label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="email@example.com"
                required
              />
            </div>

            {/* Phone Input */}
            <div className="w-full">
              <label className="block text-sm font-medium text-foreground mb-2">
                Telefon Numarası *
              </label>
              <Input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="0555 555 55 55"
                required
              />
            </div>

            {/* Message Textarea */}
            <div className="w-full">
              <label className="block text-sm font-medium text-foreground mb-2">
                Mesajınız *
              </label>
              <Textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Mesajınızı buraya yazın..."
                className="min-h-[120px] resize-y"
                required
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="bg-primary hover:bg-primary-hover text-white w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Gönderiliyor..." : "Mesaj Gönder"}
            </Button>
          </div>
        </form>

        <div className="pt-4 border-t border-border-color text-center">
          <p className="text-sm text-muted">* işaretli alanlar zorunludur</p>
        </div>
      </div>
    </div>
  );
}
