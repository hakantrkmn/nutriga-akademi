import {
  COMPANY_ADDRESS,
  COMPANY_EMAIL,
  COMPANY_FACEBOOK_URL,
  COMPANY_INSTAGRAM_URL,
  COMPANY_LINKEDIN_URL,
  COMPANY_NAME,
  COMPANY_PHONE,
  COMPANY_TWITTER_URL,
  COMPANY_WORK_HOURS,
  COMPANY_YOUTUBE_URL,
} from "@/constants";
// Chakra UI imports removed - using Tailwind CSS
import Link from "next/link";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

const quickLinks = [
  { name: "Ana Sayfa", href: "/" },
  { name: "Hakkımızda", href: "/hakkimizda" },
  { name: "Misyonumuz", href: "/misyon" },
  { name: "Vizyonumuz", href: "/vizyon" },
  { name: "Eğitimler", href: "/egitimler" },
  { name: "Blog", href: "/blog" },
  { name: "İletişim", href: "/iletisim" },
];

const socialLinks = [
  {
    name: "Facebook",
    href: COMPANY_FACEBOOK_URL,
    icon: FaFacebook,
    color: "#1877F2",
  },
  {
    name: "Twitter",
    href: COMPANY_TWITTER_URL,
    icon: FaTwitter,
    color: "#1DA1F2",
  },
  {
    name: "Instagram",
    href: COMPANY_INSTAGRAM_URL,
    icon: FaInstagram,
    color: "#E4405F",
  },
  {
    name: "LinkedIn",
    href: COMPANY_LINKEDIN_URL,
    icon: FaLinkedin,
    color: "#0A66C2",
  },
  {
    name: "YouTube",
    href: COMPANY_YOUTUBE_URL,
    icon: FaYoutube,
    color: "#FF0000",
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo ve Açıklama */}
          <div className="space-y-4">
            <Link href="/">
              <h2 className="text-2xl font-bold text-green-400 hover:text-green-500 cursor-pointer transition-colors">
                {COMPANY_NAME}
              </h2>
            </Link>

            <p className="text-sm text-gray-300 leading-relaxed max-w-[280px]">
              Beslenme alanında en güncel ve kaliteli eğitimlerle
              diyetisyenlerin mesleki gelişimine katkı sağlayan öncü akademi.
            </p>
          </div>

          {/* Hızlı Linkler */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Hızlı Linkler</h4>

            <div className="space-y-2">
              {quickLinks.map((link, index) => (
                <Link key={index} href={link.href}>
                  <span className="text-sm text-gray-300 hover:text-green-400 hover:underline cursor-pointer transition-all">
                    {link.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* İletişim Bilgileri */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">İletişim</h4>

            <div className="space-y-3 text-sm text-gray-300">
              <div>
                <span className="font-semibold text-white">Adres:</span>
                <br />
                {COMPANY_ADDRESS}
              </div>

              <div>
                <span className="font-semibold text-white">Telefon:</span>
                <br />
                {COMPANY_PHONE}
              </div>

              <div>
                <span className="font-semibold text-white">E-posta:</span>
                <br />
                {COMPANY_EMAIL}
              </div>

              <div>
                <span className="font-semibold text-white">
                  Çalışma Saatleri:
                </span>
                <br />
                {COMPANY_WORK_HOURS}
              </div>
            </div>
          </div>

          {/* Sosyal Medya */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Takip Edin</h4>

            <p className="text-sm text-gray-300 leading-relaxed">
              Güncel içerikler ve eğitim duyuruları için bizi takip edin!
            </p>

            <div className="flex gap-3 flex-wrap">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${social.name} sayfamızı ziyaret edin`}
                >
                  <div className="w-10 h-10 bg-gray-700 rounded-xl flex items-center justify-center text-gray-300 hover:bg-gray-600 hover:text-white hover:-translate-y-0.5 hover:shadow-md transition-all">
                    <social.icon className="w-5 h-5" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Alt Çizgi ve Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-600">
          <div className="space-y-4 text-center">
            <div className="flex justify-center gap-6 flex-wrap text-sm text-gray-400">
              <Link href="/gizlilik-politikasi">
                <span className="hover:text-green-400 cursor-pointer transition-colors">
                  Gizlilik Politikası
                </span>
              </Link>
              <Link href="/kullanim-kosullari">
                <span className="hover:text-green-400 cursor-pointer transition-colors">
                  Kullanım Koşulları
                </span>
              </Link>
              <Link href="/cerez-politikasi">
                <span className="hover:text-green-400 cursor-pointer transition-colors">
                  Çerez Politikası
                </span>
              </Link>
            </div>

            <p className="text-sm text-gray-400">
              © {currentYear} NutriHome Akademi. Tüm hakları saklıdır.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
