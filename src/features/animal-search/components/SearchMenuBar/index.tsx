import React, { useContext } from "react";

import SearchIcon from "../../../../assets/search_icon.svg";
import CloseIcon from "../../../../assets/close_icon.svg";
import { SearchInputContext } from "../../state/searchInput";

interface SearchMenuBarProps {
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
  variant?: "hero" | "results";
}

export function SearchMenuBar({ onSubmit, variant = "hero" }: SearchMenuBarProps) {
  const { searchInput, setSearchInput } = useContext(SearchInputContext);

  const isHero = variant === "hero";
  const placeholder = isHero ? "Search an animal in English" : "Search an animal in English";
  const shellClassName = isHero
    ? "w-full max-w-[560px] rounded-[24px] bg-[#F8FAFC] p-[18px] text-[#0F172A] shadow-[0_16px_50px_rgba(124,255,124,0.13)] transition focus-within:ring-2 focus-within:ring-[#7CFF7C]/70 focus-within:ring-offset-2 focus-within:ring-offset-[#111827]"
    : "w-full rounded-[22px] bg-[#F8FAFC] px-[18px] py-4 text-[#0F172A] shadow-[0_10px_34px_rgba(124,255,124,0.12)] transition focus-within:ring-2 focus-within:ring-[#7CFF7C]/70 focus-within:ring-offset-2 focus-within:ring-offset-[#0A0E14]";

  const resetSearch = () => {
    setSearchInput("");
  };

  function submitSearchInput(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmit?.(e);
  }

  return (
    <form className={shellClassName} onSubmit={submitSearchInput}>
      <div className="flex items-center gap-4">
        <button
          type="submit"
          aria-label="Submit search"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[18px] bg-[#0F172A] text-[#7CFF7C] transition hover:bg-[#111827] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7CFF7C] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F8FAFC]"
        >
          <img className="h-4 w-4" src={SearchIcon} alt="" />
        </button>
        <label className="sr-only" htmlFor="search-input">
          Search
        </label>
        <input
          id="search-input"
          className="w-full min-w-0 rounded-xl border-none bg-transparent px-1 py-2 text-base text-[#0F172A] placeholder:text-[#8B95A7] outline-none focus-visible:ring-0"
          placeholder={placeholder}
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button
          type="button"
          aria-label="Clear search"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[18px] text-[#64748B] transition hover:bg-slate-200/80 hover:text-[#0F172A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7CFF7C] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F8FAFC]"
          onClick={resetSearch}
        >
          <img className="h-4 w-4" src={CloseIcon} alt="" />
        </button>
      </div>
      {isHero ? (
        <div className="mt-4 flex items-center justify-between gap-4 text-sm">
          <span className="text-[#0F172A]">Try: lion, fox, dolphin</span>
          <span className="rounded-full border border-[#0F172A] bg-[#0F172A] px-3 py-2 text-xs font-semibold text-[#F8FAFC]">
            Press Enter
          </span>
        </div>
      ) : null}
    </form>
  );
}
