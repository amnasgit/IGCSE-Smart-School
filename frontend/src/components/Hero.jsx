import { Link } from 'react-router-dom';
import heroPhoto from '../assets/hero-photo.jpg';
import schoolIcon from '../assets/logo1.png';

/* =========================
   ICONS
========================= */

const IconMonitor = (p) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...p}
  >
    <rect x="2.5" y="4.5" width="19" height="13" rx="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17.5" x2="12" y2="21" />
  </svg>
);

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

const IconShield = (p) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...p}
  >
    <path d="M12 2.5 4 6v6c0 5 3.4 8.4 8 9.5 4.6-1.1 8-4.5 8-9.5V6l-8-3.5Z" />
    <path d="m9 12 2 2 4-4.2" />
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


/* =========================
   QUICK FEATURES
========================= */

const quickFeatures = [
  {
    Icon: IconMonitor,
    title: 'Live Classes',
    desc: 'Interactive & Engaging',
  },
  {
    Icon: IconBook,
    title: 'Expert Teachers',
    desc: 'Qualified & Experienced',
  },
  {
    Icon: IconShield,
    title: 'Safe & Secure',
    desc: 'Trusted Learning',
  },
];


/* =========================
   DIAGONAL SEAM
========================= */

const SEAM_LEFT_PERCENT = 58;
const SEAM_BOTTOM_PERCENT = 38;


