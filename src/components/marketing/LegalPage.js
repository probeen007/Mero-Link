export default function LegalPage({ title, updated, children }) {
  return (
    <article className="shell max-w-3xl pb-10 pt-14 sm:pt-20">
      <h1 className="font-display text-5xl font-extrabold tracking-tight">{title}</h1>
      <p className="mt-3 text-sm text-muted">Last updated {updated}</p>
      <div className="mt-10 grid gap-4 text-muted [&_a]:font-medium [&_a]:text-accent-text [&_a]:underline [&_h2]:mt-8 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-ink [&_li]:ml-5 [&_li]:list-disc [&_ul]:grid [&_ul]:gap-2">
        {children}
      </div>
    </article>
  );
}
