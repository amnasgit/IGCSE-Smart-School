import { Link } from 'react-router-dom';

const cards = [
  { emoji: '🎯', title: 'Mission', text: 'To provide high-quality online education that builds strong academic foundations and prepares students for future success.' },
  { emoji: '🌍', title: 'Vision', text: 'To become a trusted global online school offering accessible and effective learning for every student.' },
  { emoji: '👨‍🏫', title: 'Who We Are', text: 'A dedicated team of educators building a modern online learning environment for academic excellence.' },
];

export default function AboutSnapshot() {
  return (
    <section className="section bg-mist">
      <div className="container-page">
        <p className="eyebrow">About Us</p>
        <h2 className="mt-2 max-w-2xl text-3xl font-semibold text-navy sm:text-4xl">
        Delivering structured IGCSE education for learners worldwide
        </h2>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {cards.map((c) => (
            <div key={c.title} className="card">
              <span className="text-2xl">{c.emoji}</span>
              <h3 className="mt-3 text-lg font-semibold text-navy">{c.title}</h3>
              <p className="mt-2 text-sm text-navy-700/80">{c.text}</p>
              {/* <Link to="/about" className="btn-ghost mt-4 !px-0 text-sm text-teal-600">Learn More About Us →</Link> */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
