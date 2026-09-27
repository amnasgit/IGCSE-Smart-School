import { useState } from 'react';
import AdmissionProcess from '../components/AdmissionProcess.jsx';
import api from '../api/api.js';
import admissionImage from '../assets/admissions.png';

const initialState = {
  studentFullName: '',
  dateOfBirth: '',
  gender: '',
  studentEmail: '',
  studentPhone: '',
  fatherName: '',
  fatherEmail: '',
  fatherPhone: '',
  motherName: '',
  motherEmail: '',
  motherPhone: '',
  programOfInterest: '',
  preferredIntakeDate: '',
  currentSchool: '',
  message: '',
  consentGiven: false,
};

/* Small floating icon set for the decorative photo frame */
const IconBook = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M4 5.5C4 4.7 4.7 4 5.5 4H11a2 2 0 0 1 2 2v14a2 2 0 0 0-2-2H4Z" />
    <path d="M20 5.5c0-.8-.7-1.5-1.5-1.5H13a2 2 0 0 0-2 2v14a2 2 0 0 1 2-2h7Z" />
  </svg>
);
const IconCap = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M12 4 2 9l10 5 10-5-10-5Z" />
    <path d="M6 11.5V16c0 1.7 2.7 3 6 3s6-1.3 6-3v-4.5" />
    <path d="M22 9v6" />
  </svg>
);
const IconPencil = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="m14.5 4.5 5 5L8 21l-5.5 1L4 16.5Z" />
    <path d="m13 6 5 5" />
  </svg>
);
const IconGlobe = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <circle cx="12" cy="12" r="9.5" />
    <path d="M2.5 12h19" />
    <path d="M12 2.5c2.8 2.6 4.3 5.9 4.3 9.5s-1.5 6.9-4.3 9.5c-2.8-2.6-4.3-5.9-4.3-9.5S9.2 5.1 12 2.5Z" />
  </svg>
);

