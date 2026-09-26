export default function PageHeader({ eyebrow, title, subtitle, children }) {
  return (
    <section className="border-b border-navy-100 bg-navy-50/50">
      <div className="container-page pt-24 pb-14 sm:pt-28 sm:pb-16 lg:pt-32">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1 className="mt-2 text-3xl font-semibold text-navy sm:text-4xl">{title}</h1>
        {subtitle && <p className="mt-3 max-w-2xl text-navy-700/80">{subtitle}</p>}
        {children && <div className="mt-6">{children}</div>}
      </div>
    </section>
  );
}