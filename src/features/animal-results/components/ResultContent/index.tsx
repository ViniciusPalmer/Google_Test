import { IAnimal } from "../../../../shared/types/animal";

interface ResultContentProps {
  animal: Readonly<IAnimal>;
  id?: string;
}

export function ResultContent({ animal, id }: ResultContentProps) {
  const metadata = [
    { label: "Habitat", value: animal.habitat },
    { label: "Type", value: animal.type },
    { label: "Lifespan", value: animal.lifespan },
    { label: "Diet", value: animal.diet },
  ];

  return (
    <article
      id={id}
      aria-label={`${animal.title} details`}
      className="w-full rounded-[26px] border border-white/10 bg-[radial-gradient(circle_at_85%_8%,rgba(124,255,124,0.13),transparent_30%),linear-gradient(180deg,#101723_0%,#131C2A_100%)] p-5 shadow-[0_18px_52px_rgba(0,0,0,0.32)] lg:sticky lg:top-6 lg:p-[22px]"
    >
      <img
        className="mb-6 h-64 w-full rounded-[22px] object-cover"
        src={animal.image}
        alt={animal.title}
        loading="lazy"
        decoding="async"
      />
      <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#7CFF7C]">Selected result</p>
      <span className="mb-3 inline-flex rounded-full border border-white/10 bg-[#0F172A] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#AAB3C5]">
        {animal.type}
      </span>
      <h2 className="mb-3 text-3xl font-semibold text-[#F8FAFC] lg:text-[34px] lg:leading-[1.15]">{animal.title}</h2>
      <p className="mb-5 text-base leading-7 text-[#AAB3C5]">{animal.description}</p>
      <div className="mb-6 rounded-[24px] border border-white/10 bg-[#0F172A]/70 p-4 text-[#F8FAFC]">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#8B95A7]">At a glance</p>
        <p className="mt-2 text-lg font-medium text-[#F8FAFC]">{animal.summaryTag}</p>
      </div>
      <dl className="grid w-full grid-cols-2 gap-3">
        {metadata.map((item) => (
          <div key={item.label} className="rounded-[20px] border border-white/10 bg-[#0F172A]/70 px-4 py-4">
            <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8B95A7]">{item.label}</dt>
            <dd className="mt-2 text-base font-medium text-[#F8FAFC]">{item.value}</dd>
          </div>
        ))}
      </dl>
      <a
        className="mt-6 inline-flex text-sm font-semibold text-lime-200 hover:text-lime-100"
        href={animal.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        Visit source
      </a>
    </article>
  );
}
