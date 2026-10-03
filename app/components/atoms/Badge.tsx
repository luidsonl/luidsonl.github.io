import React from "react";

export default function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 text-xs mb-1 px-2 py-1 rounded-md mr-2">
      {children}
    </span>
  );
}
