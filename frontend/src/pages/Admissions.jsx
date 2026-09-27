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

/* =========================================================
   DECORATIVE EDUCATIONAL ICONS
========================================================= */

const IconBook = (p) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...p}
  >
    <path d="M4 5.5C4 4.7 4.7 4 5.5 4H11a2 2 0 0 1 2 2v14a2 2 0 0 0-2-2H4Z" />
    <path d="M20 5.5c0-.8-.7-1.5-1.5-1.5H13a2 2 0 0 0-2 2v14a2 2 0 0 1 2-2h7Z" />
  </svg>
);

const IconCap = (p) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...p}
  >
    <path d="M12 4 2 9l10 5 10-5-10-5Z" />
    <path d="M6 11.5V16c0 1.7 2.7 3 6 3s6-1.3 6-3v-4.5" />
    <path d="M22 9v6" />
  </svg>
);

const IconPencil = (p) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...p}
  >
    <path d="m14.5 4.5 5 5L8 21l-5.5 1L4 16.5Z" />
    <path d="m13 6 5 5" />
  </svg>
);

const IconGlobe = (p) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...p}
  >
    <circle cx="12" cy="12" r="9.5" />
    <path d="M2.5 12h19" />
    <path d="M12 2.5c2.8 2.6 4.3 5.9 4.3 9.5s-1.5 6.9-4.3 9.5c-2.8-2.6-4.3-6.9-4.3-9.5S9.2 5.1 12 2.5Z" />
  </svg>
);

