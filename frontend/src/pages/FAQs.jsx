import { useEffect, useState } from 'react';
import PageHeader from '../components/PageHeader.jsx';
import api from '../api/api.js';

const categories = ['Admissions', 'Programs', 'Technical/Platform', 'Fees'];

const fallback = [
  { _id: '1', category: 'Admissions', question: 'How do I apply for admission?', answer: 'You can apply online through our Admissions page or start the process via WhatsApp.' },
  { _id: '2', category: 'Programs', question: 'What programs do you offer?', answer: 'We currently offer IGCSE/O Level, with Pre-IGCSE and A Level launching soon.' },
  { _id: '3', category: 'Technical/Platform', question: 'How are classes delivered?', answer: 'Classes are delivered fully online through our digital learning platform.' },
  { _id: '4', category: 'Fees', question: 'How much does tuition cost?', answer: 'Please contact our admissions team for current fee details.' },
];

function AccordionItem({ faq, isOpen, onToggle }) {
  return (
    <div className="border-b border-navy-100">
      <button
        className="flex w-full items-center justify-between py-4 text-left"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className="font-medium text-navy">{faq.question}</span>
        <span className="text-navy-700">{isOpen ? '−' : '+'}</span>
      </button>
      {isOpen && <p className="pb-4 text-sm text-navy-700/80">{faq.answer}</p>}
    </div>
  );
}

export default function FAQs() {
  const [faqs, setFaqs] = useState(fallback);
  const [openId, setOpenId] = useState(null);

  useEffect(() => {
    api.get('/faqs').then((res) => {
      if (res.data?.data?.length) setFaqs(res.data.data);
    }).catch(() => {});
  }, []);

  return (
    <>
      <PageHeader eyebrow="Support / FAQs" title="Frequently Asked Questions" />
      <section className="section">
        <div className="container-page max-w-3xl">
          {categories.map((cat) => {
            const items = faqs.filter((f) => f.category === cat);
            if (!items.length) return null;
            return (
              <div key={cat} className="mb-10">
                <h2 className="mb-2 text-lg font-semibold text-teal-600">{cat}</h2>
                {items.map((faq) => (
                  <AccordionItem
                    key={faq._id}
                    faq={faq}
                    isOpen={openId === faq._id}
                    onToggle={() => setOpenId(openId === faq._id ? null : faq._id)}
                  />
                ))}
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