/* =========================
   HERO
========================= */

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-navy-700">

      {/* =====================================================
          FULL-BLEED DIAGONAL PHOTO
      ====================================================== */}

      <div
        className="absolute inset-y-0 right-0 hidden lg:block"
        style={{
          left: `${SEAM_BOTTOM_PERCENT}%`,
          clipPath: `polygon(
            ${((SEAM_LEFT_PERCENT - SEAM_BOTTOM_PERCENT) /
              (100 - SEAM_BOTTOM_PERCENT)) *
              100}% 0%,
            100% 0%,
            100% 100%,
            0% 100%
          )`,
        }}
      >
        <img
          src={heroPhoto}
          alt="Student learning online with IGCSE Smart School"
          className="h-full w-full object-cover"
        />

        {/* Soft blend on image edge */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(100deg, #3B0407 0%, rgba(59,4,7,0.92) 8%, rgba(59,4,7,0.6) 18%, rgba(59,4,7,0.25) 30%, transparent 44%)',
          }}
        />
      </div>


      {/* =====================================================
          DECORATIVE BACKGROUND
      ====================================================== */}

      {/* <svg
        className="pointer-events-none absolute -left-16 -top-10 h-[320px] w-[320px] opacity-[0.06]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#F2BE5A"
        strokeWidth="0.6"
        aria-hidden="true"
      >
        <path d="M12 2.5 4 6v6c0 5 3.4 8.4 8 9.5 4.6-1.1 8-4.5 8-9.5V6l-8-3.5Z" />
      </svg> */}


      {/* Background glow */}

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 700px 600px at 8% 92%, rgba(88,6,10,0.55), transparent 60%)',
        }}
        aria-hidden="true"
      />


      {/* =====================================================
          GOLD DIAGONAL LINE
      ====================================================== */}

      <svg
        className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="seamGold" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="0%"
              stopColor="#F2BE5A"
              stopOpacity="0"
            />

            <stop
              offset="15%"
              stopColor="#F2BE5A"
              stopOpacity="0.9"
            />

            <stop
              offset="85%"
              stopColor="#F2BE5A"
              stopOpacity="0.9"
            />

            <stop
              offset="100%"
              stopColor="#F2BE5A"
              stopOpacity="0"
            />
          </linearGradient>
        </defs>

        <line
          x1={`${SEAM_LEFT_PERCENT}%`}
          y1="0%"
          x2={`${SEAM_BOTTOM_PERCENT}%`}
          y2="100%"
          stroke="url(#seamGold)"
          strokeWidth="2"
        />
      </svg>


      {/* Small glowing dot */}

      <div
        className="pointer-events-none absolute hidden h-2.5 w-2.5 rounded-full lg:block"
        style={{
          left: `${SEAM_LEFT_PERCENT}%`,
          top: '16%',
          background: '#FDE9B8',
          boxShadow:
            '0 0 16px 6px rgba(253,233,184,0.85)',
        }}
        aria-hidden="true"
      />


      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <div
        className="
          relative
          mx-auto
          flex
          min-h-screen
          w-full
          max-w-5xl
          items-center
          pl-2
          pr-4
          sm:pl-3
          sm:pr-6
        "
      >

        <div className="max-w-lg translate-y-6 sm:translate-y-6 lg:translate-y-3">

          {/* =================================================
              SCHOOL LOGO / ICON
          ================================================== */}

          <img
            src={schoolIcon}
            alt="IGCSE Smart School Logo"
            className="
              mb-1
              h-24
              w-24
              object-contain
            "
          />


          {/* =================================================
              MAIN HEADING
          ================================================== */}

          <h1
            className="
              mt-3
              font-display
              text-2xl
              font-bold
              uppercase
              leading-tight
              text-white
              sm:text-3xl
            "
          >
            IGCSE Smart School
          </h1>


          {/* =================================================
              TAGLINE
          ================================================== */}

          <p
            className="
              mt-0.5
              font-display
              text-xl
              font-bold
              leading-tight
              text-white
              sm:text-xl
            "
          >
            Learn Anytime.
          </p>


          <p
            className="
              font-display
              text-xl
              font-bold
              leading-tight
              text-amber-400
              sm:text-xl
            "
          >
            Achieve Anywhere.
          </p>


          {/* =================================================
              DESCRIPTION
          ================================================== */}

          <p
            className="
              mt-3
              max-w-sm
              text-sm
              text-white/75
            "
          >
            A modern online school offering flexible,
            high-quality IGCSE education designed for
            academic success.
          </p>


          {/* =================================================
              BUTTONS
          ================================================== */}

          <div className="mt-5 flex flex-wrap gap-3">

            <Link
              to="/admissions"
              className="btn-primary gap-1.5"
            >
              Apply Now

              <span aria-hidden="true">
                →
              </span>
            </Link>


            <Link
              to="/programs"
              className="
                inline-flex
                items-center
                gap-1.5
                rounded-full
                border-2
                border-amber-400
                px-5
                py-2.5
                text-sm
                font-semibold
                text-white
                transition
                hover:bg-amber-400
                hover:text-navy-900
              "
            >
              Explore Programs

              <span aria-hidden="true">
                →
              </span>
            </Link>

          </div>


          {/* =================================================
              MOBILE / TABLET IMAGE
          ================================================== */}

          <div
            className="
              mt-6
              overflow-hidden
              rounded-2xl
              shadow-xl
              lg:hidden
            "
          >
            <img
              src={heroPhoto}
              alt="Student learning online with IGCSE Smart School"
              className="
                h-48
                w-full
                object-cover
                sm:h-64
              "
            />
          </div>


          {/* =================================================
              QUICK FEATURES
          ================================================== */}

          <div
            className="
              mt-6
              grid
              grid-cols-2
              gap-x-4
              gap-y-3
              sm:grid-cols-3
            "
          >

            {quickFeatures.map(
              ({ Icon, title, desc }) => (
                <div key={title}>

                  <Icon
                    className="
                      h-5
                      w-5
                      text-amber-400
                    "
                  />

                  <p
                    className="
                      mt-1
                      text-xs
                      font-semibold
                      text-white
                    "
                  >
                    {title}
                  </p>

                  <p
                    className="
                      text-[11px]
                      text-white/60
                    "
                  >
                    {desc}
                  </p>

                </div>
              )
            )}

          </div>

        </div>

      </div>

    </section>
  );
}