import { useEffect, useState } from 'react';
import api from '../../api/api.js';
import DataTable from '../DataTable.jsx';

const roles = ['content_editor', 'admissions_officer', 'hr_manager', 'support_agent', 'super_admin'];
const emptyForm = { name: '', email: '', password: '', role: 'content_editor' };

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState('');
  const [creating, setCreating] = useState(false);

  const load = () => {
    setLoading(true);
    api.get('/auth/users').then((res) => setUsers(res.data.data)).finally(() => setLoading(false));
  };
  useEffect(load, []);

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setCreating(true);
    try {
      await api.post('/auth/users', form);
      setForm(emptyForm);
      load();
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setCreating(false);
    }
  };

  const toggleActive = async (user) => {
    await api.patch(`/auth/users/${user._id}`, { isActive: !user.isActive });
    load();
  };

  return (
    <div>
      <h1 className="mb-5 text-2xl font-semibold text-navy">Staff Users</h1>

      <div className="grid gap-6 lg:grid-cols-3">
        <form onSubmit={handleSubmit} className="card h-fit space-y-3">
          <h3 className="font-semibold text-navy">Add Staff Account</h3>
          <div>
            <label className="label">Name</label>
            <input required className="input" value={form.name} onChange={update('name')} />
          </div>
          <div>
            <label className="label">Email</label>
            <input required type="email" className="input" value={form.email} onChange={update('email')} />
          </div>
          <div>
            <label className="label">Temporary Password</label>
            <input required type="password" minLength={8} className="input" value={form.password} onChange={update('password')} />
          </div>
          <div>
            <label className="label">Role</label>
            <select className="input" value={form.role} onChange={update('role')}>
              {roles.map((r) => <option key={r} value={r}>{r.replace('_', ' ')}</option>)}
            </select>
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button className="btn-primary w-full text-sm" disabled={creating}>
            {creating ? 'Creating…' : 'Create Account'}
          </button>
        </form>

        <div className="lg:col-span-2">
          <DataTable
            title="All Staff"
            loading={loading}
            rows={users}
            columns={[
              { key: 'name', label: 'Name' },
              { key: 'email', label: 'Email' },
              { key: 'role', label: 'Role', render: (r) => <span className="capitalize">{r.role.replace('_', ' ')}</span> },
              {
                key: 'isActive',
                label: 'Status',
                render: (r) => (
                  <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${r.isActive ? 'bg-teal-50 text-teal-600' : 'bg-red-50 text-red-600'}`}>
                    {r.isActive ? 'Active' : 'Disabled'}
                  </span>
                ),
              },
            ]}
            actions={(row) => (
              <button className="btn-ghost border border-navy-100 !py-1.5 text-xs" onClick={() => toggleActive(row)}>
                {row.isActive ? 'Disable' : 'Enable'}
              </button>
            )}
          />
        </div>
      </div>
    </div>
  );
}