import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/api.js';

export default function ProgramDetail() {
  const { slug } = useParams();
  const [program, setProgram] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setLoading(true);
    setNotFound(false);
    api
      .get(`/programs/${slug}`)
      .then((res) => setProgram(res.data.data))
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return <div className="container-page py-24 text-center text-navy-700/70">Loading program details…</div>;
  }

  if (notFound || !program) {
    return (
      <div className="container-page py-24 text-center">
        <h1 className="text-2xl font-semibold text-navy">Program not found</h1>
        <p className="mt-2 text-navy-700/80">This program may have been renamed or removed.</p>
        <Link to="/programs" className="btn-secondary mt-6 inline-flex">Back to Programs</Link>
      </div>
    );
  }

  const badges = [program.duration, program.numberOfTerms, program.numberOfSubjects, program.startInfo].filter(Boolean);

  return (
    <section className="section">
      <div className="container-page grid gap-10 pt-[4rem] pb-14 sm:pt-[4.5rem] lg:grid-cols-3 lg:pt-20">
        <div className="lg:col-span-2">
          <Link
            to="/programs"
            className="eyebrow inline-flex items-center gap-1 transition hover:text-amber-600"
          >
            <span aria-hidden="true">←</span> All Programs
          </Link>
          <h1 className="mt-2 text-3xl font-semibold text-navy sm:text-4xl">{program.title}</h1>
          {program.tagline && <p className="mt-3 max-w-2xl text-navy-700/80">{program.tagline}</p>}

          {badges.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {badges.map((b) => (
                <span key={b} className="rounded-full border border-navy-100 bg-white px-3.5 py-1.5 text-xs font-semibold text-navy">
                  {b}
                </span>
              ))}
            </div>
          )}

          <h2 className="mt-6 text-xl font-semibold text-navy">Overview</h2>
          <p className="mt-2 text-navy-700/80">{program.overview}</p>

          {program.subjectsCovered?.length > 0 && (
            <>
              <h2 className="mt-8 text-xl font-semibold text-navy">Subjects Covered</h2>
              <ul className="mt-2 grid grid-cols-2 gap-2 text-sm text-navy-700/80 sm:grid-cols-3">
                {program.subjectsCovered.map((s) => <li key={s}>• {s}</li>)}
              </ul>
            </>
          )}

          {program.terms?.length > 0 && (
            <>
              <h2 className="mt-8 text-xl font-semibold text-navy">Term Structure</h2>
              <div className="mt-3 overflow-hidden rounded-xl border border-navy-100">
                <table className="w-full text-left text-sm">
                  <thead className="bg-navy text-paper">
                    <tr>
                      <th className="px-4 py-2.5 font-semibold">Term</th>
                      <th className="px-4 py-2.5 font-semibold">Dates</th>
                      <th className="px-4 py-2.5 font-semibold">Subjects Taught</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-navy-100">
                    {program.terms.map((t) => (
                      <tr key={t.termLabel} className="odd:bg-mist/60">
                        <td className="px-4 py-3 font-medium text-navy">{t.termLabel}</td>
                        <td className="px-4 py-3 text-navy-700/70">{t.dateRange}</td>
                        <td className="px-4 py-3 text-navy-700/80">{t.subjects}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {program.examSchedule?.length > 0 && (
            <>
              <h2 className="mt-8 text-xl font-semibold text-navy">Exam Schedule</h2>
              <div className="mt-3 space-y-2">
                {program.examSchedule.map((e) => (
                  <div key={e.session} className="rounded-lg border-l-4 border-amber-400 bg-mist/60 px-4 py-2.5">
                    <p className="text-sm font-semibold text-navy">{e.session}</p>
                    <p className="text-sm text-navy-700/80">{e.subjects}</p>
                  </div>
                ))}
              </div>
            </>
          )}

          {program.whoItSuits && (
            <>
              <h2 className="mt-8 text-xl font-semibold text-navy">Who It Suits</h2>
              <p className="mt-2 rounded-lg bg-mist/60 p-4 text-sm text-navy-700/80">{program.whoItSuits}</p>
            </>
          )}
        </div>

        <aside className="flex h-full flex-col gap-5">
          {program.isLaunchingSoon && <span className="badge w-fit">Launching Soon</span>}

          {program.photo && (
            <div className="min-h-[30rem] overflow-hidden rounded-2xl">
              <img
                src={program.photo}
                alt={`Student enrolled in ${program.title}`}
                className="h-full w-full object-contain"
              />
            </div>
          )}

          <div className="flex-shrink-0 rounded-2xl bg-navy p-6 shadow-sm">
            <dl className="space-y-3 text-sm">
              <div>
                <dt className="font-medium text-amber-400">Duration</dt>
                <dd className="text-paper/85">{program.duration || 'To be confirmed'}</dd>
              </div>
              <div>
                <dt className="font-medium text-amber-400">Entry Requirements</dt>
                <dd className="text-paper/85">{program.entryRequirements || 'Contact Admissions'}</dd>
              </div>
              <div>
                <dt className="font-medium text-amber-400">Fees</dt>
                <dd className="text-paper/85">{program.feeReference || 'Contact Admissions for fees'}</dd>
              </div>
            </dl>
            <Link to="/admissions" className="btn-primary mt-5 w-full text-sm">
              {program.ctaLabel || 'Enroll Now'}
            </Link>
          </div>

        </aside>
      </div>
    </section>
  );
}