import { Link } from 'react-router-dom';

const steps = [
  { n: '01', title: 'Apply', desc: 'Apply online via website or WhatsApp' },
  { n: '02', title: 'Review', desc: 'Application review by our team' },
  { n: '03', title: 'Interview', desc: 'Short student interview' },
  { n: '04', title: 'Enroll', desc: 'Confirmation and enrollment' },
];

export default function AdmissionProcess() {
  return (
    <section className="section">
      <div className="container-page">
        <p className="eyebrow">Admission Process</p>

        <div className="relative mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="absolute left-0 right-0 top-6 hidden h-px bg-navy-100 lg:block" aria-hidden="true" />
          {steps.map((s) => (
            <div key={s.n} className="relative">
              <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-navy font-display text-sm font-semibold text-white">
                {s.n}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-navy">{s.title}</h3>
              <p className="mt-1 text-sm text-navy-700/80">{s.desc}</p>
            </div>
          ))}
        </div>

        <Link to="/admissions" className="btn-secondary mt-10 inline-flex">View Full Admission Details</Link>
      </div>
    </section>
  );
}
