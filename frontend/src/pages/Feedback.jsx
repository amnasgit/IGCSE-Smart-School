import { useState } from 'react';
import PageHeader from '../components/PageHeader.jsx';
import api from '../api/api.js';

export default function Feedback() {
  const [form, setForm] = useState({ name: '', email: '', rating: '', message: '' });
  const [status, setStatus] = useState('idle');

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await api.post('/feedback', { ...form, rating: form.rating ? Number(form.rating) : undefined });
      setStatus('success');
      setForm({ name: '', email: '', rating: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <>
      <PageHeader eyebrow="Support / Feedback" title="Feedback &amp; Suggestions" subtitle="Tell us how we're doing — your feedback helps us improve." />
      <section className="section">
        <div className="container-page max-w-xl">
          {status === 'success' ? (
            <div className="card border-teal-400 bg-teal-50">
              <h2 className="text-lg font-semibold text-teal-600">Thank you for your feedback!</h2>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="card space-y-4">
              <div>
                <label className="label">Name (optional)</label>
                <input className="input" value={form.name} onChange={update('name')} />
              </div>
              <div>
                <label className="label">Email (optional)</label>
                <input type="email" className="input" value={form.email} onChange={update('email')} />
              </div>
              <div>
                <label className="label">Rating (optional)</label>
                <select className="input" value={form.rating} onChange={update('rating')}>
                  <option value="">Select a rating</option>
                  {[5, 4, 3, 2, 1].map((r) => <option key={r} value={r}>{r} / 5</option>)}
                </select>
              </div>
              <div>
                <label className="label">Message *</label>
                <textarea required rows={5} className="input" value={form.message} onChange={update('message')} />
              </div>
              <button type="submit" className="btn-primary w-full" disabled={status === 'loading'}>
                {status === 'loading' ? 'Sending…' : 'Send Feedback'}
              </button>
              {status === 'error' && <p className="text-sm text-red-600">Something went wrong. Please try again.</p>}
            </form>
          )}
        </div>
      </section>
    </>
  );
}
