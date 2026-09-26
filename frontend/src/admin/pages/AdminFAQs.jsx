import { useEffect, useState } from 'react';
import api from '../../api/api.js';
import DataTable from '../DataTable.jsx';

const categories = ['Admissions', 'Programs', 'Technical/Platform', 'Fees'];
const emptyForm = { question: '', answer: '', category: 'Admissions', order: 0, isPublished: true };

export default function AdminFAQs() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');

  const load = () => {
    setLoading(true);
    api.get('/faqs', { params: { all: true } }).then((res) => setFaqs(res.data.data)).finally(() => setLoading(false));
  };
  useEffect(load, []);

  const update = (field) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm((f) => ({ ...f, [field]: value }));
  };

  const startEdit = (faq) => {
    setEditingId(faq._id);
    setForm(faq);
  };

  const resetForm = () => {
    setEditingId(null);
    setForm(emptyForm);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const payload = { ...form, order: Number(form.order) || 0 };
      if (editingId) {
        await api.patch(`/faqs/${editingId}`, payload);
      } else {
        await api.post('/faqs', payload);
      }
      resetForm();
      load();
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  const remove = async (id) => {
    if (!confirm('Remove this FAQ?')) return;
    await api.delete(`/faqs/${id}`);
    load();
  };

  return (
    <div>
      <h1 className="mb-5 text-2xl font-semibold text-navy">FAQs</h1>

      <div className="grid gap-6 lg:grid-cols-3">
        <form onSubmit={handleSubmit} className="card h-fit space-y-3">
          <h3 className="font-semibold text-navy">{editingId ? 'Edit FAQ' : 'Add FAQ'}</h3>
          <div>
            <label className="label">Question</label>
            <input required className="input" value={form.question} onChange={update('question')} />
          </div>
          <div>
            <label className="label">Answer</label>
            <textarea required rows={4} className="input" value={form.answer} onChange={update('answer')} />
          </div>
          <div>
            <label className="label">Category</label>
            <select className="input" value={form.category} onChange={update('category')}>
              {categories.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="label">Order</label>
            <input type="number" className="input" value={form.order} onChange={update('order')} />
          </div>
          <label className="flex items-center gap-2 text-sm text-navy-700">
            <input type="checkbox" checked={form.isPublished} onChange={update('isPublished')} />
            Published
          </label>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <div className="flex gap-2">
            <button className="btn-primary flex-1 text-sm">{editingId ? 'Save Changes' : 'Add FAQ'}</button>
            {editingId && <button type="button" onClick={resetForm} className="btn-ghost border border-navy-100 text-sm">Cancel</button>}
          </div>
        </form>

        <div className="lg:col-span-2">
          <DataTable
            title="All FAQs"
            loading={loading}
            rows={faqs}
            columns={[
              { key: 'question', label: 'Question', render: (r) => <span className="block max-w-xs truncate">{r.question}</span> },
              { key: 'category', label: 'Category' },
              { key: 'isPublished', label: 'Published', render: (r) => (r.isPublished ? 'Yes' : 'No') },
              { key: 'order', label: 'Order' },
            ]}
            actions={(row) => (
              <div className="flex gap-2">
                <button className="btn-ghost border border-navy-100 !py-1.5 text-xs" onClick={() => startEdit(row)}>Edit</button>
                <button className="btn-ghost border border-red-100 !py-1.5 text-xs text-red-600" onClick={() => remove(row._id)}>Remove</button>
              </div>
            )}
          />
        </div>
      </div>
    </div>
  );
}
