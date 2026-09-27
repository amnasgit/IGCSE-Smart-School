import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/api.js';

import programImage from '../assets/Boy1.png';

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
            <div className="mt-[-1px] h-[3px] w-[105%] rounded-full bg-[#7B1820]" />

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