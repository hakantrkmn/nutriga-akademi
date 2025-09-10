"use client";

import {
  COMPANY_ADDRESS,
  COMPANY_EMAIL,
  COMPANY_FACEBOOK_URL,
  COMPANY_INSTAGRAM_URL,
  COMPANY_LINKEDIN_URL,
  COMPANY_PHONE,
  COMPANY_TWITTER_URL,
  COMPANY_WORK_HOURS,
  COMPANY_WORK_HOURS_WEEKEND,
  COMPANY_YOUTUBE_URL,
} from "@/constants";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
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
  return (
    <div className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
        <Icon className="w-6 h-6 text-primary-600" />
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{content}</p>
        {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
      </div>
    </div>
  );
}

export default function ContactInfo() {
  const socialLinks = [
    {
      name: "Facebook",
      url: COMPANY_FACEBOOK_URL,
      icon: FaFacebook,
      color: "#1877F2",
    },
    {
      name: "Twitter",
      url: COMPANY_TWITTER_URL,
      icon: FaTwitter,
      color: "#1DA1F2",
    },
    {
      name: "Instagram",
      url: COMPANY_INSTAGRAM_URL,
      icon: FaInstagram,
      color: "#E4405F",
    },
    {
      name: "LinkedIn",
      url: COMPANY_LINKEDIN_URL,
      icon: FaLinkedin,
      color: "#0A66C2",
    },
    {
      name: "YouTube",
      url: COMPANY_YOUTUBE_URL,
      icon: FaYoutube,
      color: "#FF0000",
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          subtitle={COMPANY_WORK_HOURS_WEEKEND}
        />
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
          Sosyal Medyada Takip Edin
        </h3>
        <div className="flex justify-center gap-4">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
              aria-label={`${social.name} sayfamızı ziyaret edin`}
            >
              <social.icon className="w-6 h-6 text-gray-600" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
