'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';

export function ContactForm() {
  const [state, setState] = useState<'idle' | 'busy' | 'ok' | string>('idle');

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setState('busy');
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Object.fromEntries(new FormData(form))),
    }).catch(() => null);
    if (res?.ok) {
      form.reset();
      setState('ok');
    } else {
      setState((await res?.json().catch(() => null))?.error ?? 'Mesaj gönderilemedi.');
    }
  };

  return (
    <form onSubmit={submit} className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block"><span className="mb-1 block text-[10px] font-bold">Adınız Soyadınız</span><input name="name" required placeholder="Ad Soyad" className="field" /></label>
        <label className="block"><span className="mb-1 block text-[10px] font-bold">E-Posta Adresiniz</span><input name="email" type="email" required placeholder="ornek@email.com" className="field" /></label>
      </div>
      <label className="block"><span className="mb-1 block text-[10px] font-bold">Konu</span><input name="subject" required placeholder="Ne hakkında görüşmek istersiniz?" className="field" /></label>
      <label className="block"><span className="mb-1 block text-[10px] font-bold">Mesajınız</span><textarea name="message" required rows={5} placeholder="Mesajınızı buraya yazın..." className="field resize-y" /></label>
      {state !== 'idle' && state !== 'busy' && (
        <p role="status" className={`text-[11px] ${state === 'ok' ? 'text-green-700' : 'text-red-500'}`}>{state === 'ok' ? 'Mesajınız iletildi, teşekkürler.' : state}</p>
      )}
      <button disabled={state === 'busy'} className="btn-brand w-full !py-3">{state === 'busy' ? 'Gönderiliyor...' : 'Mesajı Gönder'} <Send className="h-3 w-3" /></button>
    </form>
  );
}
