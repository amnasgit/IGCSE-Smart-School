import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import PageHeader from '../components/PageHeader.jsx';
import api from '../api/api.js';

export default function JobDetails() {
  const { id } = useParams();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    positionOfInterest: '',
    message: '',
  });

  const [file, setFile] = useState(null);

  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');

  /* ================= GET JOB DETAILS ================= */

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        setError('');

        const res = await api.get(
          `/careers/listings/${id}`
        );

        setJob(res.data?.data || null);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            'Unable to load this job listing.'
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchJob();
    }
  }, [id]);

  /* ================= FORM UPDATE ================= */

  const update = (field) => (e) => {
    setForm((f) => ({
      ...f,
      [field]: e.target.value,
    }));
  };

  /* ================= OPEN MODAL ================= */

  const openApplyModal = () => {
    if (!job) return;

    setForm((f) => ({
      ...f,
      positionOfInterest: job.title,
    }));

    setStatus('idle');
    setErrorMsg('');
    setIsModalOpen(true);
  };

  /* ================= CLOSE MODAL ================= */

  const closeModal = () => {
    if (status === 'loading') return;

    setIsModalOpen(false);
  };

  /* ================= SUBMIT APPLICATION ================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setErrorMsg(
        'Please attach your CV (PDF, DOC, or DOCX, max 5MB).'
      );
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg('CV file size must not exceed 5MB.');
      return;
    }

    setStatus('loading');
    setErrorMsg('');

    try {
      const data = new FormData();

      Object.entries(form).forEach(([key, value]) => {
        data.append(key, value);
      });

      data.append('cv', file);

      await api.post(
        '/careers/applications',
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      setStatus('success');

      setForm({
        name: '',
        email: '',
        phone: '',
        positionOfInterest: job.title,
        message: '',
      });

      setFile(null);
    } catch (err) {
      setStatus('error');

      setErrorMsg(
        err.response?.data?.message ||
          'Something went wrong. Please try again.'
      );
    }
  };

  /* ================= LOADING ================= */

  if (loading) {
    return (
      <>
        <PageHeader />

        <section className="section">
          <div className="container-page">
            <p className="text-sm text-navy-700/70">
              Loading job details...
            </p>
          </div>
        </section>
      </>
    );
  }

  /* ================= ERROR ================= */

  if (error || !job) {
    return (
      <>
        <PageHeader />

        <section className="section">
          <div className="container-page">
            <div className="card">
              <h1 className="text-xl font-semibold text-navy">
                Job not found
              </h1>

              <p className="mt-2 text-sm text-navy-700/80">
                {error ||
                  'This job listing is no longer available.'}
              </p>

              <Link
                to="/careers"
                className="btn-secondary mt-5 inline-flex"
              >
                Back to Careers
              </Link>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      {/* ================= HEADER IMAGE ================= */}

      <PageHeader />

      {/* ================= JOB DETAILS ================= */}

      <section className="section">
        <div className="container-page max-w-4xl">

          {/* Back */}
          <Link
            to="/careers"
            className="mb-6 inline-flex text-sm font-medium text-teal-600 hover:underline"
          >
            ← Back to Careers
          </Link>

          {/* Job Heading */}
          <div className="card">
            <p className="eyebrow">
              Career Opportunity
            </p>

            <h1 className="mt-2 text-3xl font-semibold text-navy">
              {job.title}
            </h1>

            <div className="mt-3 flex flex-wrap gap-3 text-sm text-navy-700/70">
              {job.department && (
                <span>
                  Department: {job.department}
                </span>
              )}

              <span>
                Type: {job.type}
              </span>
            </div>

            {/* Description */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-navy">
                Job Description
              </h2>

              <div className="mt-4 whitespace-pre-line text-sm leading-7 text-navy-700/80">
                {job.description ||
                  'No additional description has been provided for this position.'}
              </div>
            </div>

            {/* Apply Button */}
            <div className="mt-8 border-t border-navy-100 pt-6">
              <button
                type="button"
                onClick={openApplyModal}
                className="btn-primary"
              >
                Apply for this Position
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ================= APPLICATION MODAL ================= */}

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              closeModal();
            }
          }}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl"
            onMouseDown={(e) => e.stopPropagation()}
          >

            {/* Close Button */}
            <button
              type="button"
              onClick={closeModal}
              disabled={status === 'loading'}
              className="absolute right-4 top-4 text-2xl leading-none text-navy-700/60 hover:text-navy"
              aria-label="Close"
            >
              ×
            </button>

            {/* Modal Header */}
            <div className="pr-8">
              <p className="eyebrow">
                Job Application
              </p>

              <h2 className="mt-2 text-2xl font-semibold text-navy">
                Apply for this Position
              </h2>

              <p className="mt-1 text-sm text-navy-700/70">
                {job.title}
              </p>
            </div>

            {/* Success */}
            {status === 'success' ? (
              <div className="mt-6 rounded-xl border border-teal-300 bg-teal-50 p-5">
                <h3 className="text-lg font-semibold text-teal-600">
                  Application received!
                </h3>

                <p className="mt-2 text-sm text-navy-700/80">
                  Thank you for applying. Our HR team will review
                  your application and contact you if you are
                  shortlisted.
                </p>

                <button
                  type="button"
                  className="btn-primary mt-5"
                  onClick={() => {
                    setIsModalOpen(false);
                    setStatus('idle');
                  }}
                >
                  Close
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="mt-6 space-y-4"
              >

                {/* Name */}
                <div>
                  <label className="label">
                    Name *
                  </label>

                  <input
                    required
                    className="input"
                    value={form.name}
                    onChange={update('name')}
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="label">
                    Email *
                  </label>

                  <input
                    required
                    type="email"
                    className="input"
                    value={form.email}
                    onChange={update('email')}
                    placeholder="Enter your email"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="label">
                    Phone *
                  </label>

                  <input
                    required
                    type="tel"
                    className="input"
                    value={form.phone}
                    onChange={update('phone')}
                    placeholder="Enter your phone number"
                  />
                </div>

                {/* Position */}
                <div>
                  <label className="label">
                    Position of Interest *
                  </label>

                  <input
                    required
                    className="input"
                    value={form.positionOfInterest}
                    onChange={update('positionOfInterest')}
                  />
                </div>

                {/* CV */}
                <div>
                  <label className="label">
                    CV Upload (PDF/DOC/DOCX, max 5MB) *
                  </label>

                  <input
                    required
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) =>
                      setFile(
                        e.target.files?.[0] || null
                      )
                    }
                    className="input"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="label">
                    Message
                  </label>

                  <textarea
                    rows={4}
                    className="input"
                    value={form.message}
                    onChange={update('message')}
                    placeholder="Write a short message..."
                  />
                </div>

                {/* Error */}
                {errorMsg && (
                  <p className="text-sm text-red-600">
                    {errorMsg}
                  </p>
                )}

                {/* Buttons */}
                <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={closeModal}
                    disabled={status === 'loading'}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="btn-primary"
                  >
                    {status === 'loading'
                      ? 'Submitting…'
                      : 'Submit Application'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}