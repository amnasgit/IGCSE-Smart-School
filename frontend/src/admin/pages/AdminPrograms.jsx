import { useEffect, useState } from 'react';
import api from '../../api/api.js';
import DataTable from '../DataTable.jsx';

const emptyForm = {
  title: '', slug: '', tagline: '', overview: '', subjectsCovered: '', duration: '',
  entryRequirements: '', feeReference: '', ctaLabel: 'Enroll Now', isLaunchingSoon: false,
  order: 0, isPublished: true, photo: '',
};

export default function AdminPrograms() {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');

  const load = () => {
    setLoading(true);
    api.get('/programs', { params: { all: true } }).then((res) => setPrograms(res.data.data)).finally(() => setLoading(false));
  };
  useEffect(load, []);

  const update = (field) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm((f) => ({ ...f, [field]: value }));
  };

  const startEdit = (program) => {
    setEditingId(program._id);
    setForm({
      ...program,
      subjectsCovered: (program.subjectsCovered || []).join(', '),
    });
  };

  const resetForm = () => {
    setEditingId(null);
    setForm(emptyForm);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const payload = {
      ...form,
      subjectsCovered: form.subjectsCovered.split(',').map((s) => s.trim()).filter(Boolean),
      order: Number(form.order) || 0,
    };
    try {
      if (editingId) {
        await api.patch(`/programs/${editingId}`, payload);
      } else {
        await api.post('/programs', payload);
      }
      resetForm();
      load();
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  const remove = async (id) => {
    if (!confirm('Remove this program?')) return;
    await api.delete(`/programs/${id}`);
    load();
  };

  return (
    <div>
      <h1 className="mb-5 text-2xl font-semibold text-navy">Programs</h1>

      <div className="grid gap-6 lg:grid-cols-3">
        <form onSubmit={handleSubmit} className="card h-fit space-y-3 lg:col-span-1">
          <h3 className="font-semibold text-navy">{editingId ? 'Edit Program' : 'Add Program'}</h3>
          <div>
            <label className="label">Title</label>
            <input required className="input" value={form.title} onChange={update('title')} />
          </div>
          <div>
            <label className="label">Slug (URL)</label>
            <input required className="input" value={form.slug} onChange={update('slug')} placeholder="e.g. pre-igcse" />
          </div>
          <div>
            <label className="label">Tagline</label>
            <input className="input" value={form.tagline} onChange={update('tagline')} />
          </div>
          <div>
            <label className="label">Overview</label>
            <textarea required rows={3} className="input" value={form.overview} onChange={update('overview')} />
          </div>
          <div>
            <label className="label">Subjects Covered (comma-separated)</label>
            <input className="input" value={form.subjectsCovered} onChange={update('subjectsCovered')} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">Duration</label>
              <input className="input" value={form.duration} onChange={update('duration')} />
            </div>
            <div>
              <label className="label">Order</label>
              <input type="number" className="input" value={form.order} onChange={update('order')} />
            </div>
          </div>
          <div>
            <label className="label">Entry Requirements</label>
            <input className="input" value={form.entryRequirements} onChange={update('entryRequirements')} />
          </div>
          <div>
            <label className="label">Fee Reference</label>
            <input className="input" value={form.feeReference} onChange={update('feeReference')} placeholder="Contact Admissions for fees" />
          </div>
          <div>
            <label className="label">Student Photo (path)</label>
            <input
              className="input"
              value={form.photo}
              onChange={update('photo')}
              placeholder="/images/programs/igcse-express-path.jpg"
            />
            <p className="mt-1 text-xs text-navy-700/60">
              Upload the image file into <code>frontend/public/images/programs/</code> and enter its path here.
            </p>
          </div>
          <div>
            <label className="label">CTA Label</label>
            <select className="input" value={form.ctaLabel} onChange={update('ctaLabel')}>
              <option>Enroll Now</option>
              <option>Register Interest</option>
            </select>
          </div>
          <label className="flex items-center gap-2 text-sm text-navy-700">
            <input type="checkbox" checked={form.isLaunchingSoon} onChange={update('isLaunchingSoon')} />
            Launching Soon
          </label>
          <label className="flex items-center gap-2 text-sm text-navy-700">
            <input type="checkbox" checked={form.isPublished} onChange={update('isPublished')} />
            Published
          </label>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <div className="flex gap-2">
            <button className="btn-primary flex-1 text-sm">{editingId ? 'Save Changes' : 'Add Program'}</button>
            {editingId && <button type="button" onClick={resetForm} className="btn-ghost border border-navy-100 text-sm">Cancel</button>}
          </div>
        </form>

        <div className="lg:col-span-2">
          <DataTable
            title="All Programs"
            loading={loading}
            rows={programs}
            columns={[
              { key: 'title', label: 'Title' },
              { key: 'slug', label: 'Slug' },
              { key: 'isLaunchingSoon', label: 'Launching Soon', render: (r) => (r.isLaunchingSoon ? 'Yes' : 'No') },
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