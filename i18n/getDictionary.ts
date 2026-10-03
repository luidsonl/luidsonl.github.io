import pt from "./locales/pt.json";
import en from "./locales/en.json";

type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`;
}[keyof ObjectType & (string | number)];

type PtKeys = NestedKeyOf<typeof pt>;
type EnKeys = NestedKeyOf<typeof en>;

export type TranslationKeys = PtKeys | EnKeys;

const resources = {
  pt,
  en,
} as const;

export type Locale = keyof typeof resources;

export type TranslationFunction = (
  key: TranslationKeys,
  params?: Record<string, string | number>,
) => string;

function getValue(dictionary: object, path: string): string {
  const value = path.split(".").reduce<unknown>(
    (accumulator, part) =>
      typeof accumulator === "object" && accumulator !== null
        ? (accumulator as Record<string, unknown>)[part]
        : undefined,
    dictionary
  );

  return typeof value === "string" && value ? value : path;
}

export default function getDictionary(locale: Locale): TranslationFunction {
  const dictionary = resources[locale];

  const t: TranslationFunction = (key, params) => {
    let translation = getValue(dictionary, key);

    if (translation === key) {
      console.warn(`Translation not found: ${key}`);
      translation = key;
    }

    if (params) {
      Object.entries(params).forEach(([param, value]) => {
        translation = translation.replace(`{${param}}`, String(value));
      });
    }

    return translation;
  };

  return t;
}
