import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center pt-28 pb-20 text-center sm:pt-32">
      <p className="font-display text-6xl font-semibold text-navy">404</p>
      <h1 className="mt-3 text-2xl font-semibold text-navy">Page not found</h1>
      <p className="mt-2 max-w-md text-navy-700/80">
        The page you're looking for doesn't exist or may have moved. Let's get you back on track.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link to="/" className="btn-primary">Back to Home</Link>
        <Link to="/programs" className="btn-secondary">Explore Programs</Link>
        <Link to="/admissions" className="btn-ghost border border-navy-100">Admissions</Link>
      </div>
    </div>
  );
}