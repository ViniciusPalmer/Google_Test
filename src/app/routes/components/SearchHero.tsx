import { useNavigate } from "react-router-dom";

import { SearchMenuBar } from "../../../features/animal-search/components/SearchMenuBar";

export function SearchHero() {
  const navigate = useNavigate();

  function handleSearchSubmit() {
    navigate("/results");
  }

  return (
    <section className="relative mx-auto flex min-h-screen w-full max-w-[760px] items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
      <div className="relative flex min-h-[min(820px,calc(100vh-64px))] w-full max-w-[700px] items-center justify-center overflow-hidden rounded-[28px] border border-white/10 bg-[radial-gradient(circle_at_68%_12%,rgba(124,255,124,0.14),transparent_34%),linear-gradient(180deg,#0B0F16_0%,#111827_100%)] px-6 py-12 text-center shadow-[0_30px_90px_rgba(0,0,0,0.4)] sm:px-14">
        <div className="mx-auto flex w-full max-w-[588px] flex-col items-center gap-6">
          <div className="flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#F8FAFC]">
            <span className="h-2.5 w-2.5 rounded-full bg-lime-300" />
            Animal Search
          </div>
          <h1 className="max-w-[560px] text-[44px] font-bold leading-[1.05] tracking-[-0.03em] text-[#F8FAFC] sm:text-[54px]">
            Find animals instantly
          </h1>
          <p className="max-w-[520px] text-base leading-[1.45] text-[#AAB3C5] sm:text-lg">
            Search an animal in English and explore fast, rich results designed for quick discovery.
          </p>
          <SearchMenuBar variant="hero" onSubmit={handleSearchSubmit} />
          <p className="text-sm text-[#8B95A7]">Minimal input. Instant discovery. Built for curious minds.</p>
        </div>
      </div>
    </section>
  );
}
