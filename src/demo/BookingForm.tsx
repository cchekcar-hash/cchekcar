import { useState, type FormEvent } from 'react';
import { services, ui } from './content';
import { useLang, track } from './useLang';

export default function BookingForm({ defaultService = '' }: { defaultService?: string }) {
  const { t } = useLang();
  const [form, setForm] = useState({ name: '', phone: '', car: '', service: defaultService });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const phoneOk = /^\+?\d{10,13}$/.test(form.phone);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!phoneOk) return;
    setStatus('sending');
    try {
      const token = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
      const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;
      if (!token || !chatId) throw new Error('Telegram is not configured');
      const text = [
        'Нова заявка з сайту:',
        `👤 ${form.name || '—'}`,
        `📱 ${form.phone}`,
        `🚗 ${form.car || '—'}`,
        `⚙️ ${form.service || '—'}`,
        `🔗 ${window.location.pathname}`,
      ].join('\n');
      const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text }),
      });
      if (!res.ok) throw new Error(`Telegram ${res.status}`);
      track('booking_form_submit', { service: form.service, page: window.location.pathname });
      setStatus('sent');
      setForm({ name: '', phone: '', car: '', service: defaultService });
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  const input =
    'w-full rounded-xl border border-fg/10 bg-ink-900 px-4 py-3 text-base text-fg placeholder:text-ink-400 outline-none focus:border-fire focus:ring-2 focus:ring-fire/30';

  return (
    <form onSubmit={submit} className='space-y-3'>
      <input
        className={input}
        placeholder={t(ui.name)}
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        autoComplete='name'
      />
      <input
        className={input}
        placeholder={`${t(ui.phone)} *`}
        type='tel'
        inputMode='tel'
        required
        value={form.phone}
        onChange={(e) =>
          setForm({ ...form, phone: e.target.value.replace(/(?!^\+)[^\d]/g, '').slice(0, 13) })
        }
        autoComplete='tel'
      />
      {form.phone.length > 0 && !phoneOk && (
        <p className='-mt-1 text-sm text-ink-400'>{t(ui.phoneHint)}</p>
      )}
      <input
        className={input}
        placeholder={t(ui.car)}
        value={form.car}
        onChange={(e) => setForm({ ...form, car: e.target.value })}
      />
      <select
        className={input}
        value={form.service}
        onChange={(e) => setForm({ ...form, service: e.target.value })}>
        <option value=''>{t(ui.service)}</option>
        {services.map((s) => (
          <option key={s.slug} value={t(s.name)}>
            {t(s.name)}
          </option>
        ))}
        <option value={t(ui.other)}>{t(ui.other)}</option>
      </select>
      <button
        type='submit'
        disabled={status === 'sending' || !phoneOk}
        className='w-full rounded-xl bg-fg py-4 text-lg font-bold text-ink-900 transition hover:opacity-90 disabled:opacity-60'>
        {status === 'sending' ? t(ui.sending) : t(ui.send)}
      </button>
      {status === 'sent' && <p className='font-semibold text-emerald-400'>{t(ui.sent)}</p>}
      {status === 'error' && <p className='font-semibold text-red-400'>{t(ui.sendError)}</p>}
    </form>
  );
}
