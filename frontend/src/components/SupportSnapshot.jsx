import { Link } from 'react-router-dom';

export function SupportSnapshot() {
  return (
    <section className="section">
      <div className="container-page grid gap-10 lg:grid-cols-2">
        <div className="card">
          <p className="eyebrow">Support</p>
          <h3 className="mt-2 text-2xl font-semibold text-navy">Need help? We're here to guide you anytime.</h3>
          <ul className="mt-4 space-y-2 text-sm text-navy-700/90">
            <li><Link to="/support/faqs" className="hover:text-amber-600">→ FAQs</Link></li>
            <li><Link to="/contact" className="hover:text-amber-600">→ Contact Support</Link></li>
            <li><Link to="/support/feedback" className="hover:text-amber-600">→ Feedback &amp; Suggestions</Link></li>
          </ul>
          <Link to="/support" className="btn-secondary mt-6 inline-flex text-sm">Visit Support</Link>
        </div>

        <div className="card bg-navy text-white">
          <p className="eyebrow !text-amber-400">Careers</p>
          <h3 className="mt-2 text-2xl font-semibold text-amber-400">Join our growing team of educators and professionals.</h3>
          <p className="mt-3 text-sm text-navy">Help shape the future of online IGCSE education by joining our family.</p>
          <p className="mt-3 text-sm text-navy">We look forward to welcome you.</p>
          <Link to="/careers" className="btn-primary mt-8 inline-flex text-sm">Join Our Team</Link>
        </div>
      </div>
    </section>
  );
}
