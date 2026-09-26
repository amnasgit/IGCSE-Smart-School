import { useEffect, useState } from 'react';
import api from '../../api/api.js';
import DataTable from '../DataTable.jsx';

export default function AdminContacts() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [resolvedFilter, setResolvedFilter] = useState('');

  const load = () => {
    setLoading(true);
    const params = { page, limit: 15 };
    if (resolvedFilter) params.resolved = resolvedFilter;
    api
      .get('/contact', { params })
      .then((res) => {
        setRows(res.data.data);
        setPages(res.data.pages);
        setTotal(res.data.total);
      })
      .finally(() => setLoading(false));
  };

  useEffect(load, [page, resolvedFilter]);

  const toggleResolved = async (row) => {
    await api.patch(`/contact/${row._id}`, { isResolved: !row.isResolved });
    load();
  };

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold text-navy">Contact Messages</h1>
        <select className="input !w-auto" value={resolvedFilter} onChange={(e) => { setPage(1); setResolvedFilter(e.target.value); }}>
          <option value="">All</option>
          <option value="false">Unresolved</option>
          <option value="true">Resolved</option>
        </select>
      </div>

      <DataTable
        title="Messages"
        loading={loading}
        rows={rows}
        total={total}
        page={page}
        pages={pages}
        onPageChange={setPage}
        exportFilename="contact-messages.csv"
        columns={[
          { key: 'name', label: 'Name' },
          { key: 'email', label: 'Email' },
          { key: 'subject', label: 'Subject' },
          { key: 'message', label: 'Message', render: (r) => <span className="block max-w-xs truncate">{r.message}</span> },
          { key: 'createdAt', label: 'Received', render: (r) => new Date(r.createdAt).toLocaleDateString() },
          {
            key: 'isResolved',
            label: 'Status',
            render: (r) => (
              <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${r.isResolved ? 'bg-teal-50 text-teal-600' : 'bg-amber-50 text-amber-600'}`}>
                {r.isResolved ? 'Resolved' : 'Unresolved'}
              </span>
            ),
          },
        ]}
        actions={(row) => (
          <button className="btn-ghost border border-navy-100 !py-1.5 text-xs" onClick={() => toggleResolved(row)}>
            Mark {row.isResolved ? 'Unresolved' : 'Resolved'}
          </button>
        )}
      />
    </div>
  );
}
