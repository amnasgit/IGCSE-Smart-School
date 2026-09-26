import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader.jsx';

export default function Support() {
  return (
    <>
      <PageHeader
        eyebrow="Support"
        title="Need help? We're here to guide you anytime."
        subtitle="Browse frequently asked questions, share feedback, or reach our support team directly."
      />
      <section className="section">
        <div className="container-page grid gap-6 sm:grid-cols-3">
          <Link to="/support/faqs" className="card">
            <h2 className="text-lg font-semibold text-navy">FAQs</h2>
            <p className="mt-2 text-sm text-navy-700/80">Quick answers to common questions about programs, admissions, and learning.</p>
          </Link>
          <Link to="/contact" className="card">
            <h2 className="text-lg font-semibold text-navy">Contact Support</h2>
            <p className="mt-2 text-sm text-navy-700/80">Reach our team by email, phone, or WhatsApp.</p>
          </Link>
          <Link to="/support/feedback" className="card">
            <h2 className="text-lg font-semibold text-navy">Feedback &amp; Suggestions</h2>
            <p className="mt-2 text-sm text-navy-700/80">Tell us how we're doing, or suggest an improvement.</p>
          </Link>
        </div>
      </section>
    </>
  );
}
