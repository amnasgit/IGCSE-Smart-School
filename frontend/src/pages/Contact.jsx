import { useState } from 'react';
import PageHeader from '../components/PageHeader.jsx';
import api from '../api/api.js';
import contactPhoto from '../assets/Contacts.png';

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: '',
    consentGiven: false,
  });

  const [status, setStatus] = useState('idle');

  const update = (field) => (e) => {
    const value =
      e.target.type === 'checkbox'
        ? e.target.checked
        : e.target.value;

    setForm((f) => ({ ...f, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      await api.post('/contact', {
        ...form,
        recaptchaToken: 'dev-placeholder',
      });

      setStatus('success');

      setForm({
        name: '',
        email: '',
        phone: '',
        subject: 'General Inquiry',
        message: '',
        consentGiven: false,
      });
    } catch {
      setStatus('error');
    }
  };

  return (
    <>
      {/* =========================================
          CONTACT PAGE
      ========================================= */}

      <div className="h-8 md:h-16" />

      {/* =========================================
          CONTACT INTRO + BACKGROUND IMAGE
      ========================================= */}

      <section className="relative">
        {/* =========================================
            CONTACT PAGE BACKGROUND PHOTO
        ========================================= */}

        <div className="pointer-events-none absolute -top-16 right-0 left-0 h-[calc(100%+4rem)]">

          <img
            src={contactPhoto}
            alt=""
            className="
              absolute
              inset-0
              h-full
              w-full
              object-cover
              object-center
              opacity-[0.20]
              sm:opacity-[0.22]
              lg:opacity-[0.64]
            "
          />

          {/* Soft left blend */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(90deg, #fbf8f3 0%, #fbf8f3 18%, rgba(251,248,243,0.96) 32%, rgba(251,248,243,0.72) 48%, rgba(251,248,243,0.30) 66%, rgba(251,248,243,0) 86%)',
            }}
          />

          {/* Soft bottom blend */}
          <div
            className="absolute inset-x-0 bottom-0 h-32"
            style={{
              background:
                'linear-gradient(to top, #fbf8f3, transparent)',
            }}
          />

        </div>


        {/* =========================================
            CONTACT CONTENT
        ========================================= */}

        <div className="relative z-10">

          {/* Contact Us Heading */}
          <section className="section pb-8">
            <div className="container-page">

              <p className="text-sm font-semibold uppercase tracking-wide text-teal-600">
                Contact Us
              </p>

              <h1 className="mt-2 max-w-3xl text-3xl font-semibold text-navy md:text-4xl">
                We'd love to hear from you.
              </h1>

              <p className="mt-3 max-w-2xl text-navy-700/80">
                Have a question about admissions, programs, or online learning?
                Get in touch with our team and we'll be happy to help.
              </p>

            </div>
          </section>


          {/* =========================================
              CONTACT FORM
          ========================================= */}

          <section className="section pt-2">
            <div className="container-page">

              <div className="max-w-3xl">

                {status === 'success' ? (

                  <div className="card border-teal-400 bg-teal-50">
                    <h2 className="text-lg font-semibold text-teal-600">
                      Message sent!
                    </h2>

                    <p className="mt-1 text-sm text-navy-700/80">
                      We'll get back to you as soon as possible.
                    </p>
                  </div>

                ) : (

                  <form
                    onSubmit={handleSubmit}
                    className="
                      card
                      space-y-4
                      bg-white/95
                      backdrop-blur-sm
                      shadow-lg
                    "
                  >

                    {/* Name + Email */}
                    <div className="grid gap-4 sm:grid-cols-2">

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
                          Phone (optional)
                        </label>

                        <input
                          className="input"
                          value={form.phone}
                          onChange={update('phone')}
                        />
                      </div>


                      {/* Subject */}
                      <div>
                        <label className="label">
                          Subject / Reason
                        </label>

                        <select
                          className="input"
                          value={form.subject}
                          onChange={update('subject')}
                        >
                          <option>General Inquiry</option>
                          <option>Admissions</option>
                          <option>Technical Support</option>
                          <option>Careers</option>
                          <option>Other</option>
                        </select>
                      </div>

                    </div>


                    {/* Message */}
                    <div>
                      <label className="label">
                        Message *
                      </label>

                      <textarea
                        required
                        rows={5}
                        className="input"
                        value={form.message}
                        onChange={update('message')}
                      />
                    </div>


                    {/* Privacy Consent */}
                    <label className="flex items-start gap-2 text-sm text-navy-700/90">

                      <input
                        required
                        type="checkbox"
                        checked={form.consentGiven}
                        onChange={update('consentGiven')}
                        className="mt-1"
                      />

                      <span>
                        I agree to the{' '}
                        <a
                          href="/privacy-policy"
                          className="underline hover:text-amber-600"
                        >
                          Privacy Policy
                        </a>
                        . *
                      </span>

                    </label>


                    {/* Error */}
                    {status === 'error' && (
                      <p className="text-sm text-red-600">
                        Something went wrong. Please try again.
                      </p>
                    )}


                    {/* Submit */}
                    <button
                      type="submit"
                      className="btn-primary w-full sm:w-auto"
                      disabled={status === 'loading'}
                    >
                      {status === 'loading'
                        ? 'Sending…'
                        : 'Send Message'}
                    </button>

                  </form>

                )}

              </div>

            </div>
          </section>

        </div>

      </section>
    </>
  );
}