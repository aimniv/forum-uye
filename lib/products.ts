import type { CategorySlug } from './site';

export interface ProductArt {
  from: string;
  to: string;
  label: string;
  title: string;
  subtitle: string;
  tag: string;
}

export interface Product {
  slug: string;
  name: string;
  category: CategorySlug;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  inStock: boolean;
  art: ProductArt;
  description: string;
  features: string[];
}

const common = [
  'Ödeme sonrası anında teslimat',
  'Adım adım aktivasyon rehberi',
  'Satış sonrası destek',
];

// Örnek katalog. Ürün adı, fiyat ve görselleri kendi ürünlerinle değiştir.
export const PRODUCTS: Product[] = [
  {
    slug: 'windows-10-home',
    name: 'Windows 10 Home | Süresiz | Orijinal Lisans Anahtarı',
    category: 'windows',
    price: 149,
    rating: 5,
    reviews: 3,
    inStock: true,
    art: { from: '#1d6fd1', to: '#0a4fa8', label: 'Windows', title: 'Windows 10 Home', subtitle: 'Dijital Anahtar', tag: 'Sınırsız' },
    description: 'Windows 10 Home için süresiz dijital lisans anahtarı.',
    features: common,
  },
  {
    slug: 'windows-11-home',
    name: 'Windows 11 Home | Süresiz | Orijinal Lisans Anahtarı',
    category: 'windows',
    price: 149,
    rating: 4.5,
    reviews: 5,
    inStock: false,
    art: { from: '#1d6fd1', to: '#0a4fa8', label: 'Windows', title: 'Windows 11 Home', subtitle: 'Dijital Anahtar', tag: 'Sınırsız' },
    description: 'Windows 11 Home için süresiz dijital lisans anahtarı.',
    features: common,
  },
  {
    slug: 'windows-10-pro',
    name: 'Windows 10 Pro | Süresiz | Orijinal Lisans Anahtarı',
    category: 'windows',
    price: 199,
    rating: 4.5,
    reviews: 4,
    inStock: true,
    art: { from: '#0d4b9e', to: '#06285c', label: 'Windows', title: 'Windows 10 PRO', subtitle: 'Dijital Anahtar', tag: 'Sınırsız' },
    description: 'Windows 10 Pro için süresiz dijital lisans anahtarı.',
    features: common,
  },
  {
    slug: 'windows-11-pro',
    name: 'Windows 11 Pro | Süresiz | Orijinal Lisans Anahtarı',
    category: 'windows',
    price: 199,
    rating: 4.5,
    reviews: 7,
    inStock: true,
    art: { from: '#0d4b9e', to: '#06285c', label: 'Windows', title: 'Windows 11 PRO', subtitle: 'Dijital Anahtar', tag: 'Sınırsız' },
    description: 'Windows 11 Pro için süresiz dijital lisans anahtarı.',
    features: common,
  },
  {
    slug: 'office-365-12-aylik',
    name: 'Microsoft Office 365 | 12 Aylık | Kişisel E-Posta | Windows & Mac',
    category: 'microsoft',
    price: 249,
    oldPrice: 300,
    rating: 5,
    reviews: 4,
    inStock: true,
    art: { from: '#4b3b9a', to: '#7a4fc4', label: 'Office 365', title: 'Office 365', subtitle: 'İsme Özel', tag: '12 AY' },
    description: 'Kişisel e-posta adresinize tanımlanan 12 aylık Office 365 aboneliği.',
    features: common,
  },
  {
    slug: 'office-2024',
    name: 'Microsoft Office 2024 | Sınırsız | Tüm Uygulamalara Erişim',
    category: 'microsoft',
    price: 299,
    rating: 0,
    reviews: 0,
    inStock: true,
    art: { from: '#d4410f', to: '#7d1507', label: 'Office', title: 'Office 2024', subtitle: 'Lisans Anahtarı', tag: 'Sınırsız' },
    description: 'Office 2024 için süresiz lisans anahtarı.',
    features: common,
  },
  {
    slug: 'office-2021',
    name: 'Microsoft Office 2021 | Sınırsız | Tüm Uygulamalara Erişim',
    category: 'microsoft',
    price: 99,
    rating: 5,
    reviews: 2,
    inStock: true,
    art: { from: '#d4410f', to: '#7d1507', label: 'Office', title: 'Office 2021', subtitle: 'Lisans Anahtarı', tag: 'Sınırsız' },
    description: 'Office 2021 için süresiz lisans anahtarı.',
    features: common,
  },
  {
    slug: 'office-2019',
    name: 'Microsoft Office 2019 | Sınırsız | Tüm Uygulamalara Erişim',
    category: 'microsoft',
    price: 75,
    rating: 0,
    reviews: 0,
    inStock: true,
    art: { from: '#d4410f', to: '#7d1507', label: 'Office', title: 'Office 2019', subtitle: 'Lisans Anahtarı', tag: 'Sınırsız' },
    description: 'Office 2019 için süresiz lisans anahtarı.',
    features: common,
  },
  {
    slug: 'office-2016',
    name: 'Microsoft Office 2016 | Sınırsız | Tüm Uygulamalara Erişim',
    category: 'microsoft',
    price: 65,
    rating: 0,
    reviews: 0,
    inStock: true,
    art: { from: '#d4410f', to: '#7d1507', label: 'Office', title: 'Office 2016', subtitle: 'Lisans Anahtarı', tag: 'Sınırsız' },
    description: 'Office 2016 için süresiz lisans anahtarı.',
    features: common,
  },
  {
    slug: 'chatgpt-plus',
    name: 'ChatGPT Plus | Kişisel Hesabınıza | 1 Aylık',
    category: 'yapay-zeka',
    price: 399,
    rating: 0,
    reviews: 0,
    inStock: true,
    art: { from: '#0f7a5f', to: '#064536', label: 'Yapay Zeka', title: 'ChatGPT Plus', subtitle: 'Kişisel Hesap', tag: '1 AY' },
    description: 'Kendi hesabınıza tanımlanan aylık abonelik. (Örnek ürün, fiyatı kendin belirle.)',
    features: common,
  },
  {
    slug: 'google-ai-pro-18-ay',
    name: 'Google AI Pro | Kişisel Hesabınıza | 18 Aylık',
    category: 'yapay-zeka',
    price: 599,
    rating: 0,
    reviews: 0,
    inStock: true,
    art: { from: '#3b6fe0', to: '#1c2f8f', label: 'Yapay Zeka', title: 'Google AI Pro', subtitle: 'Kişisel Hesap', tag: '18 AY' },
    description: 'Kendi hesabınıza tanımlanan 18 aylık abonelik. (Örnek ürün, fiyatı kendin belirle.)',
    features: common,
  },
  {
    slug: 'adobe-creative-cloud-pro',
    name: 'Adobe Creative Cloud PRO | Tüm Uygulamalar | Kişisel Hesabınıza',
    category: 'tasarim-araclari',
    price: 499,
    rating: 0,
    reviews: 0,
    inStock: true,
    art: { from: '#c8102e', to: '#5e0614', label: 'Tasarım', title: 'Creative Cloud PRO', subtitle: 'Tüm Uygulamalar', tag: 'Abonelik' },
    description: 'Tüm tasarım uygulamalarına erişim. (Örnek ürün, fiyatı kendin belirle.)',
    features: common,
  },
  {
    slug: 'spotify-premium-4-aylik',
    name: 'Spotify Premium | Kişisel Hesabınıza | 4 Aylık',
    category: 'genel',
    price: 120,
    rating: 0,
    reviews: 0,
    inStock: true,
    art: { from: '#1a8f4a', to: '#0a3d20', label: 'Genel', title: 'Spotify Premium', subtitle: 'Kişisel Hesap', tag: '4 AY' },
    description: 'Kendi hesabınıza tanımlanan 4 aylık abonelik. (Örnek ürün, fiyatı kendin belirle.)',
    features: common,
  },
];

export const getProduct = (slug: string) => PRODUCTS.find((p) => p.slug === slug);
export const byCategory = (c: string) => PRODUCTS.filter((p) => p.category === c);
