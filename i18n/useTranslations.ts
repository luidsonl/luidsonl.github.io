"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import getDictionary, { Locale, TranslationFunction } from "./getDictionary";

export function useLocale(): Locale {
  const pathname = usePathname();

  return pathname.startsWith("/en") ? "en" : "pt";
}

export function useTranslations(): TranslationFunction {
  const locale = useLocale();

  return useMemo(() => getDictionary(locale), [locale]);
}