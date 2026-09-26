import { useEffect, useState } from 'react';
import api from '../../api/api.js';
import DataTable from '../DataTable.jsx';

export default function AdminFeedback() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setLoading(true);
    api.get('/feedback', { params: { page, limit: 15 } })
      .then((res) => { setRows(res.data.data); setPages(res.data.pages); setTotal(res.data.total); })
      .finally(() => setLoading(false));
  }, [page]);

  return (
    <div>
      <h1 className="mb-5 text-2xl font-semibold text-navy">Feedback</h1>
      <DataTable
        title="Submitted Feedback"
        loading={loading}
        rows={rows}
        total={total}
        page={page}
        pages={pages}
        onPageChange={setPage}
        exportFilename="feedback.csv"
        columns={[
          { key: 'name', label: 'Name', render: (r) => r.name || 'Anonymous' },
          { key: 'email', label: 'Email', render: (r) => r.email || '—' },
          { key: 'rating', label: 'Rating', render: (r) => (r.rating ? `${r.rating} / 5` : '—') },
          { key: 'message', label: 'Message', render: (r) => <span className="block max-w-md truncate">{r.message}</span> },
          { key: 'createdAt', label: 'Received', render: (r) => new Date(r.createdAt).toLocaleDateString() },
        ]}
      />
    </div>
  );
}
