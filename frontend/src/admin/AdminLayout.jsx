import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAdminAuth } from './AuthContext.jsx';

const allLinks = [
  { to: '/admin', label: 'Dashboard', roles: ['super_admin', 'content_editor', 'admissions_officer', 'hr_manager', 'support_agent'], end: true },
  { to: '/admin/chat', label: 'Live Chat', roles: ['super_admin', 'support_agent'] },
  { to: '/admin/admissions', label: 'Admissions', roles: ['super_admin', 'admissions_officer'] },
  { to: '/admin/contact', label: 'Contact Messages', roles: ['super_admin', 'content_editor'] },
  { to: '/admin/careers', label: 'Careers', roles: ['super_admin', 'hr_manager'] },
  { to: '/admin/feedback', label: 'Feedback', roles: ['super_admin', 'content_editor'] },
  { to: '/admin/subscribers', label: 'Subscribers', roles: ['super_admin', 'content_editor'] },
  { to: '/admin/programs', label: 'Programs', roles: ['super_admin', 'content_editor'] },
  { to: '/admin/faqs', label: 'FAQs', roles: ['super_admin', 'content_editor'] },
  { to: '/admin/users', label: 'Staff Users', roles: ['super_admin'] },
];

const navLinkClass = ({ isActive }) =>
  `block rounded-lg px-3 py-2.5 text-sm font-medium transition ${
    isActive ? 'bg-amber-50 text-amber-600' : 'text-navy-100/80 hover:bg-navy-700 hover:text-white'
  }`;

export default function AdminLayout() {
  const { user, logout } = useAdminAuth();
  const navigate = useNavigate();

  const links = allLinks.filter((l) => l.roles.includes(user?.role));

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="flex min-h-screen bg-mist">
      <aside className="flex w-64 flex-shrink-0 flex-col bg-navy-900 text-white">
        <div className="border-b border-navy-700 p-5">
          <p className="font-display text-lg font-semibold">IGCSE Smart School</p>
          <p className="text-xs uppercase tracking-wide text-navy-100/60">Admin Panel</p>
        </div>
        <nav className="flex-1 space-y-1 p-3">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className={navLinkClass}>
              {l.label}
            </NavLink>
          ))}
        </nav>
        <div className="border-t border-navy-700 p-4">
          <p className="text-sm font-medium text-white">{user?.name}</p>
          <p className="text-xs capitalize text-navy-100/60">{user?.role?.replace('_', ' ')}</p>
          <button onClick={handleLogout} className="btn-ghost mt-3 w-full !bg-navy-700 !text-white hover:!bg-navy-600 text-sm">
            Log Out
          </button>
        </div>
      </aside>

      <div className="flex-1 overflow-x-hidden">
        <main className="p-6 sm:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}