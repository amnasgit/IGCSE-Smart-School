const features = [
  { title: 'Flexible Online Learning', desc: 'Study from anywhere with convenient schedules and modern digital tools.' },
  { title: 'Qualified & Experienced Teachers', desc: 'Expert guidance and academic support from dedicated educators.' },
  { title: 'Affordable Education', desc: 'Cost-effective, value-driven learning options.' },
  { title: 'International-Style Curriculum', desc: 'Structured learning aligned with IGCSE standards.' },
  { title: 'Weekly Performance Reporting', desc: 'Parents receive regular updates on attendance, participation, homework, and progress.' },
  { title: 'Student Support System', desc: 'Continuous guidance to keep students motivated and on track.' },
];

export default function WhyChooseUs() {
  return (
    <section className="section">
      <div className="container-page">
        <p className="eyebrow">Why Choose Us</p>
        <h2 className="mt-2 max-w-2xl text-3xl font-semibold text-navy sm:text-4xl">
        Delivering quality IGCSE education for academic excellence.
        </h2>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="card">
              <h3 className="text-lg font-semibold text-navy">{f.title}</h3>
              <p className="mt-2 text-sm text-navy-700/80">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
