"use client";

import {
  COMPANY_ADDRESS,
  COMPANY_EMAIL,
  COMPANY_INSTAGRAM_URL,
  COMPANY_PHONE,
  COMPANY_WORK_HOURS,
} from "@/constants";
import { FaInstagram } from "react-icons/fa";
import { HiClock, HiLocationMarker, HiMail, HiPhone } from "react-icons/hi";

interface ContactItemProps {
  icon: React.ElementType;
  title: string;
  content: string;
  subtitle?: string;
}

function ContactItem({
  icon: Icon,
  title,
  content,
  subtitle,
}: ContactItemProps) {
  // E-posta için özel stil kontrolü
  const isEmail = title === "E-posta";
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-all duration-200 hover:border-primary-200">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl flex items-center justify-center flex-shrink-0">
          <Icon className="w-6 h-6 text-primary-600" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
          <div className={`text-gray-700 leading-relaxed ${
            isEmail 
              ? "text-sm break-all" 
              : "break-words"
          }`}>
            {content}
          </div>
          {subtitle && (
            <p className="text-sm text-gray-500 mt-2 break-words">{subtitle}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ContactInfo() {
  const socialLinks = [
    {
      name: "Instagram",
      url: COMPANY_INSTAGRAM_URL,
      icon: FaInstagram,
      color: "#E4405F",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          İletişim Bilgileri
        </h2>
        <p className="text-gray-600">
          Size en uygun yöntemle bizimle iletişime geçin
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ContactItem
          icon={HiLocationMarker}
          title="Adres"
          content={COMPANY_ADDRESS}
        />
        <ContactItem icon={HiPhone} title="Telefon" content={COMPANY_PHONE} />
        <ContactItem icon={HiMail} title="E-posta" content={COMPANY_EMAIL} />
        <ContactItem
          icon={HiClock}
          title="Çalışma Saatleri"
          content={COMPANY_WORK_HOURS}
        />
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 md:col-span-2">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Sosyal Medyada Takip Edin
          </h3>
          <div className="flex justify-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center hover:scale-105 transition-all duration-200 shadow-md"
                aria-label={`${social.name} sayfamızı ziyaret edin`}
              >
                <social.icon className="w-6 h-6 text-white" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
