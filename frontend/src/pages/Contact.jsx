import { useState } from 'react';
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
    <main className="overflow-x-hidden">
      {/* =========================================
          TOP SPACING
      ========================================= */}
      <div className="h-24 sm:h-20 md:h-16" />

      {/* =========================================
          CONTACT SECTION
      ========================================= */}
      <section className="relative overflow-hidden">

        {/* =========================================
            CONTACT BACKGROUND IMAGE
        ========================================= */}
        <div
          className="
            pointer-events-none
            absolute
            -top-8
            right-0
            left-0
            h-[calc(100%+2rem)]
            overflow-hidden
            sm:-top-12
            sm:h-[calc(100%+3rem)]
            md:-top-16
            md:h-[calc(100%+4rem)]
          "
        >
          <img
            src={contactPhoto}
            alt=""
            aria-hidden="true"
            className="
              absolute
              inset-0
              h-full
              w-full
              max-w-none
              object-cover
              object-[68%_center]
              opacity-[0.10]
              sm:object-[65%_center]
              sm:opacity-[0.16]
              md:object-center
              md:opacity-[0.22]
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

          {/* Mobile extra fade */}
          <div
            className="absolute inset-0 sm:hidden"
            style={{
              background:
                'linear-gradient(to right, #fbf8f3 0%, rgba(251,248,243,0.90) 48%, rgba(251,248,243,0.45) 75%, rgba(251,248,243,0.15) 100%)',
            }}
          />

          {/* Bottom blend */}
          <div
            className="absolute inset-x-0 bottom-0 h-24 sm:h-32"
            style={{
              background:
                'linear-gradient(to top, #fbf8f3, transparent)',
            }}
          />
        </div>

        {/* =========================================
            CONTENT
        ========================================= */}
        <div className="relative z-10 min-w-0">

          {/* =========================================
              CONTACT INTRO
          ========================================= */}
          <section className="section pb-6 sm:pb-8">
            <div className="container-page min-w-0">

              {/* Eyebrow */}
              <div className="mb-4 flex items-center gap-3">

                <span className="h-px w-9 bg-[#B99A54]" />

                <p className="text-s font-bold uppercase tracking-[0.2em] text-[#9B7A35]">
                  Contact
                </p>

              </div>

              <h1
                className="
                  mt-2
                  max-w-3xl
                  text-3xl
                  font-semibold
                  leading-tight
                  text-navy
                  sm:text-4xl
                "
              >
                We'd love to hear from you.
              </h1>

              <p
                className="
                  mt-3
                  max-w-2xl
                  text-sm
                  leading-6
                  text-navy-700/80
                  sm:text-base
                  sm:leading-7
                "
              >
                Have a question about admissions, programs, or online
                learning? Get in touch with our team and we'll be happy
                to help.
              </p>

            </div>
          </section>

          {/* =========================================
              CONTACT FORM
          ========================================= */}
          <section className="section pt-2 sm:pt-4">
            <div className="container-page min-w-0">

              <div className="w-full max-w-3xl min-w-0">

                {status === 'success' ? (

                  <div className="card w-full min-w-0 border-teal-400 bg-teal-50">
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
                      w-full
                      min-w-0
                      space-y-4
                      overflow-hidden
                      bg-white/95
                      backdrop-blur-sm
                      shadow-lg
                    "
                  >

                    {/* =========================================
                        NAME + EMAIL + PHONE + SUBJECT
                    ========================================= */}
                    <div
                      className="
                        grid
                        min-w-0
                        grid-cols-1
                        gap-4
                        sm:grid-cols-2
                      "
                    >

                      {/* Name */}
                      <div className="min-w-0">
                        <label className="label">
                          Name *
                        </label>

                        <input
                          required
                          type="text"
                          className="input w-full min-w-0 max-w-full"
                          value={form.name}
                          onChange={update('name')}
                        />
                      </div>

                      {/* Email */}
                      <div className="min-w-0">
                        <label className="label">
                          Email *
                        </label>

                        <input
                          required
                          type="email"
                          className="input w-full min-w-0 max-w-full"
                          value={form.email}
                          onChange={update('email')}
                        />
                      </div>

                      {/* Phone */}
                      <div className="min-w-0">
                        <label className="label">
                          Phone *
                        </label>

                        <input
                          required
                          type="tel"
                          className="input w-full min-w-0 max-w-full"
                          value={form.phone}
                          onChange={update('phone')}
                        />
                      </div>

                      {/* Subject */}
                      <div className="min-w-0">
                        <label className="label">
                          Subject / Reason
                        </label>

                        <select
                          className="input w-full min-w-0 max-w-full"
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

                    {/* =========================================
                        MESSAGE
                    ========================================= */}
                    <div className="min-w-0">
                      <label className="label">
                        Message *
                      </label>

                      <textarea
                        required
                        rows={5}
                        className="
                          input
                          w-full
                          min-w-0
                          max-w-full
                          resize-y
                        "
                        value={form.message}
                        onChange={update('message')}
                      />
                    </div>

                    {/* =========================================
                        PRIVACY CONSENT
                    ========================================= */}
                    <label
                      className="
                        flex
                        min-w-0
                        items-start
                        gap-2
                        text-sm
                        leading-5
                        text-navy-700/90
                      "
                    >
                      <input
                        required
                        type="checkbox"
                        checked={form.consentGiven}
                        onChange={update('consentGiven')}
                        className="mt-1 shrink-0"
                      />

                      <span className="min-w-0">
                        I agree to the{' '}
                        <a
                          href="/privacy-policy"
                          className="underline transition-colors hover:text-amber-600"
                        >
                          Privacy Policy
                        </a>
                        . *
                      </span>
                    </label>

                    {/* =========================================
                        ERROR
                    ========================================= */}
                    {status === 'error' && (
                      <p className="text-sm text-red-600">
                        Something went wrong. Please try again.
                      </p>
                    )}

                    {/* =========================================
                        SUBMIT
                    ========================================= */}
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
    </main>
  );
}