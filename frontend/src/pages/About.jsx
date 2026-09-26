
import britishCouncilLogo from '../assets/britishcouncil_og_logo.jpg';
import pearsonEdexcelLogo from '../assets/Edexcel.svg.webp';
import aboutSchoolImage from '../assets/about-school.jfif';

const cards = [
  {
    number: '01',
    emoji: '🎯',
    title: 'Our Mission',
    text: 'To provide high-quality online education that builds strong academic foundations and prepares students for future success.',
  },
  {
    number: '02',
    emoji: '🌍',
    title: 'Our Vision',
    text: 'To become a trusted global online school offering accessible and effective learning for every student.',
  },
  {
    number: '03',
    emoji: '👨‍🏫',
    title: 'Who We Are',
    text: 'A dedicated team of educators building a modern online learning environment for academic excellence.',
  },
];

const benefits = [
  'Flexible online learning',
  'Structured IGCSE pathways',
  'Experienced educators',
  'Continuous academic support',
  'International qualification pathways',
  'Student-focused learning environment',
];

export default function About() {
  return (
    <div className="bg-[#FCF9F4] text-navy">

      {/* =====================================================
          1. ABOUT HERO
      ====================================================== */}
      <section className="relative isolate overflow-hidden bg-[#FCF9F4]">
      {/* =================================================
            PAGE-SPECIFIC BACKGROUND
        ================================================== */}

        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <div
            className="absolute inset-y-0 right-0 w-full md:w-[68%] lg:w-[62%] bg-cover bg-center"
            style={{
              backgroundImage: `url(${aboutSchoolImage})`,
              maskImage:
                'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.15) 12%, rgba(0,0,0,0.45) 25%, rgba(0,0,0,0.8) 40%, black 55%)',
              WebkitMaskImage:
                'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.15) 12%, rgba(0,0,0,0.45) 25%, rgba(0,0,0,0.8) 40%, black 55%)',
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-r from-[#FCF9F4] via-[#FCF9F4]/90 via-[28%] via-[#FCF9F4]/45 via-[48%] to-transparent" />

          <div className="absolute inset-0 bg-gradient-to-b from-[#FCF9F4]/10 via-transparent to-[#FCF9F4]/35" />
        </div>


        {/* =================================================
            HERO CONTENT
        ================================================== */}
        <div className="container-page relative z-10">

          <div
            className="
              grid
              min-h-[560px]
              items-center
              py-12
              sm:min-h-[600px]
              sm:py-14
              lg:min-h-[650px]
              lg:grid-cols-2
              lg:py-16
            "
          >

            {/* =================================================
                LEFT CONTENT
            ================================================== */}
            <div className="max-w-2xl">

              {/* Eyebrow */}
              <div className="mb-4 flex items-center gap-3">

                <span className="h-px w-9 bg-[#B99A54]" />

                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#9B7A35]">
                  About Us
                </p>

              </div>


              {/* Heading */}
              <h1
                className="
                  text-3xl
                  font-semibold
                  leading-[1.05]
                  tracking-tight
                  text-[#54151A]
                  sm:text-4xl
                  md:text-5xl
                  lg:text-[3.25rem]
                  xl:text-[3.5rem]
                "
              >
                Flexible learning.{' '}

                <span className="text-[#8B2028]">
                  Global possibilities.
                </span>
              </h1>


              {/* Intro */}
              <p className="mt-5 max-w-xl text-sm leading-6 text-[#5F5753] md:text-base">
                IGCSE Smart School is an online education platform focused on
                delivering flexible and high-quality IGCSE learning.
              </p>


              {/* Description */}
              <p className="mt-2 max-w-xl text-sm leading-6 text-[#746B66]">
                We combine structured international education with the flexibility
                of online learning, helping students build confidence, knowledge
                and strong academic foundations.
              </p>


              {/* =================================================
                  SMALL STATS
              ================================================== */}
              <div className="mt-6 flex flex-wrap items-center gap-x-7 gap-y-4 border-t border-[#E5DCCE] pt-5">

                <div>
                  <p className="text-lg font-bold text-[#54151A]">
                    IGCSE
                  </p>

                  <p className="text-[11px] text-[#756D68]">
                    International Pathways
                  </p>
                </div>


                <div>
                  <p className="text-lg font-bold text-[#54151A]">
                    Online
                  </p>

                  <p className="text-[11px] text-[#756D68]">
                    Flexible Learning
                  </p>
                </div>


                <div>
                  <p className="text-lg font-bold text-[#54151A]">
                    Global
                  </p>

                  <p className="text-[11px] text-[#756D68]">
                    Academic Opportunities
                  </p>
                </div>

              </div>

            </div>


            {/* Empty right grid column.
                Background image occupies this area. */}
            <div className="hidden lg:block" />

          </div>

        </div>

      </section>


      {/* =====================================================
          2. MISSION / VISION / WHO WE ARE
      ====================================================== */}
      <section className="border-y border-[#E9DFD2] bg-white">

        <div className="container-page py-14 md:py-16">

          <div className="grid gap-5 md:grid-cols-3">

            {cards.map((card) => (

              <div
                key={card.title}
                className="
                  group
                  relative
                  rounded-2xl
                  border
                  border-[#E9DFD2]
                  bg-[#FFFCF8]
                  p-7
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-[#D7BE88]
                  hover:shadow-[0_15px_35px_rgba(74,35,30,0.08)]
                "
              >

                <div className="flex items-center justify-between">

                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F6EBD7] text-xl">
                    {card.emoji}
                  </span>

                  <span className="text-xs font-bold tracking-widest text-[#C2AA78]">
                    {card.number}
                  </span>

                </div>


                <h2 className="mt-6 text-xl font-semibold text-[#54151A]">
                  {card.title}
                </h2>


                <p className="mt-3 text-sm leading-6 text-[#6A625E]">
                  {card.text}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* =====================================================
          3. GLOBAL ACCREDITATION
      ====================================================== */}
      <section className="relative overflow-hidden bg-[#F4EEE5]">

        <div className="container-page py-16 md:py-20">

          {/* Section Heading */}
          <div className="mx-auto max-w-2xl text-center">

            <div className="flex items-center justify-center gap-3">

              <span className="h-px w-8 bg-[#B99A54]" />

              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#9B7A35]">
                Global Accreditation
              </p>

              <span className="h-px w-8 bg-[#B99A54]" />

            </div>


            <h2 className="mt-4 text-3xl font-semibold text-[#54151A] md:text-4xl">
              Globally Recognized Academic Pathways
            </h2>


            <p className="mt-4 text-sm leading-6 text-[#6A625E]">
              Our students can pursue internationally recognized academic
              pathways through established education and examination
              organizations.
            </p>

          </div>


          {/* Accreditation Cards */}
          <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2">

            {/* British Council */}
            <div
              className="
                group
                rounded-3xl
                border
                border-[#E1D5C4]
                bg-white
                p-8
                text-center
                shadow-[0_10px_30px_rgba(74,35,30,0.05)]
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-[0_18px_40px_rgba(74,35,30,0.09)]
              "
            >

              <div className="flex h-28 items-center justify-center">

                <img
                  src={britishCouncilLogo}
                  alt="British Council"
                  className="max-h-24 max-w-[260px] object-contain"
                />

              </div>


              <div className="mx-auto mt-6 h-px w-12 bg-[#D6BA76]" />


              <h3 className="mt-5 text-lg font-semibold text-[#54151A]">
                British Council
              </h3>


              <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-[#6A625E]">
                Students can pursue internationally recognized IGCSE
                and O-Level examination pathways through the British Council.
              </p>

            </div>


            {/* Pearson Edexcel */}
            <div
              className="
                group
                rounded-3xl
                border
                border-[#E1D5C4]
                bg-white
                p-8
                text-center
                shadow-[0_10px_30px_rgba(74,35,30,0.05)]
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-[0_18px_40px_rgba(74,35,30,0.09)]
              "
            >

              <div className="flex h-28 items-center justify-center">

                <img
                  src={pearsonEdexcelLogo}
                  alt="Pearson Edexcel"
                  className="max-h-24 max-w-[160px] object-contain"
                />

              </div>


              <div className="mx-auto mt-6 h-px w-12 bg-[#D6BA76]" />


              <h3 className="mt-5 text-lg font-semibold text-[#54151A]">
                Pearson Edexcel
              </h3>


              <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-[#6A625E]">
                Our academic pathways are based on Pearson Edexcel IGCSE
                and O-Level curriculum and qualification standards.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          4. ABOUT IGCSE SMART SCHOOL
      ====================================================== */}
      <section className="bg-white">

        <div className="container-page py-16 md:py-20 lg:py-24">

          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">

            {/* LEFT */}
            <div>

              <div className="flex items-center gap-3">

                <span className="h-px w-10 bg-[#B99A54]" />

                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#9B7A35]">
                  About IGCSE Smart School
                </p>

              </div>


              <h2 className="mt-4 text-3xl font-semibold leading-tight text-[#54151A] md:text-4xl">
                Modern education designed around every student's journey.
              </h2>


              <p className="mt-6 leading-7 text-[#5E5753]">
                IGCSE Smart School provides a flexible online learning
                environment designed to help students access quality
                international education from anywhere in the world.
              </p>


              <p className="mt-4 leading-7 text-[#5E5753]">
                Through structured IGCSE pathways, experienced educators,
                digital learning resources and continuous academic support,
                we help students build strong foundations while preparing
                for their future academic goals.
              </p>


              <p className="mt-4 leading-7 text-[#5E5753]">
                Our approach combines the structure of a traditional school
                with the flexibility of online education, allowing students
                to learn at a pace and schedule that works for them.
              </p>

            </div>


            {/* RIGHT BENEFITS */}
            <div
              className="
                rounded-3xl
                bg-[#54151A]
                p-7
                shadow-[0_20px_50px_rgba(84,21,26,0.15)]
                md:p-9
              "
            >

              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#E4C978]">
                Why Choose Us
              </p>


              <h3 className="mt-3 text-2xl font-semibold text-white">
                A smarter way to learn.
              </h3>


              <div className="mt-7 grid gap-3">

                {benefits.map((benefit) => (

                  <div
                    key={benefit}
                    className="
                      flex
                      items-center
                      gap-3
                      rounded-xl
                      border
                      border-white/10
                      bg-white/5
                      px-4
                      py-3
                    "
                  >

                    <span
                      className="
                        flex
                        h-7
                        w-7
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        bg-[#E7C45E]
                        text-sm
                        font-bold
                        text-[#54151A]
                      "
                    >
                      ✓
                    </span>


                    <span className="text-sm text-white/90">
                      {benefit}
                    </span>

                  </div>

                ))}

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          5. OUR TEAM
      ====================================================== */}
      <section className="bg-[#F4EEE5]" />

    </div>
  );
}
