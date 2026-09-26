// import { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import api from '../api/api.js';

// const fallback = [
//   {
//     title: 'IGCSE Express Path',
//     slug: 'igcse-express-path',
//     tagline: 'Intensive Track',
//     isLaunchingSoon: false,
//     ctaLabel: 'Enroll Now',
//     overview:
//       'Full IGCSE certification in a single academic year — for strong, self-motivated students.',
//   },
//   {
//     title: 'IGCSE Global Path',
//     slug: 'igcse-global-path',
//     tagline: 'International / Gulf',
//     isLaunchingSoon: false,
//     ctaLabel: 'Enroll Now',
//     overview:
//       'A balanced pace covering the core subjects needed for global university eligibility.',
//   },
//   {
//     title: 'IGCSE National Path',
//     slug: 'igcse-national-path',
//     tagline: 'Pakistani Students',
//     isLaunchingSoon: false,
//     ctaLabel: 'Enroll Now',
//     overview:
//       'The complete subject bouquet for Pakistani-university-recognized equivalence.',
//   },
//   {
//     title: 'IGCSE Foundation Rise',
//     slug: 'igcse-foundation-rise',
//     tagline: 'Ages 10–12',
//     isLaunchingSoon: false,
//     ctaLabel: 'Enroll Now',
//     overview:
//       'A mastery-paced early start, introducing one subject at a time for younger students.',
//   },
// ];

// export default function ProgramCards() {
//   const [programs, setPrograms] = useState(fallback);

//   useEffect(() => {
//     api
//       .get('/programs')
//       .then((res) => {
//         if (res.data?.data?.length) {
//           setPrograms(res.data.data);
//         }
//       })
//       .catch(() => {});
//   }, []);

//   return (
//     <section className="bg-[#F4EEE5]">

//       <div className="container-page py-16 md:py-20">

//         {/* =================================================
//             HEADING
//         ================================================== */}
//         <div className="mx-auto max-w-3xl text-center">

//           <div className="flex items-center justify-center gap-3">

//             <span className="h-px w-8 bg-[#B99A54]" />

//             <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#9B7A35]">
//               Academic Programs
//             </p>

//             <span className="h-px w-8 bg-[#B99A54]" />

//           </div>

//           <h2 className="mt-4 text-3xl font-semibold text-[#54151A] sm:text-4xl">
//             Four pathways. One smart choice.
//           </h2>

//           <p className="mt-4 text-sm leading-6 text-[#6A625E]">
//             Explore our structured academic pathways and find the learning
//             journey that best fits your student's goals.
//           </p>

//         </div>

//         {/* =================================================
//             2 × 2 PROGRAM CARDS
//         ================================================== */}
//         <div className="mt-10 grid gap-6 md:grid-cols-2">

//           {programs.map((p, index) => (

//             <div
//               key={p.slug}
//               className="group relative overflow-hidden rounded-[24px] border border-[#E5D8C7] bg-white p-7 md:p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(74,35,30,0.09)]"
//             >

//               {/* Top row */}
//               <div className="flex items-start justify-between gap-4">

//                 <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F5E8D3] text-sm font-bold text-[#8B2028]">
//                   0{index + 1}
//                 </span>

//                 {p.isLaunchingSoon && (
//                   <span className="rounded-full bg-[#F5E8D3] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#8B2028]">
//                     Launching Soon
//                   </span>
//                 )}

//               </div>

//               {/* Gold divider */}
//               <div className="mt-6 h-px w-10 bg-[#C6A75E]" />

//               {/* Content */}
//               <div className="mt-4">

//                 <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#9B7A35]">
//                   {p.tagline}
//                 </p>

//                 <h3 className="mt-2 text-2xl font-semibold leading-tight text-[#54151A]">
//                   {p.title}
//                 </h3>

//                 <p className="mt-3 max-w-2xl text-sm leading-6 text-[#6A625E]">
//                   {p.overview}
//                 </p>

//               </div>

//               {/* CTA */}
//               <div className="mt-6 flex items-center justify-between">

