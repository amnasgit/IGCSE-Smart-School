import { useState } from 'react';
import api from '../api/api.js';

export default function Newsletter({ variant = 'section' }) {
  const [contact, setContact] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!contact.trim()) return;
    setStatus('loading');
    try {
      const channel = contact.includes('@') ? 'email' : 'whatsapp';
      await api.post('/subscribers', { contact: contact.trim(), channel, source: 'newsletter' });
      setStatus('success');
      setContact('');
    } catch {
      setStatus('error');
    }
  };

  const isFooter = variant === 'footer';

  return (
    <div className={isFooter ? 'flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between' : ''}>
      <div>
        <p className={isFooter ? 'font-display text-lg font-semibold text-white' : 'font-display text-xl font-semibold text-navy'}>
          Stay Connected
        </p>
        <p className={isFooter ? 'text-sm text-navy-100/80' : 'text-sm text-navy-700/80'}>
          Get updates about programs and admissions.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="mt-3 flex w-full max-w-md gap-2 sm:mt-0">
        <input
          type="text"
          required
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          placeholder="Email or WhatsApp number"
          className="input flex-1 !bg-white"
        />
        <button type="submit" className="btn-primary !px-5 whitespace-nowrap" disabled={status === 'loading'}>
          {status === 'loading' ? 'Joining…' : 'Subscribe'}
        </button>
      </form>
      {status === 'success' && <p className="mt-2 text-sm text-teal-400">You're subscribed — welcome aboard!</p>}
      {status === 'error' && <p className="mt-2 text-sm text-red-400">Something went wrong. Please try again.</p>}
    </div>
  );
}