export default function Admissions() {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const update = (field) => (e) => {
    const value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value;

    setForm((f) => ({ ...f, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      await api.post('/admissions', {
        ...form,
        recaptchaToken: 'dev-placeholder',
      });

      setStatus('success');
      setForm(initialState);
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
          ADMISSIONS HERO
      ====================================================== */}
        <section className="section pt-16 md:pt-20 lg:pt-36">
          <div className="container-page">

            <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-12">

              {/* LEFT — CONTENT */}
              <div>
                {/* Eyebrow */}
              <div className="mb-4 flex items-center gap-3">

                <span className="h-px w-9 bg-[#B99A54]" />

                <p className="text-s font-bold uppercase tracking-[0.2em] text-[#9B7A35]">
                  Admissions
                </p>

              </div>


                <h1 className="mt-3 text-4xl font-semibold leading-[1.05] text-[#54151A] md:text-5xl">
                  Your admission journey
                  <span className="block text-[#8B2028]">
                    starts here.
                  </span>
                </h1>

                <p className="mt-5 max-w-xl text-base leading-7 text-[#080808] md:text-lg">
                  A simple and transparent path to enrollment. Start your
                  journey by applying to the admission form given below.
                </p>

                {/* =================================================
              ADMISSIONS BADGE
          ================================================== */}

                <div className="mt-6 flex flex-wrap gap-2">

                  <div className="rounded-full border border-[#E5D8C7] bg-yellow-500 px-4 py-2 text-xs font-semibold text-navy">
                    ✓ Simple Process
                  </div>

                  <div className="rounded-full border border-[#E5D8C7] bg-yellow-500 px-4 py-2 text-xs font-semibold text-navy">
                    ✓ Transparent Admissions
                  </div>

                  <div className="rounded-full border border-[#E5D8C7] bg-yellow-500 px-4 py-2 text-xs font-semibold text-navy">
                    ✓ Student-Focused
                  </div>

                </div>

              </div>


              {/* RIGHT — PHOTO */}
              <div className="relative flex items-end justify-center lg:justify-center">

                <div className="relative flex w-full max-w-[430px] flex-col items-center">

                  {/* Decorative water-splash shape behind the photo */}
                  <svg
                    viewBox="0 0 400 400"
                    className="absolute left-1/2 top-1/2 -z-10 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 md:h-[400px] md:w-[400px]"
                    aria-hidden="true"
                  >
                    <path
                      d="M120,42 C178,8 262,18 305,68 C346,116 356,192 322,244 C288,296 226,326 166,314 C104,302 54,260 42,198 C30,136 62,76 120,42 Z"
                      fill="#F6EFE2"
                    />
                    <circle cx="348" cy="58" r="15" fill="#F6EFE2" />
                    <circle cx="372" cy="98" r="7" fill="#F6EFE2" />
                    <circle cx="360" cy="150" r="5" fill="#F6EFE2" />
                    <circle cx="26" cy="312" r="11" fill="#F6EFE2" />
                    <circle cx="52" cy="345" r="6" fill="#F6EFE2" />
                    <circle cx="90" cy="358" r="9" fill="#F6EFE2" />
                    <circle cx="330" cy="320" r="8" fill="#F6EFE2" />
                  </svg>

                  <img
                    src={admissionImage}
                    alt="IGCSE Smart School student"
                    className="h-[300px] w-auto max-w-full object-contain mix-blend-multiply md:h-[340px] lg:h-[350px]"
                  />

                  {/* Maroon Grounding Line */}
                  <div className="mt-[-1px] h-[3px] w-[95%] rounded-full bg-[#7B1820]" />

                  {/* Floating educational icons */}
                  <div
                    className="absolute -right-4 top-2 flex h-11 w-11 items-center justify-center rounded-full bg-white text-navy shadow-lg md:-right-7"
                    style={{ animation: 'floatY 3.4s ease-in-out infinite' }}
                  >
                    <IconBook className="h-5 w-5" />
                  </div>
                  <div
                    className="absolute -left-6 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-amber-600 shadow-lg md:-left-9"
                    style={{ animation: 'floatY 3.8s ease-in-out infinite', animationDelay: '0.6s' }}
                  >
                    <IconCap className="h-5 w-5" />
                  </div>
                  <div
                    className="absolute -right-5 bottom-32 flex h-10 w-10 items-center justify-center rounded-full bg-white text-navy shadow-lg md:-right-8"
                    style={{ animation: 'floatY 3s ease-in-out infinite', animationDelay: '1.1s' }}
                  >
                    <IconPencil className="h-4 w-4" />
                  </div>
                  <div
                    className="absolute -left-3 bottom-6 flex h-11 w-11 items-center justify-center rounded-full bg-white text-amber-600 shadow-lg md:-left-6"
                    style={{ animation: 'floatY 3.6s ease-in-out infinite', animationDelay: '0.3s' }}
                  >
                    <IconGlobe className="h-5 w-5" />
                  </div>

                </div>

              </div>

            </div>

          </div>
        </section>
        <style>{`
          @keyframes floatY {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
        `}</style>

      {/* =====================================================
          ADMISSION PROCESS
      ====================================================== */}
      {/* <section className="section pt-2 md:pt-0.5">
        <div className="container-page">

          <AdmissionProcess />

        </div>
      </section> */}


      {/* =====================================================
          ONLINE APPLICATION
      ====================================================== */}
      <section className="section bg-mist">
        <div className="container-page grid gap-10 lg:grid-cols-3">

          {/* =================================================
              APPLICATION FORM
          ================================================= */}
          <div className="lg:col-span-2">

            <h2 className="text-2xl font-semibold text-navy">
              Online Application Form
            </h2>

            {status === 'success' ? (

              <div className="card mt-6 border-teal-400 bg-teal-50">

                <h3 className="text-lg font-semibold text-teal-600">
                  Application submitted!
                </h3>

                <p className="mt-1 text-sm text-navy-700/80">
                  Thank you for applying. Our admissions team will review your
                  application and be in touch shortly.
                </p>

              </div>

            ) : (

              <form
                onSubmit={handleSubmit}
                className="card mt-6 space-y-6"
              >

                {/* =================================================
                    STUDENT DETAILS
                ================================================== */}
                <fieldset className="grid gap-4 sm:grid-cols-2">

                  <legend className="mb-2 text-sm font-semibold text-navy">
                    Student Details
                  </legend>

                  <div className="sm:col-span-2">

                    <label className="label">
                      Student Full Name *
                    </label>

                    <input
                      required
                      className="input"
                      value={form.studentFullName}
                      onChange={update('studentFullName')}
                    />

                  </div>


                  <div>

                    <label className="label">
                      Date of Birth *
                    </label>

                    <input
                      required
                      type="date"
                      className="input"
                      value={form.dateOfBirth}
                      onChange={update('dateOfBirth')}
                    />

                  </div>


                  <div>

                    <label className="label">
                      Gender *
                    </label>

                    <select
                      required
                      className="input"
                      value={form.gender}
                      onChange={update('gender')}
                    >

                      <option value="">Select</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                      <option>Prefer not to say</option>

                    </select>

                  </div>


                  <div>

                    <label className="label">
                      Student Email
                    </label>

                    <input
                      type="email"
                      className="input"
                      value={form.studentEmail}
                      onChange={update('studentEmail')}
                    />

                  </div>


                  <div>

                    <label className="label">
                      Student Phone / WhatsApp
                    </label>

                    <input
                      className="input"
                      value={form.studentPhone}
                      onChange={update('studentPhone')}
                    />

                  </div>

                </fieldset>


                {/* =================================================
                    PARENT / GUARDIAN DETAILS
                ================================================== */}
                <fieldset className="grid gap-4 sm:grid-cols-2">

                  <legend className="mb-2 text-sm font-semibold text-navy">
                    Parent / Guardian Details
                  </legend>


                  <div>

                    <label className="label">
                      Father's Name
                    </label>

                    <input
                      className="input"
                      value={form.fatherName}
                      onChange={update('fatherName')}
                    />

                  </div>


                  <div>

                    <label className="label">
                      Father's Email
                    </label>

                    <input
                      type="email"
                      className="input"
                      value={form.fatherEmail}
                      onChange={update('fatherEmail')}
                    />

                  </div>


                  <div>

                    <label className="label">
                      Father's Phone / WhatsApp
                    </label>

                    <input
                      className="input"
                      value={form.fatherPhone}
                      onChange={update('fatherPhone')}
                    />

                  </div>


                  <div />


                  <div>

                    <label className="label">
                      Mother's Name
                    </label>

                    <input
                      className="input"
                      value={form.motherName}
                      onChange={update('motherName')}
                    />

                  </div>


                  <div>

                    <label className="label">
                      Mother's Email
                    </label>

                    <input
                      type="email"
                      className="input"
                      value={form.motherEmail}
                      onChange={update('motherEmail')}
                    />

                  </div>


                  <div>

                    <label className="label">
                      Mother's Phone / WhatsApp
                    </label>

                    <input
                      className="input"
                      value={form.motherPhone}
                      onChange={update('motherPhone')}
                    />

                  </div>

                </fieldset>


                {/* =================================================
                    PROGRAM & ADDITIONAL INFO
                ================================================== */}
                <fieldset className="grid gap-4 sm:grid-cols-2">

                  <legend className="mb-2 text-sm font-semibold text-navy">
                    Program &amp; Additional Info
                  </legend>


                  <div>

                    <label className="label">
                      Program of Interest *
                    </label>

                    <select
                      required
                      className="input"
                      value={form.programOfInterest}
                      onChange={update('programOfInterest')}
                    >

                      <option value="">
                        Select a program
                      </option>

                      <option>
                        IGCSE Express Path
                      </option>

                      <option>
                        IGCSE Global Path
                      </option>

                      <option>
                        IGCSE National Path
                      </option>

                      <option>
                        IGCSE Foundation Rise
                      </option>

                    </select>

                  </div>


                  <div>

                    <label className="label">
                      Preferred Intake Date
                    </label>

                    <input
                      type="date"
                      className="input"
                      value={form.preferredIntakeDate}
                      onChange={update('preferredIntakeDate')}
                    />

                  </div>


                  <div className="sm:col-span-2">

                    <label className="label">
                      Current School / Previous Education
                    </label>

                    <input
                      className="input"
                      value={form.currentSchool}
                      onChange={update('currentSchool')}
                    />

                  </div>


                  <div className="sm:col-span-2">

                    <label className="label">
                      Message / Additional Notes
                    </label>

                    <textarea
                      rows={4}
                      className="input"
                      value={form.message}
                      onChange={update('message')}
                    />

                  </div>

                </fieldset>


                {/* =================================================
                    CONSENT
                ================================================== */}
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
                      className="underline"
                    >
                      Privacy Policy
                    </a>{' '}
                    and consent to the processing of this data. *
                  </span>

                </label>


                {/* Error */}
                {status === 'error' && (
                  <p className="text-sm text-red-600">
                    {errorMsg}
                  </p>
                )}


                {/* Submit */}
                <button
                  type="submit"
                  className="btn-primary w-full sm:w-auto"
                  disabled={status === 'loading'}
                >

                  {status === 'loading'
                    ? 'Submitting…'
                    : 'Submit Application'}

                </button>

              </form>

            )}

          </div>


          {/* =================================================
              WHATSAPP SIDEBAR
          ================================================== */}
          <aside className="card h-fit">

            <h3 className="text-lg font-semibold text-navy">
              Prefer WhatsApp?
            </h3>

            <p className="mt-2 text-sm text-navy-700/80">
              Start your application instantly by chatting with our
              admissions team.
            </p>

            <a
              href="https://wa.me/10000000000?text=Hi%2C%20I%27d%20like%20to%20apply%20to%20IGCSE%20Smart%20School"
              target="_blank"
              rel="noreferrer"
              className="btn-secondary mt-4 w-full text-sm"
            >
              Apply via WhatsApp
            </a>


            <div className="mt-6 border-t border-navy-100 pt-4">

              <span className="badge">
                📌 Admissions Open
              </span>

              <p className="mt-2 text-xs text-navy-700/70">
                Next intake dates are updated regularly — contact admissions
                for the latest deadlines.
              </p>

            </div>

          </aside>

        </div>
      </section>
    </>
  );
}