import PageHeader from '../components/PageHeader.jsx';

export default function Terms() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Terms & Conditions" />
      <section className="section">
        <div className="container-page max-w-3xl space-y-6 text-sm leading-relaxed text-navy-700/90">
          <p><em>Placeholder text — to be replaced with final legal copy reviewed by the client's legal counsel before launch.</em></p>
          <p>By using this website and submitting any form (admission, contact, careers, feedback, or newsletter), you agree to provide accurate information and consent to IGCSE Smart School processing it as described in our Privacy Policy.</p>
          <p>Submission of an admission application does not guarantee enrollment. Enrollment is subject to review, interview, and confirmation by the admissions team.</p>
          <p>All content on this site is the property of IGCSE Smart School unless otherwise stated, and may not be reproduced without permission.</p>
        </div>
      </section>
    </>
  );
}
