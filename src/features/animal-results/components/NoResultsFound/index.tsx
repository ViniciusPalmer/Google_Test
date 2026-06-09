interface INoResultsFound {
  searchText?: string;
  suggestionList: string[];
  onSuggestionSelect?: (value: string) => void;
}

export function NoResultsFound({
  searchText,
  suggestionList,
  onSuggestionSelect,
}: INoResultsFound) {
  const hasSuggestions = suggestionList.length > 0;

  return (
    <section
      role="status"
      aria-live="polite"
      className="flex min-h-[320px] w-full items-center justify-center rounded-[28px] border border-dashed border-white/10 bg-[#0F172A]/75 px-6 py-10 text-center shadow-[0_20px_50px_rgba(0,0,0,0.24)]"
    >
      <div className="max-w-xl">
        {searchText ? (
          <p className="text-xl font-semibold text-[#F8FAFC]">No matches found for {searchText}.</p>
        ) : (
          <p className="text-xl font-semibold text-[#F8FAFC]">Start searching to explore the animal catalog.</p>
        )}
        <p className="mt-3 text-sm leading-6 text-[#AAB3C5]">
          Try a broader term or browse one of the available animal types from the local dataset.
        </p>
        {hasSuggestions ? (
          <div className="mt-6">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8B95A7]">
              Try one of these animal types:
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-3">
              {suggestionList.map((item) => (
                <button
                  key={item}
                  type="button"
                  className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm font-medium text-[#F8FAFC] transition hover:border-[#7CFF7C]/50 hover:bg-[#7CFF7C]/10 hover:text-[#7CFF7C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7CFF7C] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F172A]"
                  onClick={() => onSuggestionSelect?.(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
