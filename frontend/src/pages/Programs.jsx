import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/api.js';
import programImage from '../assets/Programs.png';

const fallback = [
  {
    title: 'IGCSE Express Path',
    slug: 'igcse-express-path',
    tagline: 'Intensive Track',
    isLaunchingSoon: false,
    overview:
      'An intensive, high-pace track for strong or older students — full IGCSE certification in a single academic year.',
    quickFacts: [
      { label: 'Duration', value: '1 Academic Year' },
      { label: 'Exam Sessions', value: '2 Sessions' },
      { label: 'Study Pace', value: 'Intensive' },
      { label: 'Ideal For', value: 'Strong / Older Students' },
    ],
  },
  {
    title: 'IGCSE Global Path',
    slug: 'igcse-global-path',
    tagline: 'International / Gulf',
    isLaunchingSoon: false,
    overview:
      'A balanced-pace track for international and Gulf-based students, covering core subjects for global university eligibility.',
    quickFacts: [
      { label: 'Study Pace', value: 'Balanced' },
      { label: 'Students', value: 'International / Gulf' },
      { label: 'Focus', value: 'Core Subjects' },
      { label: 'Goal', value: 'Global University Eligibility' },
    ],
  },
  {
    title: 'IGCSE National Path',
    slug: 'igcse-national-path',
    tagline: 'Pakistani Students',
    isLaunchingSoon: false,
    overview:
      'The complete subject bouquet for Pakistani-university-recognized equivalence, including Urdu, Pakistan Studies, and Islamic Studies.',
    quickFacts: [
      { label: 'Students', value: 'Pakistani Students' },
      { label: 'Subjects', value: 'Complete Subject Set' },
      { label: 'Includes', value: 'Urdu & Pakistan Studies' },
      { label: 'Focus', value: 'Local Equivalence' },
    ],
  },
  {
    title: 'IGCSE Foundation Rise',
    slug: 'igcse-foundation-rise',
    tagline: 'Ages 10–12',
    isLaunchingSoon: false,
    overview:
      'A mastery-paced early-start track for younger students, introducing one subject at a time as confidence builds.',
    quickFacts: [
      { label: 'Age Group', value: '10–12 Years' },
      { label: 'Study Pace', value: 'Mastery-Paced' },
      { label: 'Approach', value: 'One Subject at a Time' },
      { label: 'Focus', value: 'Confidence Building' },
    ],
  },
];

