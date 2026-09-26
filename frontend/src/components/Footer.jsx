import { Link } from 'react-router-dom';
import Newsletter from './Newsletter.jsx';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-navy-100 bg-navy-900 text-navy-100">
      <div className="container-page py-14">
        <div className="mb-10 rounded-2xl bg-navy-700 p-6 sm:p-8">
          <Newsletter variant="footer" />
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-white">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link className="hover:text-amber-400" to="/">Home</Link></li>
              <li><Link className="hover:text-amber-400" to="/about">About Us</Link></li>
              <li><Link className="hover:text-amber-400" to="/programs">Programs</Link></li>
              <li><Link className="hover:text-amber-400" to="/admissions">Admissions</Link></li>
              <li><Link className="hover:text-amber-400" to="/support">Support</Link></li>
              <li><Link className="hover:text-amber-400" to="/contact">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-white">Contact Info</h4>
            <ul className="space-y-2 text-sm">
              <li><a className="hover:text-amber-400" href="mailto:info@igcsesmartschool.com">info@igcsesmartschool.com</a></li>
              <li><a className="hover:text-amber-400" href="https://wa.me/10000000000" target="_blank" rel="noreferrer">Chat on WhatsApp</a></li>
              <li><a className="hover:text-amber-400" href="tel:+92 335 9404434">(000) 987 654 321</a></li>
            </ul>
            <div className="mt-4 flex gap-3">
              <a aria-label="Facebook" className="hover:text-amber-400" href="https://www.facebook.com/igcsesmartschool" target="_blank" rel="noreferrer">Facebook</a>
              <a aria-label="Instagram" className="hover:text-amber-400" href="https://www.instagram.com/igcsesmartschool/" target="_blank" rel="noreferrer">Instagram</a>
              <a aria-label="LinkedIn" className="hover:text-amber-400" href="https://www.linkedin.com/company/igcsesmartschool" target="_blank" rel="noreferrer">LinkedIn</a>
            </div>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-white">Policies &amp; Regulations</h4>
            <ul className="space-y-2 text-sm">
              <li><Link className="hover:text-amber-400" to="/privacy-policy">Privacy Policy</Link></li>
              <li><Link className="hover:text-amber-400" to="/terms-conditions">Terms &amp; Conditions</Link></li>
            </ul>
            
          </div>
        </div>

        <p className="mt-10 border-t border-navy-600 pt-6 text-xs text-navy-100/70">
          © {year} IGCSE Smart School. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
