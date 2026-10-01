import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { SITE } from '@/lib/site';
import { ContactForm } from '@/components/ContactForm';

export const metadata = { title: 'İletişim' };

const c = SITE.contact;
const rows = [
  { icon: MapPin, t: 'Merkez Ofis', l: [c.address] },
  { icon: Phone, t: 'Telefon', l: [c.phone, c.phoneHours] },
  { icon: MessageCircle, t: 'WhatsApp Destek', l: [c.whatsapp, c.whatsappNote] },
  { icon: Mail, t: 'E-Posta', l: [c.email] },
];

export default function Contact() {
  return (
    <>
      <section className="bg-[#111] py-14 text-center text-white">
        <h1 className="text-3xl font-extrabold">Bize Ulaşın</h1>
        <p className="mt-2 text-[10px] text-neutral-400">Sorularınız mı var? Ekibimiz size yardımcı olmaktan mutluluk duyar.</p>
      </section>
      <div className="container-x grid gap-4 py-8 md:grid-cols-[1fr_1.7fr]">
        <div className="card p-6">
          <h2 className="mb-5 text-base font-bold">İletişim Bilgileri</h2>
          <ul className="space-y-5">
            {rows.map(({ icon: I, t, l }) => (
              <li key={t} className="flex gap-3">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-green-50 text-brand"><I className="h-3.5 w-3.5" /></span>
                <div className="text-[10px] text-neutral-600"><div className="text-xs font-bold text-ink">{t}</div>{l.map((x) => <div key={x}>{x}</div>)}</div>
              </li>
            ))}
          </ul>
        </div>
        <div className="card p-6"><h2 className="mb-4 text-base font-bold">Mesaj Gönder</h2><ContactForm /></div>
      </div>
      {c.mapQuery && (
        <div className="container-x pb-8">
          <iframe title="Harita" loading="lazy" className="h-52 w-full rounded-xl border-0 shadow" src={`https://www.google.com/maps?q=${encodeURIComponent(c.mapQuery)}&output=embed`} />
        </div>
      )}
    </>
  );
}