function ProgramFlipCard({ program, index }) {
  return (
    <div className="group h-[310px] [perspective:1200px]">
      <div className="relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        <div className="absolute inset-0 flex h-full w-full flex-col overflow-hidden rounded-[24px] border border-[#E8DDCE] bg-white p-7 shadow-[0_12px_35px_rgba(74,35,30,0.07)] [backface-visibility:hidden]">
          <div className="flex items-center justify-between">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F5E8D3] text-sm font-bold text-[#8B2028]">
              0{index + 1}
            </span>

            {program.isLaunchingSoon && (
              <span className="rounded-full bg-[#F6E8D7] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#8B2028]">
                Launching Soon
              </span>
            )}
          </div>

          <div className="mt-6 h-px w-10 shrink-0 bg-[#C6A75E]" />

          <p className="mt-4 text-xs font-bold uppercase tracking-[0.18em] text-[#9B7A35]">
            {program.tagline}
          </p>

          <h3 className="mt-2 text-2xl font-semibold leading-tight text-[#54151A]">
            {program.title}
          </h3>

          <p className="mt-3 text-sm leading-6 text-[#6A625E]">
            {program.overview}
          </p>
        </div>

        <div className="absolute inset-0 flex h-full w-full flex-col overflow-hidden rounded-[24px] bg-[#54151A] p-6 [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <div className="flex items-center justify-between">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-sm font-bold text-[#E7C45E]">
              0{index + 1}
            </span>

            <span className="text-[10px] font-semibold uppercase tracking-wider text-[#DDBE70]">
              Quick Overview
            </span>
          </div>

          <div className="mt-4 h-px w-9 bg-[#E7C45E]" />

          <h3 className="mt-3 text-xl font-semibold leading-tight text-white">
            {program.title}
          </h3>

          <div className="mt-3 grid grid-cols-2 gap-2.5">
            {(program.quickFacts || [
              { label: 'Duration', value: 'To be updated' },
              { label: 'Study Pace', value: 'To be updated' },
              { label: 'Ideal For', value: 'To be updated' },
              { label: 'Focus', value: 'To be updated' },
            ]).map((fact, factIndex) => (
              <div
                key={factIndex}
                className="min-h-[55px] rounded-lg bg-white/10 px-3 py-2"
              >
                <p className="text-[8px] font-bold uppercase tracking-wider text-[#DDBE70]">
                  {fact.label}
                </p>

                <p className="mt-0.5 text-[11px] font-semibold leading-4 text-white">
                  {fact.value}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-auto pt-3">
            <Link
              to={`/programs/${program.slug}`}
              className="inline-flex w-full items-center justify-center rounded-lg bg-[#EBC05A] px-4 py-2.5 text-xs font-bold text-[#54151A] transition hover:bg-[#F1D27D]"
            >
              Explore Program
              <span className="ml-2">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Programs() {
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
    <div className="bg-[#FCF9F4] text-navy">
      <section className="relative isolate overflow-hidden bg-[#FCF9F4]">
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 md:-left-[100px] w-full md:w-[68%] lg:w-[62%] bg-cover bg-center"
            style={{
              backgroundImage: `url(${programImage})`,
              maskImage:
                'linear-gradient(to right, black 45%, rgba(0,0,0,0.8) 58%, rgba(0,0,0,0.45) 72%, rgba(0,0,0,0.15) 88%, transparent 100%)',
              WebkitMaskImage:
                'linear-gradient(to right, black 45%, rgba(0,0,0,0.8) 58%, rgba(0,0,0,0.45) 72%, rgba(0,0,0,0.15) 88%, transparent 100%)',
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#FCF9F4]/95" />

          <div className="absolute inset-0 bg-gradient-to-b from-[#FCF9F4]/10 via-transparent to-[#FCF9F4]/35" />
        </div>

        <div className="container-page relative z-10">
          <div className="grid min-h-[560px] items-center py-12 sm:min-h-[600px] sm:py-14 lg:min-h-[650px] lg:grid-cols-2 lg:py-16">
            <div className="hidden lg:block" />

            <div>
              <div className="mb-4 flex items-center gap-3">
                <span className="h-px w-10 bg-[#B99A54]" />

                <p className="text-s font-bold uppercase tracking-[0.22em] text-[#9B7A35]">
                  Academic Programs
                </p>
              </div>

              <h1 className="text-4xl font-semibold leading-[1.08] tracking-tight text-[#54151A] md:text-5xl lg:text-[3.4rem]">
                Find the pathway
                <span className="block text-[#8B2028]">
                  that fits your future.
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-base leading-7 text-[#080808]">
                Four structured pathways designed around different ages,
                learning speeds and academic goals — all leading toward
                internationally recognized IGCSE and O-Level qualifications.
              </p>

              <div className="mt-4 flex flex-wrap gap-3">
                <div className="rounded-full border border-[#E5D8C7] bg-yellow-500 px-4 py-2 text-xs font-semibold text-navy">
                  ✓ Flexible Learning
                </div>

                <div className="rounded-full border border-[#E5D8C7] bg-yellow-500 px-4 py-2 text-xs font-semibold text-nav">
                  ✓ Structured Pathways
                </div>

                <div className="rounded-full border border-[#E5D8C7] bg-yellow-500 px-4 py-2 text-xs font-semibold text-nav">
                  ✓ Global Qualifications
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#F4EEE5]">
        <div className="container-page pt-9 pb-3 md:pt-11 md:pb-4">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#9B7A35]">
            Choose Your Path
          </p>

          <h2 className="mt-2 text-2xl font-semibold text-[#54151A] md:text-3xl">
            Four ways to reach your academic goals.
          </h2>
        </div>

        <div className="container-page pt-3 pb-14 md:pt-5 md:pb-18 lg:pb-20">
          <div className="grid gap-7 md:grid-cols-2">
            {programs.map((program, index) => (
              <ProgramFlipCard
                key={program.slug}
                program={program}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="container-page py-16 md:py-20">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-[#B99A54]" />

                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#9B7A35]">
                  Designed Around Students
                </p>
              </div>

              <h2 className="mt-4 text-3xl font-semibold leading-tight text-[#54151A] md:text-4xl">
                One curriculum.
                <br />
                <span className="text-[#8B2028]">
                  Different journeys.
                </span>
              </h2>

              <p className="mt-5 max-w-xl leading-7 text-[#625A55]">
                Every student has a different starting point, pace and
                destination. Our pathways make it easier to choose an
                academic route that matches individual circumstances
                without compromising on quality.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-[#E8DDCE] bg-[#FFFCF8] p-5">
                <p className="text-2xl">⚡</p>

                <h3 className="mt-3 font-semibold text-[#54151A]">
                  Pace
                </h3>

                <p className="mt-1 text-sm leading-5 text-[#6A625E]">
                  Choose an intensive or mastery-paced learning journey.
                </p>
              </div>

              <div className="rounded-2xl border border-[#E8DDCE] bg-[#FFFCF8] p-5">
                <p className="text-2xl">🌍</p>

                <h3 className="mt-3 font-semibold text-[#54151A]">
                  Destination
                </h3>

                <p className="mt-1 text-sm leading-5 text-[#6A625E]">
                  Pathways designed for local and international goals.
                </p>
              </div>

              <div className="rounded-2xl border border-[#E8DDCE] bg-[#FFFCF8] p-5">
                <p className="text-2xl">📚</p>

                <h3 className="mt-3 font-semibold text-[#54151A]">
                  Structure
                </h3>

                <p className="mt-1 text-sm leading-5 text-[#6A625E]">
                  Clear academic routes built around IGCSE requirements.
                </p>
              </div>

              <div className="rounded-2xl border border-[#E8DDCE] bg-[#FFFCF8] p-5">
                <p className="text-2xl">🎓</p>

                <h3 className="mt-3 font-semibold text-[#54151A]">
                  Future
                </h3>

                <p className="mt-1 text-sm leading-5 text-[#6A625E]">
                  Build strong foundations for future academic opportunities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#54151A]">
        <div className="container-page py-14 md:py-16">
          <div className="flex flex-col items-start justify-between gap-7 md:flex-row md:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#E4C978]">
                Ready to Begin?
              </p>

              <h2 className="mt-2 text-2xl font-semibold text-white md:text-3xl">
                Choose the pathway that fits your student.
              </h2>

              <p className="mt-2 max-w-xl text-sm leading-6 text-white/70">
                Explore a program in detail or start your admission journey.
              </p>
            </div>

            <Link
              to="/admissions"
              className="inline-flex shrink-0 items-center rounded-xl bg-[#EBC05A] px-6 py-3 text-sm font-bold text-[#54151A] transition hover:bg-[#F2D37B]"
            >
              Start Your Application
              <span className="ml-2">→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}