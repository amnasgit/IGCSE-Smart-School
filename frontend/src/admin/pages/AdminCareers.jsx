import { useEffect, useState } from 'react';
import api from '../../api/api.js';
import DataTable from '../DataTable.jsx';

const appStatuses = ['New', 'Reviewed', 'Shortlisted', 'Rejected', 'Hired'];

function JobListingsTab() {
  const [listings, setListings] = useState([]);
  const [form, setForm] = useState({ title: '', department: '', type: 'Full-time', description: '' });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    api.get('/careers/listings').then((res) => setListings(res.data.data)).finally(() => setLoading(false));
  };
  useEffect(load, []);

  const create = async (e) => {
    e.preventDefault();
    if (editingId) {
      await api.patch(`/careers/listings/${editingId}`, form);
    } else {
      await api.post('/careers/listings', form);
    }
    setForm({ title: '', department: '', type: 'Full-time', description: '' });
    setEditingId(null);
    load();
  };

  const startEdit = (job) => {
    setEditingId(job._id);
    setForm({ title: job.title, department: job.department || '', type: job.type, description: job.description || '' });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm({ title: '', department: '', type: 'Full-time', description: '' });
  };

  const toggleOpen = async (job) => {
    await api.patch(`/careers/listings/${job._id}`, { isOpen: !job.isOpen });
    load();
  };

  const remove = async (id) => {
    if (!confirm('Remove this job listing?')) return;
    await api.delete(`/careers/listings/${id}`);
    load();
  };

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <form onSubmit={create} className="card h-fit space-y-3">
        <h3 className="font-semibold text-navy">{editingId ? 'Edit Job Listing' : 'Add Job Listing'}</h3>
        <div>
          <label className="label">Title</label>
          <input required className="input" value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} />
        </div>
        <div>
          <label className="label">Department</label>
          <input className="input" value={form.department} onChange={(e) => setForm((f) => ({ ...f, department: e.target.value }))} />
        </div>
        <div>
          <label className="label">Type</label>
          <select className="input" value={form.type} onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}>
            <option>Full-time</option>
            <option>Part-time</option>
            <option>Contract</option>
          </select>
        </div>
        <div>
          <label className="label">Description</label>
          <textarea
            rows={6}
            className="input"
            placeholder="Responsibilities, requirements, etc. — shown when a visitor clicks 'Read More' on the Careers page."
            value={form.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
          />
        </div>
        <div className="flex gap-2">
          <button className="btn-primary flex-1 text-sm">{editingId ? 'Save Changes' : 'Add Listing'}</button>
          {editingId && (
            <button type="button" onClick={cancelEdit} className="btn-ghost border border-navy-100 text-sm">
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="lg:col-span-2">
        <DataTable
          title="Job Listings"
          loading={loading}
          rows={listings}
          columns={[
            { key: 'title', label: 'Title' },
            { key: 'department', label: 'Department' },
            { key: 'type', label: 'Type' },
            { key: 'isOpen', label: 'Status', render: (r) => (r.isOpen ? 'Open' : 'Closed') },
          ]}
          actions={(row) => (
            <div className="flex gap-2">
              <button className="btn-ghost border border-navy-100 !py-1.5 text-xs" onClick={() => startEdit(row)}>
                Edit
              </button>
              <button className="btn-ghost border border-navy-100 !py-1.5 text-xs" onClick={() => toggleOpen(row)}>
                {row.isOpen ? 'Close' : 'Reopen'}
              </button>
              <button className="btn-ghost border border-red-100 !py-1.5 text-xs text-red-600" onClick={() => remove(row._id)}>
                Remove
              </button>
            </div>
          )}
        />
      </div>
    </div>
  );
}

function ApplicationsTab() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);

  const load = () => {
    setLoading(true);
    api.get('/careers/applications', { params: { page, limit: 15 } })
      .then((res) => { setRows(res.data.data); setPages(res.data.pages); setTotal(res.data.total); })
      .finally(() => setLoading(false));
  };
  useEffect(load, [page]);

  const updateStatus = async (id, status) => {
    await api.patch(`/careers/applications/${id}/status`, { status });
    load();
  };

  return (
    <DataTable
      title="CV Applications"
      loading={loading}
      rows={rows}
      total={total}
      page={page}
      pages={pages}
      onPageChange={setPage}
      exportFilename="career-applications.csv"
      columns={[
        { key: 'name', label: 'Name' },
        { key: 'email', label: 'Email' },
        { key: 'positionOfInterest', label: 'Position' },
        {
          key: 'cvFileUrl',
          label: 'CV',
          render: (r) => <a className="text-teal-600 underline" href={r.cvFileUrl} target="_blank" rel="noreferrer">Download</a>,
        },
        { key: 'createdAt', label: 'Submitted', render: (r) => new Date(r.createdAt).toLocaleDateString() },
        { key: 'status', label: 'Status' },
      ]}
      actions={(row) => (
        <select className="input !w-auto !py-1.5 text-xs" value={row.status} onChange={(e) => updateStatus(row._id, e.target.value)}>
          {appStatuses.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      )}
    />
  );
}

export default function AdminCareers() {
  const [tab, setTab] = useState('applications');

  return (
    <div>
      <h1 className="text-2xl font-semibold text-navy">Careers</h1>
      <div className="mt-4 mb-6 flex gap-2">
        <button
          className={`rounded-full px-4 py-2 text-sm font-medium ${tab === 'applications' ? 'bg-navy text-white' : 'bg-white text-navy-700 border border-navy-100'}`}
          onClick={() => setTab('applications')}
        >
          CV Applications
        </button>
        <button
          className={`rounded-full px-4 py-2 text-sm font-medium ${tab === 'listings' ? 'bg-navy text-white' : 'bg-white text-navy-700 border border-navy-100'}`}
          onClick={() => setTab('listings')}
        >
          Job Listings
        </button>
      </div>
      {tab === 'applications' ? <ApplicationsTab /> : <JobListingsTab />}
    </div>
  );
}