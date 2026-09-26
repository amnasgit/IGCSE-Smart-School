import PageHeader from '../components/PageHeader.jsx';

export default function Privacy() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Privacy Policy" />
      <section className="section">
        <div className="container-page max-w-3xl space-y-6 text-sm leading-relaxed text-navy-700/90">
          <p><em>Placeholder text — to be replaced with final legal copy reviewed by the client's legal counsel before launch.</em></p>
          <p>IGCSE Smart School ("we", "us") collects personal information you provide through our forms — including admission applications, contact messages, career/CV submissions, and newsletter sign-ups — solely to deliver and improve our educational services.</p>
          <p>We do not sell personal data to third parties. Data may be shared with service providers (e.g. email delivery, hosting) strictly to operate the website and admissions process.</p>
          <p>You may request access to, correction of, or deletion of your personal data at any time by contacting us via the Contact page.</p>
          <p>Uploaded files (such as CVs) are retained only as long as necessary for recruitment purposes and are stored securely.</p>
        </div>
      </section>
    </>
  );
}
