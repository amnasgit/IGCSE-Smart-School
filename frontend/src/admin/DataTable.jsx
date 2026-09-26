import { exportToCsv } from './exportCsv.js';

/**
 * Generic admin table.
 * columns: [{ key, label, render?(row) }]
 */
export default function DataTable({
  title,
  columns,
  rows,
  loading,
  total,
  page,
  pages,
  onPageChange,
  exportFilename,
  actions,
}) {
  return (
    <div className="rounded-2xl border border-navy-100 bg-white shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-navy-100 p-5">
        <div>
          <h2 className="text-lg font-semibold text-navy">{title}</h2>
          {typeof total === 'number' && <p className="text-xs text-navy-700/60">{total} total records</p>}
        </div>
        {exportFilename && rows?.length > 0 && (
          <button
            className="btn-ghost border border-navy-100 text-sm"
            onClick={() => exportToCsv(exportFilename, rows)}
          >
            Export CSV
          </button>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-navy-50/60 text-xs uppercase tracking-wide text-navy-700/70">
            <tr>
              {columns.map((c) => (
                <th key={c.key} className="whitespace-nowrap px-5 py-3 font-semibold">{c.label}</th>
              ))}
              {actions && <th className="px-5 py-3 font-semibold">Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-navy-100">
            {loading ? (
              <tr><td className="px-5 py-8 text-center text-navy-700/60" colSpan={columns.length + (actions ? 1 : 0)}>Loading…</td></tr>
            ) : rows?.length ? (
              rows.map((row) => (
                <tr key={row._id} className="hover:bg-navy-50/40">
                  {columns.map((c) => (
                    <td key={c.key} className="whitespace-nowrap px-5 py-3 text-navy-800">
                      {c.render ? c.render(row) : String(row[c.key] ?? '—')}
                    </td>
                  ))}
                  {actions && <td className="px-5 py-3">{actions(row)}</td>}
                </tr>
              ))
            ) : (
              <tr><td className="px-5 py-8 text-center text-navy-700/60" colSpan={columns.length + (actions ? 1 : 0)}>No records found</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {pages > 1 && (
        <div className="flex items-center justify-between border-t border-navy-100 p-4 text-sm">
          <button
            className="btn-ghost border border-navy-100 disabled:opacity-40"
            disabled={page <= 1}
            onClick={() => onPageChange(page - 1)}
          >
            Previous
          </button>
          <span className="text-navy-700/70">Page {page} of {pages}</span>
          <button
            className="btn-ghost border border-navy-100 disabled:opacity-40"
            disabled={page >= pages}
            onClick={() => onPageChange(page + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
