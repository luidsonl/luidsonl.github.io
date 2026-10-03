import React from "react";

type Props = {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  autoFocus?: boolean;
  children: React.ReactNode;
};

export default function IconButton({
  label,
  onClick,
  disabled = false,
  autoFocus = false,
  children,
}: Props) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      autoFocus={autoFocus}
      className="pointer-events-auto rounded-lg bg-slate-900/60 p-2 text-white ring-1 ring-white/15 backdrop-blur-sm transition-colors hover:bg-slate-900/80 disabled:opacity-40 disabled:hover:bg-slate-900/60"
    >
      {children}
    </button>
  );
}