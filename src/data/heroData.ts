export interface HeroData {
  title: {
    main: string;
    highlight: string;
  };
  description: string;
  image: {
    src: string;
    alt: string;
  };
}

// Hero slider için tüm hero data'ları
export const heroSlides: HeroData[] = [
  {
    title: {
      main: "Sağlıklı Yaşam İçin",
      highlight: "Doğru Beslenme",
    },
    description:
      "Uzman diyetisyenlerimizden öğrenin, sağlıklı beslenme alışkanlıkları edinin ve yaşam kalitenizi artırın.",

    image: {
      src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      alt: "Sağlıklı beslenme",
    },
  },
  {
    title: {
      main: "Beslenme Uzmanlığında",
      highlight: "Yeni Nesil Eğitim",
    },
    description:
      "Modern beslenme bilimi ve teknolojisi ile donatılmış eğitimlerimizle mesleki gelişiminizi hızlandırın.",

    image: {
      src: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      alt: "Beslenme uzmanlığı eğitimi",
    },
  },
  {
    title: {
      main: "Kişiselleştirilmiş",
      highlight: "Beslenme Planları",
    },
    description:
      "Her bireyin ihtiyaçlarına özel beslenme planları ile sağlıklı yaşam hedeflerinize ulaşın.",

    image: {
      src: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      alt: "Kişiselleştirilmiş beslenme planları",
    },
  },
];

// Geriye uyumluluk için eski heroData
export const heroData: HeroData = heroSlides[0];
