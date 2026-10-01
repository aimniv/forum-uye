// Tek noktadan marka ve iletişim ayarları. Yayına almadan önce hepsini kendi bilgilerinle değiştir.
export const SITE = {
  name: 'Marka',
  nameAccent: 'Lisans',
  tagline: 'Ucuz Lisans Satın Al',
  description:
    'En uygun fiyatlı Windows, Görsel tasarım, Yapay zeka lisansları burada! Güvenli ödeme ve anında teslimat ile dijital ürünlere hemen sahip olun.',
  contact: {
    address: 'Adres bilgisi buraya gelecek',
    phone: '+90 000 000 0000',
    phoneHours: 'Hafta içi 09:00 - 18:00',
    whatsapp: 'Mesaj Gönder',
    whatsappNote: 'Ortalama yanıt süresi: 15 dk',
    email: 'info@ornek.com',
    mapQuery: '',
  },
  social: { linkedin: '#', youtube: '#' },
} as const;

export const CATEGORIES = [
  { slug: 'yapay-zeka', label: 'Yapay Zeka' },
  { slug: 'tasarim-araclari', label: 'Tasarım Araçları' },
  { slug: 'genel', label: 'Genel' },
  { slug: 'microsoft', label: 'Microsoft' },
  { slug: 'windows', label: 'Windows' },
] as const;

export type CategorySlug = (typeof CATEGORIES)[number]['slug'];

export const CORPORATE_PAGES = [
  { slug: 'gizlilik-politikasi', label: 'Gizlilik Politikası' },
  { slug: 'kullanim-sartlari', label: 'Kullanım Şartları' },
  { slug: 'iade-kosullari', label: 'İade Koşulları' },
  { slug: 'sss', label: 'S.S.S.' },
] as const;

// Demo kuponlar: kod -> indirim oranı. Gerçek kuponları sunucu tarafında yönet.
export const COUPONS: Record<string, number> = { HOSGELDIN: 0.1 };

export const formatPrice = (n: number) => `${n.toFixed(2)} TL`;
