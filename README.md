# Dijital lisans mağazası (Next.js)

Kategori listeleme, ürün detayı, sepet (kupon destekli), ödeme ve iletişim sayfalarından oluşan e-ticaret arayüzü.

## Çalıştırma

```
npm install
npm run dev
```

## Özelleştirme

- `lib/site.ts`: marka adı, açıklama, iletişim bilgileri, kategoriler, demo kuponlar (`HOSGELDIN` = %10).
- `lib/products.ts`: ürün kataloğu. Mevcut ürünler örnektir; ad, fiyat ve görselleri kendi ürünlerinle değiştir.
- `components/ProductArt.tsx`: ürün görseli yer tutucusu. Gerçek görsel eklemek için bu bileşeni `next/image` ile değiştir.
- `app/kurumsal/[slug]`: gizlilik, kullanım şartları, iade koşulları ve S.S.S. metinleri boş; kendi işletmene göre yaz.

## Yapılması gerekenler (yayından önce)

- **Kart ödemesi:** Kart bilgisi bu sitede alınmaz. `app/api/checkout/route.ts` içindeki TODO'ya ödeme sağlayıcısının (iyzico, PayTR, Stripe vb.) oturum oluşturma çağrısını ekle ve `PAYMENT_PROVIDER_CHECKOUT_URL` ayarla.
- **Sipariş kaydı ve teslimat:** Siparişler şu an saklanmıyor ve e-posta gönderilmiyor.
- **İletişim formu:** `app/api/contact/route.ts` mesajı yalnızca doğruluyor; e-posta/veritabanı bağlantısı eklenmeli.
- **Üyelik:** `/hesabim` yer tutucudur.
