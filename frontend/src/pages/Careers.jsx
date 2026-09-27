import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader.jsx';
import api from '../api/api.js';

export default function Careers() {
  const [listings, setListings] = useState([]);

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

  useEffect(() => {
    api
      .get('/careers/listings')
      .then((res) => {
        setListings(res.data?.data || []);
      })
      .catch(() => {
        setListings([]);
      });
  }, []);

  const update = (field) => (e) => {
    setForm((f) => ({
      ...f,
      [field]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setErrorMsg(
        'Please attach your CV (PDF, DOC, or DOCX, max 5MB)'
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

      await api.post('/careers/applications', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setStatus('success');

      setForm({
        name: '',
        email: '',
        phone: '',
        positionOfInterest: '',
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

  return (
    <>
      {/* =====================================================
          PAGE HEADER
          Careers content is now inside PageHeader
      ====================================================== */}
      <PageHeader
        eyebrow="Careers"
        title="Join our growing team of educators and professionals."
        subtitle="Help shape the future of online IGCSE education."
      />


      {/* =====================================================
          OPEN POSITIONS
      ====================================================== */}
      <section className="section -mt-4 pt-2">
        <div className="container-page">

          <h2 className="text-xl font-semibold text-navy">
            Open Positions
          </h2>

          {listings.length ? (

            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

              {listings.map((job) => (

                <div
                  key={job._id}
                  className="card flex flex-col"
                >

                  <h3 className="font-semibold text-navy">
                    {job.title}
                  </h3>

                  <p className="mt-1 text-sm text-navy-700/70">
                    {job.department || 'General'} · {job.type}
                  </p>

                  <div className="mt-5">

                    <Link
                      to={`/careers/${job._id}`}
                      className="btn-primary !py-1.5 !px-4 text-xs"
                    >
                      Read More
                    </Link>

                  </div>

                </div>

              ))}

            </div>

          ) : (

            <p className="mt-3 text-sm text-navy-700/80">
              No open positions right now — submit your CV below
              for future opportunities.
            </p>

          )}

        </div>
      </section>


      {/* =====================================================
          SUBMIT YOUR CV
      ====================================================== */}
      <section className="section bg-mist">

        <div className="container-page max-w-xl">

          <h2 className="text-xl font-semibold text-navy">
            Submit Your CV
          </h2>


          {status === 'success' ? (

            <div className="card mt-5 border-teal-400 bg-teal-50">

              <h3 className="text-lg font-semibold text-teal-600">
                Application received!
              </h3>

              <p className="mt-1 text-sm text-navy-700/80">
                Our HR team will review your CV and reach out if
                there's a match.
              </p>

            </div>

          ) : (

            <form
              onSubmit={handleSubmit}
              className="card mt-5 space-y-4"
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
                />

              </div>


              {/* Phone */}
              <div>

                <label className="label">
                  Phone *
                </label>

                <input
                  required
                  className="input"
                  value={form.phone}
                  onChange={update('phone')}
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
                    setFile(e.target.files?.[0] || null)
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
                />

              </div>


              {/* Error */}
              {errorMsg && (
                <p className="text-sm text-red-600">
                  {errorMsg}
                </p>
              )}


              {/* Submit */}
              <button
                type="submit"
                className="btn-primary w-full"
                disabled={status === 'loading'}
              >
                {status === 'loading'
                  ? 'Submitting…'
                  : 'Submit Application'}
              </button>

            </form>

          )}

        </div>

      </section>
    </>
  );
}