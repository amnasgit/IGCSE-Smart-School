import { useEffect, useState } from 'react';
import api from '../../api/api.js';
import DataTable from '../DataTable.jsx';

export default function AdminSubscribers() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/subscribers').then((res) => setRows(res.data.data)).finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1 className="mb-5 text-2xl font-semibold text-navy">Newsletter / WhatsApp Subscribers</h1>
      <DataTable
        title="Subscribers"
        loading={loading}
        rows={rows}
        total={rows.length}
        exportFilename="subscribers.csv"
        columns={[
          { key: 'name', label: 'Name', render: (r) => r.name || '—' },
          { key: 'contact', label: 'Contact' },
          { key: 'channel', label: 'Channel' },
          { key: 'source', label: 'Source' },
          { key: 'createdAt', label: 'Joined', render: (r) => new Date(r.createdAt).toLocaleDateString() },
        ]}
      />
    </div>
  );
}