export default function Admissions() {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const update = (field) => (e) => {
    const value =
      e.target.type === 'checkbox'
        ? e.target.checked
        : e.target.value;

    setForm((f) => ({
      ...f,
      [field]: value,
    }));
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

      <section
        className="
          section
          relative
          overflow-x-clip
          pt-28
          sm:pt-32
          md:pt-32
          lg:pt-36
        "
      >
        <div className="container-page">
          <div
            className="
              grid
              items-center
              gap-8
              lg:grid-cols-2
              lg:gap-12
            "
          >
            {/* =================================================
                LEFT — CONTENT
            ================================================= */}

            <div
              className="
                relative
                z-10
                min-w-0
                pt-12
                sm:pt-10
                md:pt-8
                lg:pt-0
              "
            >
              {/* Eyebrow */}

              <div className="mb-4 flex items-center gap-3">
                <span className="h-px w-7 shrink-0 bg-[#B99A54] sm:w-9" />

                <p
                  className="
                    text-xs
                    font-bold
                    uppercase
                    tracking-[0.16em]
                    text-[#9B7A35]
                    sm:text-sm
                    sm:tracking-[0.2em]
                  "
                >
                  Admissions
                </p>
              </div>

              {/* Heading */}

              <h1
                className="
                  max-w-2xl
                  text-3xl
                  font-semibold
                  leading-[1.08]
                  text-[#54151A]
                  sm:text-4xl
                  md:text-5xl
                "
              >
                Your admission journey
                <span className="block text-[#8B2028]">
                  starts here.
                </span>
              </h1>

              {/* Description */}

              <p
                className="
                  mt-5
                  max-w-xl
                  text-sm
                  leading-6
                  text-[#080808]
                  sm:text-base
                  sm:leading-7
                  md:text-lg
                "
              >
                A simple and transparent path to enrollment. Start your
                journey by applying to the admission form given below.
              </p>

              {/* =================================================
                  ADMISSIONS BADGES
              ================================================== */}

              <div className="mt-6 flex max-w-xl flex-wrap gap-2">
                <div
                  className="
                    rounded-full
                    border
                    border-[#E5D8C7]
                    bg-yellow-500
                    px-3
                    py-2
                    text-[11px]
                    font-semibold
                    text-navy
                    sm:px-4
                    sm:text-xs
                  "
                >
                  ✓ Simple Process
                </div>

                <div
                  className="
                    rounded-full
                    border
                    border-[#E5D8C7]
                    bg-yellow-500
                    px-3
                    py-2
                    text-[11px]
                    font-semibold
                    text-navy
                    sm:px-4
                    sm:text-xs
                  "
                >
                  ✓ Transparent Admissions
                </div>

                <div
                  className="
                    rounded-full
                    border
                    border-[#E5D8C7]
                    bg-yellow-500
                    px-3
                    py-2
                    text-[11px]
                    font-semibold
                    text-navy
                    sm:px-4
                    sm:text-xs
                  "
                >
                  ✓ Student-Focused
                </div>
              </div>
            </div>

            {/* =================================================
                RIGHT — PHOTO
            ================================================= */}

            <div
              className="
                relative
                flex
                min-w-0
                items-end
                justify-center
                lg:justify-center
              "
            >
              <div
                className="
                  relative
                  flex
                  w-full
                  max-w-[430px]
                  flex-col
                  items-center
                "
              >
                {/* Decorative water-splash shape */}

                <svg
                  viewBox="0 0 400 400"
                  className="
                    pointer-events-none
                    absolute
                    left-1/2
                    top-1/2
                    -z-10
                    h-[250px]
                    w-[250px]
                    -translate-x-1/2
                    -translate-y-1/2
                    sm:h-[320px]
                    sm:w-[320px]
                    md:h-[390px]
                    md:w-[390px]
                  "
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

                {/* Main Image */}

                <img
                  src={admissionImage}
                  alt="IGCSE Smart School student"
                  className="
                    h-[250px]
                    w-auto
                    max-w-[86%]
                    object-contain
                    mix-blend-multiply
                    sm:h-[300px]
                    sm:max-w-[90%]
                    md:h-[340px]
                    lg:h-[350px]
                  "
                />

                {/* Maroon Grounding Line */}

                <div
                  className="
                    mt-[-1px]
                    h-[3px]
                    w-[84%]
                    rounded-full
                    bg-[#7B1820]
                    sm:w-[92%]
                    md:w-[95%]
                  "
                />

                {/* =================================================
                    FLOATING ICONS
                ================================================== */}

                {/* Book */}

                <div
                  className="
                    absolute
                    right-1
                    top-1
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-full
                    bg-white
                    text-navy
                    shadow-lg
                    sm:right-0
                    sm:top-2
                    sm:h-11
                    sm:w-11
                    md:-right-5
                  "
                  style={{
                    animation: 'floatY 3.4s ease-in-out infinite',
                  }}
                >
                  <IconBook className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>

                {/* Graduation Cap */}

                <div
                  className="
                    absolute
                    left-1
                    top-1/2
                    flex
                    h-10
                    w-10
                    -translate-y-1/2
                    items-center
                    justify-center
                    rounded-full
                    bg-white
                    text-amber-600
                    shadow-lg
                    sm:left-0
                    sm:h-12
                    sm:w-12
                    md:-left-5
                  "
                  style={{
                    animation: 'floatY 3.8s ease-in-out infinite',
                    animationDelay: '0.6s',
                  }}
                >
                  <IconCap className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>

                {/* Pencil */}

                <div
                  className="
                    absolute
                    right-1
                    bottom-24
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-full
                    bg-white
                    text-navy
                    shadow-lg
                    sm:right-0
                    sm:bottom-28
                    sm:h-10
                    sm:w-10
                    md:-right-5
                    md:bottom-32
                  "
                  style={{
                    animation: 'floatY 3s ease-in-out infinite',
                    animationDelay: '1.1s',
                  }}
                >
                  <IconPencil className="h-4 w-4" />
                </div>

                {/* Globe */}

                <div
                  className="
                    absolute
                    left-1
                    bottom-3
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-full
                    bg-white
                    text-amber-600
                    shadow-lg
                    sm:left-0
                    sm:bottom-5
                    sm:h-11
                    sm:w-11
                    md:-left-5
                    md:bottom-6
                  "
                  style={{
                    animation: 'floatY 3.6s ease-in-out infinite',
                    animationDelay: '0.3s',
                  }}
                >
                  <IconGlobe className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          FLOATING ICON ANIMATION
      ====================================================== */}

      <style>{`
        @keyframes floatY {
          0%, 100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>

      {/* =====================================================
          ADMISSION PROCESS
      ====================================================== */}

      {/*
      <section className="section pt-2 md:pt-0.5">
        <div className="container-page">
          <AdmissionProcess />
        </div>
      </section>
      */}

      {/* =====================================================
          ONLINE APPLICATION
      ====================================================== */}

      <section className="section overflow-x-clip bg-mist">
        <div
          className="
            container-page
            grid
            min-w-0
            gap-8
            lg:grid-cols-3
            lg:gap-10
          "
        >
          {/* =================================================
              APPLICATION FORM
          ================================================= */}

          <div className="min-w-0 lg:col-span-2">
            <h2 className="text-xl font-semibold text-navy sm:text-2xl">
              Online Application Form
            </h2>

            {/* SUCCESS MESSAGE */}

            {status === 'success' ? (
              <div className="card mt-6 border-teal-400 bg-teal-50">
                <h3 className="text-lg font-semibold text-teal-600">
                  Application submitted!
                </h3>

                <p className="mt-1 text-sm leading-6 text-navy-700/80">
                  Thank you for applying. Our admissions team will review
                  your application and be in touch shortly.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="
                  card
                  mt-6
                  min-w-0
                  space-y-6
                  overflow-hidden
                  p-4
                  sm:p-6
                "
              >
                {/* =================================================
                    STUDENT DETAILS
                ================================================== */}

                <fieldset className="grid min-w-0 gap-4 sm:grid-cols-2">
                  <legend className="mb-2 text-sm font-semibold text-navy">
                    Student Details
                  </legend>

                  <div className="min-w-0 sm:col-span-2">
                    <label className="label">
                      Student Full Name *
                    </label>

                    <input
                      required
                      type="text"
                      className="input w-full min-w-0 max-w-full"
                      value={form.studentFullName}
                      onChange={update('studentFullName')}
                    />
                  </div>

                  <div className="min-w-0">
                    <label className="label">
                      Date of Birth *
                    </label>

                    <input
                      required
                      type="date"
                      className="input w-full min-w-0 max-w-full"
                      value={form.dateOfBirth}
                      onChange={update('dateOfBirth')}
                    />
                  </div>

                  <div className="min-w-0">
                    <label className="label">
                      Gender *
                    </label>

                    <select
                      required
                      className="input w-full min-w-0 max-w-full"
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

                  <div className="min-w-0">
                    <label className="label">
                      Student Email
                    </label>

                    <input
                      type="email"
                      className="input w-full min-w-0 max-w-full"
                      value={form.studentEmail}
                      onChange={update('studentEmail')}
                    />
                  </div>

                  <div className="min-w-0">
                    <label className="label">
                      Student Phone / WhatsApp
                    </label>

                    <input
                      type="tel"
                      className="input w-full min-w-0 max-w-full"
                      value={form.studentPhone}
                      onChange={update('studentPhone')}
                    />
                  </div>
                </fieldset>

                {/* =================================================
                    PARENT / GUARDIAN DETAILS
                ================================================== */}

                <fieldset className="grid min-w-0 gap-4 sm:grid-cols-2">
                  <legend className="mb-2 text-sm font-semibold text-navy">
                    Parent / Guardian Details
                  </legend>

                  <div className="min-w-0">
                    <label className="label">
                      Father's Name
                    </label>

                    <input
                      type="text"
                      className="input w-full min-w-0 max-w-full"
                      value={form.fatherName}
                      onChange={update('fatherName')}
                    />
                  </div>

                  <div className="min-w-0">
                    <label className="label">
                      Father's Email
                    </label>

                    <input
                      type="email"
                      className="input w-full min-w-0 max-w-full"
                      value={form.fatherEmail}
                      onChange={update('fatherEmail')}
                    />
                  </div>

                  <div className="min-w-0">
                    <label className="label">
                      Father's Phone / WhatsApp
                    </label>

                    <input
                      type="tel"
                      className="input w-full min-w-0 max-w-full"
                      value={form.fatherPhone}
                      onChange={update('fatherPhone')}
                    />
                  </div>

                  <div className="hidden sm:block" />

                  <div className="min-w-0">
                    <label className="label">
                      Mother's Name
                    </label>

                    <input
                      type="text"
                      className="input w-full min-w-0 max-w-full"
                      value={form.motherName}
                      onChange={update('motherName')}
                    />
                  </div>

                  <div className="min-w-0">
                    <label className="label">
                      Mother's Email
                    </label>

                    <input
                      type="email"
                      className="input w-full min-w-0 max-w-full"
                      value={form.motherEmail}
                      onChange={update('motherEmail')}
                    />
                  </div>

                  <div className="min-w-0">
                    <label className="label">
                      Mother's Phone / WhatsApp
                    </label>

                    <input
                      type="tel"
                      className="input w-full min-w-0 max-w-full"
                      value={form.motherPhone}
                      onChange={update('motherPhone')}
                    />
                  </div>
                </fieldset>

                {/* =================================================
                    PROGRAM & ADDITIONAL INFO
                ================================================== */}

                <fieldset className="grid min-w-0 gap-4 sm:grid-cols-2">
                  <legend className="mb-2 text-sm font-semibold text-navy">
                    Program &amp; Additional Info
                  </legend>

                  <div className="min-w-0">
                    <label className="label">
                      Program of Interest *
                    </label>

                    <select
                      required
                      className="input w-full min-w-0 max-w-full"
                      value={form.programOfInterest}
                      onChange={update('programOfInterest')}
                    >
                      <option value="">
                        Select a program
                      </option>

                      <option>IGCSE Express Path</option>
                      <option>IGCSE Global Path</option>
                      <option>IGCSE National Path</option>
                      <option>IGCSE Foundation Rise</option>
                    </select>
                  </div>

                  <div className="min-w-0">
                    <label className="label">
                      Preferred Intake Date
                    </label>

                    <input
                      type="date"
                      className="input w-full min-w-0 max-w-full"
                      value={form.preferredIntakeDate}
                      onChange={update('preferredIntakeDate')}
                    />
                  </div>

                  <div className="min-w-0 sm:col-span-2">
                    <label className="label">
                      Current School / Previous Education
                    </label>

                    <input
                      type="text"
                      className="input w-full min-w-0 max-w-full"
                      value={form.currentSchool}
                      onChange={update('currentSchool')}
                    />
                  </div>

                  <div className="min-w-0 sm:col-span-2">
                    <label className="label">
                      Message / Additional Notes
                    </label>

                    <textarea
                      rows={4}
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
                </fieldset>

                {/* =================================================
                    CONSENT
                ================================================== */}

                <label
                  className="
                    flex
                    min-w-0
                    items-start
                    gap-2
                    text-sm
                    leading-6
                    text-navy-700/90
                  "
                >
                  <input
                    required
                    type="checkbox"
                    checked={form.consentGiven}
                    onChange={update('consentGiven')}
                    className="mt-1 h-4 w-4 shrink-0"
                  />

                  <span className="min-w-0 break-words">
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

                {/* ERROR */}

                {status === 'error' && (
                  <p className="break-words text-sm text-red-600">
                    {errorMsg}
                  </p>
                )}

                {/* SUBMIT */}

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
          ================================================= */}

          <aside className="card h-fit min-w-0">
            <h3 className="text-lg font-semibold text-navy">
              Prefer WhatsApp?
            </h3>

            <p className="mt-2 text-sm leading-6 text-navy-700/80">
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

              <p className="mt-2 text-xs leading-5 text-navy-700/70">
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