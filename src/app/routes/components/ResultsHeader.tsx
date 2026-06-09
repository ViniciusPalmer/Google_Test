import type { MouseEvent } from "react";
import { useNavigate } from "react-router-dom";

import { SearchMenuBar } from "../../../features/animal-search/components/SearchMenuBar";

export function ResultsHeader() {
  const navigate = useNavigate();

  function returnToMain(e: MouseEvent<HTMLButtonElement>): void {
    e.preventDefault();
    navigate("/");
  }

  return (
    <header className="rounded-[28px] border border-white/10 bg-[radial-gradient(circle_at_70%_10%,rgba(124,255,124,0.10),transparent_34%),linear-gradient(180deg,rgba(10,14,20,0.94)_0%,rgba(17,22,30,0.9)_100%)] p-5 shadow-[0_30px_90px_rgba(0,0,0,0.34)]">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <button
          type="button"
          aria-label="Go to home"
          className="flex w-fit items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 text-left text-[#F8FAFC] transition hover:border-[#7CFF7C]/50 hover:text-[#7CFF7C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7CFF7C] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0E14]"
          onClick={returnToMain}
        >
          <span className="inline-flex h-2.5 w-2.5 rounded-full bg-lime-300" />
          <span>
            <span className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
              Back to search
            </span>
            <span className="block text-base font-semibold">Animal Search</span>
          </span>
        </button>
        <div className="w-full max-w-3xl lg:flex-1 lg:max-w-[720px]">
          <SearchMenuBar variant="results" />
          <p className="mt-3 pl-1 text-sm text-[#8B95A7]">Search an animal in English</p>
        </div>
      </div>
    </header>
  );
}
