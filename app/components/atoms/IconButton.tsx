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
      className="pointer-events-auto rounded-md p-2 text-slate-300 transition-colors hover:bg-white/10 hover:text-white disabled:opacity-40 disabled:hover:bg-transparent"
    >
      {children}
    </button>
  );
}