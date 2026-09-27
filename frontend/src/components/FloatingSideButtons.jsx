import { Link } from 'react-router-dom';

/**
 * Two vertical tab-style buttons pinned to the left edge of the viewport,
 * always visible (fixed) on every public page — "Enquire Now" and "WhatsApp".
 */
export default function FloatingSideButtons() {
  return (
    <div className="fixed left-0 top-1/2 z-40 flex -translate-y-1/2 flex-col">
      <Link
        to="/contact"
        className="flex items-center justify-center rounded-r-lg bg-navy px-2 py-4 shadow-lg transition hover:bg-navy-400"
      >
        <span
          className="text-xs font-semibold tracking-wide text-paper"
          style={{ writingMode: 'vertical-rl' }}
        >
          <span className="inline-block rotate-180">Enquire Now</span>
        </span>
      </Link>
        <br></br>
      <a
        href="https://wa.me/+923267127239"
        target="_blank"
        rel="noreferrer"
        className="flex items-center justify-center rounded-r-lg bg-[#25D366] px-2 py-4 shadow-lg transition hover:bg-[#1FB958]"
      >
        <span
          className="text-xs font-semibold tracking-wide text-white"
          style={{ writingMode: 'vertical-rl' }}
        >
          <span className="inline-block rotate-180">WhatsApp</span>
        </span>
      </a>
    </div>
  );
}