import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/api.js';
import { useAdminAuth } from './AuthContext.jsx';

const statConfig = [
  { key: 'admissions', label: 'Admission Applications', url: '/admissions?limit=1', to: '/admin/admissions', roles: ['super_admin', 'admissions_officer'] },
  { key: 'contacts', label: 'Contact Messages', url: '/contact?limit=1', to: '/admin/contact', roles: ['super_admin', 'content_editor'] },
  { key: 'careers', label: 'Career Applications', url: '/careers/applications?limit=1', to: '/admin/careers', roles: ['super_admin', 'hr_manager'] },
  { key: 'feedback', label: 'Feedback Received', url: '/feedback?limit=1', to: '/admin/feedback', roles: ['super_admin', 'content_editor'] },
  { key: 'subscribers', label: 'Newsletter Subscribers', url: '/subscribers', to: '/admin/subscribers', roles: ['super_admin', 'content_editor'] },
];

export default function AdminDashboard() {
  const { user } = useAdminAuth();
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const visible = statConfig.filter((s) => s.roles.includes(user?.role));
    Promise.allSettled(visible.map((s) => api.get(s.url))).then((results) => {
      const next = {};
      results.forEach((res, i) => {
        const key = visible[i].key;
        if (res.status === 'fulfilled') {
          next[key] = res.value.data.total ?? res.value.data.data?.length ?? 0;
        } else {
          next[key] = null;
        }
      });
      setStats(next);
      setLoading(false);
    });
  }, [user]);

  const visibleCards = statConfig.filter((s) => s.roles.includes(user?.role));

  return (
    <div>
      <h1 className="text-2xl font-semibold text-navy">Welcome back, {user?.name?.split(' ')[0]}</h1>
      <p className="mt-1 text-sm text-navy-700/70">Here's a snapshot of activity across the site.</p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visibleCards.map((s) => (
          <Link key={s.key} to={s.to} className="card">
            <p className="text-sm font-medium text-navy-700/70">{s.label}</p>
            <p className="mt-2 text-3xl font-semibold text-navy">
              {loading ? '…' : stats[s.key] ?? '—'}
            </p>
            <span className="mt-3 inline-block text-sm text-teal-600">View all →</span>
          </Link>
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-navy-100 bg-white p-6">
        <h2 className="text-lg font-semibold text-navy">Your Role</h2>
        <p className="mt-1 text-sm capitalize text-navy-700/80">{user?.role?.replace('_', ' ')}</p>
        <p className="mt-2 text-sm text-navy-700/60">
          The sidebar shows only the sections your role has access to, matching the permissions defined
          in the Website Requirements Document (Section 5).
        </p>
      </div>
    </div>
  );
}
