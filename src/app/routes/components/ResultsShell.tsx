import { ReactNode } from "react";

interface ResultsShellProps {
  children: ReactNode;
}

export function ResultsShell({ children }: ResultsShellProps) {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_18%_20%,rgba(124,255,124,0.22),transparent_28%),radial-gradient(circle_at_82%_18%,rgba(74,163,255,0.16),transparent_26%),linear-gradient(180deg,#06070B_0%,#0E1118_100%)] text-[#F8FAFC]">
      <div className="mx-auto flex min-h-screen w-full max-w-[1064px] flex-col px-4 py-5 sm:px-6 sm:py-7 lg:px-8 lg:py-8">
        {children}
      </div>
    </main>
  );
}
