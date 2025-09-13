"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toaster } from "@/components/ui/toaster";
import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulated form submission
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Reset form
      setFormData({ name: "", email: "", message: "" });

      toaster.success("Mesajınız başarıyla gönderildi!");
    } catch {
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
    <div className="bg-white p-8 rounded-xl shadow-lg max-w-2xl w-full">
      <div className="flex flex-col gap-6">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Bizimle İletişime Geçin
          </h2>
          <p className="text-gray-600 text-sm">
            Sorularınız için bize mesaj gönderin, size en kısa sürede dönüş
            yapalım.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-5">
            {/* Name Input */}
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-2">
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
              <label className="block text-sm font-medium text-gray-700 mb-2">
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

            {/* Message Textarea */}
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-2">
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
              className="bg-green-500 hover:bg-green-600 text-white w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Gönderiliyor..." : "Mesaj Gönder"}
            </Button>
          </div>
        </form>

        <div className="pt-4 border-t border-gray-100 text-center">
          <p className="text-sm text-gray-500">* işaretli alanlar zorunludur</p>
        </div>
      </div>
    </div>
  );
}