//                 <Link
//                   to={`/programs/${p.slug}`}
//                   className="inline-flex items-center rounded-xl bg-[#54151A] px-5 py-3 text-sm font-bold text-white transition-all duration-300 hover:bg-[#8B2028]"
//                 >
//                   {p.ctaLabel || 'Explore Program'}
//                   <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
//                     →
//                   </span>
//                 </Link>

//                 <span className="hidden text-xs font-semibold uppercase tracking-wider text-[#C0A15D] sm:block">
//                   0{index + 1} / 04
//                 </span>

//               </div>

//             </div>

//           ))}

//         </div>

//         {/* =================================================
//             VIEW ALL
//         ================================================== */}
//         <div className="mt-10 text-center">

//           <Link
//             to="/programs"
//             className="inline-flex items-center rounded-xl border border-[#54151A] px-6 py-3 text-sm font-semibold text-[#54151A] transition hover:bg-[#54151A] hover:text-white"
//           >
//             Explore All Programs
//             <span className="ml-2">→</span>
//           </Link>

//         </div>

//       </div>

//     </section>
//   );
// }

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/api.js';

import programImage from '../assets/Boy2.png';

const fallback = [
  {
    title: 'IGCSE Express Path',
    slug: 'igcse-express-path',
  },
  {
    title: 'IGCSE Global Path',
    slug: 'igcse-global-path',
  },
  {
    title: 'IGCSE National Path',
    slug: 'igcse-national-path',
  },
  {
    title: 'IGCSE Foundation Rise',
    slug: 'igcse-foundation-rise',
  },
];

export default function ProgramCards() {
  const [programs, setPrograms] = useState(fallback);

  useEffect(() => {
    api
      .get('/programs')
      .then((res) => {
        if (res.data?.data?.length) {
          setPrograms(res.data.data);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section className="bg-[#F4EEE5]">
      <div className="container-page py-16 md:py-20">

        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">

          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-[#B99A54]" />

            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#9B7A35]">
              Academic Programs
            </p>

            <span className="h-px w-8 bg-[#B99A54]" />
          </div>

          <h2 className="mt-4 text-3xl font-semibold text-[#54151A] sm:text-4xl">
            Four pathways. One smart choice.
          </h2>

          <p className="mt-4 text-sm leading-6 text-[#6A625E]">
            Explore our structured academic pathways designed to support
            different learning goals and academic needs.
          </p>

        </div>

        {/* Main Content */}
        <div className="mt-12 grid items-center gap-12 lg:grid-cols-2 lg:gap-20">

          {/* =========================
              IMAGE
          ========================== */}
          <div className="relative">

            <div className="absolute -bottom-3 -right-3 h-full w-full rounded-[24px]" />

            <div className="relative overflow-hidden rounded-[24px]">
              <img
                src={programImage}
                alt="IGCSE academic programs"
                className="h-[380px] w-full object-cover sm:h-[440px]"
              />
            </div>

          </div>

          {/* =========================
              PROGRAM NAMES
          ========================== */}
          <div>

            <div className="divide-y divide-[#D8C9B8]">

              {programs.map((program, index) => (
                <Link
                  key={program.slug}
                  to={`/programs/${program.slug}`}
                  className="group flex items-center justify-between py-6 first:pt-0"
                >

                  <div className="flex items-center gap-5">

                    <span className="text-sm font-semibold text-[#B99A54]">
                      0{index + 1}
                    </span>

                    <h3 className="text-xl font-semibold text-[#54151A] transition-colors duration-300 group-hover:text-[#8B2028] sm:text-xl">
                      {program.title}
                    </h3>

                  </div>

                  <span className="text-xl text-[#B99A54] transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>

                </Link>
              ))}

            </div>

            {/* Explore More */}
            <div className="mt-10">

              <Link
                to="/programs"
                className="inline-flex items-center rounded-xl bg-[#54151A] px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#8B2028]"
              >
                Explore More Programs
                <span className="ml-2">→</span>
              </Link>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}