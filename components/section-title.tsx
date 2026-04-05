type SectionTitleProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function SectionTitle({ eyebrow, title, description }: SectionTitleProps) {
  return (
    <div className="max-w-3xl">
      {eyebrow ? (
        <div className="text-xs font-semibold uppercase tracking-[0.24em] text-ocean-700">
          {eyebrow}
        </div>
      ) : null}
      <h2 className="mt-2 text-3xl font-semibold tracking-tight text-volcanic">{title}</h2>
      {description ? <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p> : null}
    </div>
  );
}
