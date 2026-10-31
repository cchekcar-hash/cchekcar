// Sends a booking request from the site form to the shop's Telegram chat.
// Runs on the server, so the bot token never reaches the visitor's browser.

const MAX = 200;

function clean(value) {
  return String(value ?? '').trim().slice(0, MAX);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN || process.env.VITE_TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID || process.env.VITE_TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    console.error('Telegram is not configured');
    return res.status(500).json({ ok: false });
  }

  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};
  const phone = clean(body.phone).replace(/(?!^\+)[^\d]/g, '');
  if (!/^\+?\d{10,13}$/.test(phone)) {
    return res.status(400).json({ ok: false });
  }

  const text = [
    'Нова заявка з сайту:',
    `👤 ${clean(body.name) || '—'}`,
    `📱 ${phone}`,
    `🚗 ${clean(body.car) || '—'}`,
    `⚙️ ${clean(body.service) || '—'}`,
    `🔗 ${clean(body.page) || '—'}`,
  ].join('\n');

  const tg = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text }),
  });
  if (!tg.ok) {
    console.error('Telegram error', tg.status, await tg.text());
    return res.status(502).json({ ok: false });
  }
  return res.status(200).json({ ok: true });
}
