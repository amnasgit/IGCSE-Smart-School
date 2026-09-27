import { Link } from 'react-router-dom';
import Newsletter from './Newsletter.jsx';

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
  FaEnvelope,
  FaPhone,
} from 'react-icons/fa';

import {
  FiHome,
  FiInfo,
  FiBookOpen,
  FiAward,
  FiHeadphones,
  FiMessageCircle,
  FiHelpCircle,
  FiBriefcase,
  FiMessageSquare,
} from 'react-icons/fi';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-navy-100 bg-navy-900 text-navy-100">
      <div className="container-page py-14">

        {/* Newsletter */}
        <div className="mb-10 rounded-2xl bg-navy-700 p-6 sm:p-8">
          <Newsletter variant="footer" />
        </div>

        {/* Footer Links */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-teal-400">
              - Quick Links
            </h4>

            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  className="group flex items-center gap-2 transition-colors hover:text-amber-400"
                  to="/"
                >
                  <FiHome className="text-base transition-transform group-hover:translate-x-0.5" />
                  Home
                </Link>
              </li>

              <li>
                <Link
                  className="group flex items-center gap-2 transition-colors hover:text-amber-400"
                  to="/about"
                >
                  <FiInfo className="text-base transition-transform group-hover:translate-x-0.5" />
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  className="group flex items-center gap-2 transition-colors hover:text-amber-400"
                  to="/programs"
                >
                  <FiBookOpen className="text-base transition-transform group-hover:translate-x-0.5" />
                  Programs
                </Link>
              </li>

              <li>
                <Link
                  className="group flex items-center gap-2 transition-colors hover:text-amber-400"
                  to="/admissions"
                >
                  <FiAward className="text-base transition-transform group-hover:translate-x-0.5" />
                  Admissions
                </Link>
              </li>

              <li>
                <Link
                  className="group flex items-center gap-2 transition-colors hover:text-amber-400"
                  to="/support"
                >
                  <FiHeadphones className="text-base transition-transform group-hover:translate-x-0.5" />
                  Support
                </Link>
              </li>

              <li>
                <Link
                  className="group flex items-center gap-2 transition-colors hover:text-amber-400"
                  to="/contact"
                >
                  <FiMessageCircle className="text-base transition-transform group-hover:translate-x-0.5" />
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-teal-400">
              - Contact Info
            </h4>

            <ul className="space-y-3 text-sm">
              {/* Email */}
              <li>
                <a
                  className="group flex items-center gap-2 transition-colors hover:text-amber-400"
                  href="mailto:info@igcsesmartschool.com"
                >
                  <FaEnvelope className="text-sm transition-transform group-hover:scale-110" />
                  info@igcsesmartschool.com
                </a>
              </li>

              {/* WhatsApp */}
              <li>
                <a
                  className="group flex items-center gap-2 transition-colors hover:text-amber-400"
                  href="https://wa.me/+92 326 7127239"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaWhatsapp
                    className="text-base transition-transform group-hover:scale-110"
                    style={{ color: '#25D366' }}
                  />
                  Chat on WhatsApp
                </a>
              </li>

              {/* Phone */}
              <li>
                <a
                  className="group flex items-center gap-2 transition-colors hover:text-amber-400"
                  href="tel:+92 326 7127239"
                >
                  <FaPhone className="text-sm transition-transform group-hover:scale-110" />
                  (+92) 326 7127239
                </a>
              </li>
            </ul>

            {/* Social Media */}
            <div className="mt-6">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-white/70">
                Follow Us
              </p>

              <div className="space-y-3 text-sm">

                {/* Facebook */}
                <a
                  href="https://www.facebook.com/igcsesmartschool"
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-3 transition-colors"
                >
                  <FaFacebookF
                    className="text-[18px] transition-transform duration-200 group-hover:scale-110"
                    style={{ color: '#1877F2' }}
                  />
                  <span className="transition-colors group-hover:text-amber-400">
                    Facebook
                  </span>
                </a>

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/igcsesmartschool/"
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-3 transition-colors"
                >
                  <FaInstagram
                    className="text-[19px] transition-transform duration-200 group-hover:scale-110"
                    style={{ color: '#E4405F' }}
                  />
                  <span className="transition-colors group-hover:text-amber-400">
                    Instagram
                  </span>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/company/igcsesmartschool"
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-3 transition-colors"
                >
                  <FaLinkedinIn
                    className="text-[18px] transition-transform duration-200 group-hover:scale-110"
                    style={{ color: '#0A66C2' }}
                  />
                  <span className="transition-colors group-hover:text-amber-400">
                    LinkedIn
                  </span>
                </a>

              </div>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-teal-400">
              - Explore More
            </h4>

            <ul className="space-y-3 text-sm">

              {/* FAQs */}
              <li>
                <Link
                  className="group flex items-center gap-2 transition-colors hover:text-amber-400"
                  to="/faqs"
                >
                  <FiHelpCircle className="text-base transition-transform group-hover:translate-x-0.5" />
                  FAQs
                </Link>
              </li>

              {/* Careers */}
              <li>
                <Link
                  className="group flex items-center gap-2 transition-colors hover:text-amber-400"
                  to="/careers"
                >
                  <FiBriefcase className="text-base transition-transform group-hover:translate-x-0.5" />
                  Careers
                </Link>
              </li>

              {/* Feedback */}
              <li>
                <Link
                  className="group flex items-center gap-2 transition-colors hover:text-amber-400"
                  to="/feedback"
                >
                  <FiMessageSquare className="text-base transition-transform group-hover:translate-x-0.5" />
                  Feedback
                </Link>
              </li>

            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 flex flex-col gap-4 border-t border-navy-600 pt-6 sm:flex-row sm:items-center sm:justify-between">

          <p className="text-xs text-navy-100/70">
            © {year} IGCSE Smart School. All Rights Reserved.
          </p>

          {/* <div className="flex items-center gap-4 text-xs text-navy-100/70">
            <Link
              className="transition-colors hover:text-amber-400"
              to="/privacy-policy"
            >
              Privacy Policy
            </Link>

            <span className="text-navy-600">|</span>

            <Link
              className="transition-colors hover:text-amber-400"
              to="/terms-conditions"
            >
              Terms &amp; Conditions
            </Link>
          </div> */}

        </div>
      </div>
    </footer>
  );
}

