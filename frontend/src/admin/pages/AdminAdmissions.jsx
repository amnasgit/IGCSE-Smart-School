import { useEffect, useState } from 'react';
import api from '../../api/api.js';
import DataTable from '../DataTable.jsx';

const statuses = ['New', 'Under Review', 'Interview Scheduled', 'Enrolled', 'Rejected'];
const statusColor = {
  New: 'bg-navy-50 text-navy',
  'Under Review': 'bg-amber-50 text-amber-600',
  'Interview Scheduled': 'bg-teal-50 text-teal-600',
  Enrolled: 'bg-teal-50 text-teal-600',
  Rejected: 'bg-red-50 text-red-600',
};

export default function AdminAdmissions() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [statusFilter, setStatusFilter] = useState('');
  const [programFilter, setProgramFilter] = useState('');

  const load = () => {
    setLoading(true);
    const params = { page, limit: 15 };
    if (statusFilter) params.status = statusFilter;
    if (programFilter) params.program = programFilter;
    api
      .get('/admissions', { params })
      .then((res) => {
        setRows(res.data.data);
        setPages(res.data.pages);
        setTotal(res.data.total);
      })
      .finally(() => setLoading(false));
  };

  useEffect(load, [page, statusFilter, programFilter]);

  const updateStatus = async (id, status) => {
    await api.patch(`/admissions/${id}/status`, { status });
    load();
  };

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold text-navy">Admission Applications</h1>
        <div className="flex gap-3">
          <select className="input !w-auto" value={statusFilter} onChange={(e) => { setPage(1); setStatusFilter(e.target.value); }}>
            <option value="">All Statuses</option>
            {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <select className="input !w-auto" value={programFilter} onChange={(e) => { setPage(1); setProgramFilter(e.target.value); }}>
            <option value="">All Programs</option>
            <option>IGCSE Express Path</option>
            <option>IGCSE Global Path</option>
            <option>IGCSE National Path</option>
            <option>IGCSE Foundation Rise</option>
          </select>
        </div>
      </div>

      <DataTable
        title="Applications"
        loading={loading}
        rows={rows}
        total={total}
        page={page}
        pages={pages}
        onPageChange={setPage}
        exportFilename="admissions.csv"
        columns={[
          { key: 'studentFullName', label: 'Student' },
          { key: 'programOfInterest', label: 'Program' },
          { key: 'studentEmail', label: 'Email' },
          { key: 'studentPhone', label: 'Phone' },
          {
            key: 'createdAt',
            label: 'Submitted',
            render: (r) => new Date(r.createdAt).toLocaleDateString(),
          },
          {
            key: 'status',
            label: 'Status',
            render: (r) => (
              <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusColor[r.status] || ''}`}>
                {r.status}
              </span>
            ),
          },
        ]}
        actions={(row) => (
          <select
            className="input !w-auto !py-1.5 text-xs"
            value={row.status}
            onChange={(e) => updateStatus(row._id, e.target.value)}
          >
            {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        )}
      />
    </div>
  );
}