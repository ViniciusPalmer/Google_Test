import { IAnimal } from "../../../../shared/types/animal";

interface IResultCard {
  animal: Readonly<IAnimal>;
  isActive: boolean;
  onSelect: () => void;
  ariaControls?: string;
  ariaExpanded?: boolean;
  ariaPressed?: boolean;
}

export function ResultCard({ animal, isActive, onSelect, ariaControls, ariaExpanded, ariaPressed }: IResultCard) {
  return (
    <article
      className={`mb-4 w-full rounded-[22px] border p-5 text-left transition-colors ${
        isActive
          ? "border-[#7CFF7C]/40 bg-[#111827] shadow-[0_20px_50px_rgba(0,0,0,0.32)]"
          : "border-white/10 bg-[#0F172A]/85 hover:border-[#7CFF7C]/30 hover:bg-[#111827]/80"
      }`}
    >
      <span className="mb-3 inline-flex rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#AAB3C5]">
        {animal.summaryTag}
      </span>
      <button
        type="button"
        onClick={onSelect}
        aria-controls={ariaControls}
        aria-expanded={ariaExpanded}
        aria-pressed={ariaPressed}
        className="mb-2 bg-transparent text-left text-2xl font-semibold text-[#F8FAFC] transition-colors hover:text-[#7CFF7C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7CFF7C] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F172A]"
      >
        {animal.title}
      </button>
      <p className="mb-4 text-sm font-medium text-[#AAB3C5]">{animal.habitat}</p>
      <p className="mb-4 text-base leading-7 text-[#AAB3C5]">{animal.description}</p>
      <div className="flex flex-wrap gap-3 text-sm text-[#8B95A7]">
        <span>{animal.lifespan}</span>
        <span className="text-slate-600">/</span>
        <span>{animal.diet}</span>
      </div>
    </article>
  );
}
