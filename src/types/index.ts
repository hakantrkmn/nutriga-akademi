export interface BlogPost {
    id: string;
    title: string;
    content: string | object; // HTML string veya JSONB format (TipTap JSON)
    image_url: string;
    slug: string;
    category: string;
    excerpt: string;
    author: string;
    created_at: string;
    updated_at: string;
  }

  export interface BlogGridProps {
    posts: BlogPost[];
  }

  export interface CategoryFilterProps {
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
  }
  export interface BlogDetailContentProps {
    post: BlogPost;
  }
  export interface BlogCardProps {
    post: BlogPost;
  }


  export interface Egitim {
    id: string;
    title: string;
    description: string;
    content: string | object; // HTML string veya JSONB format (TipTap JSON)
    image_url: string;
    slug: string;
    price: number;
    sales_count: number;
    created_at: string;
    updated_at: string;
    // Ekstra alanlar (UI için gerekli)
    duration?: string;
    level?: string;
    instructor?: string;
    category?: string;
  }
  export interface EgitimCardProps {
    egitim: Egitim;
  }
  export interface EgitimDetailPageProps {
    params: Promise<{
      slug: string;
    }>;
  }

  export interface EgitimDetailContentProps {
    egitim: Egitim;
  }

  export interface EgitimDetailHeroProps {
    egitim: Egitim;
    isImageError: boolean;
    setIsImageError: (isImageError: boolean) => void;
  }

  export interface EgitimContentProps {
    egitim: Egitim;
  }
  export interface EgitimPriceProps {
    egitim: Egitim;
  }
  export interface EgitimCTAProps {
    egitim: Egitim;
  }