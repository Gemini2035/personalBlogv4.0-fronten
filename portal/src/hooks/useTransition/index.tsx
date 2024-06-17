import { LanguageType, siteSettingAtom } from "@/store/SiteSetting";
import { useAtomValue } from "jotai";

type LanguageJsonType = Record<LanguageType, Record<string, string>>;

const localesJson = import.meta.glob<{ default: LanguageJsonType }>(
  "@/locales/*.json",
  { eager: true }
);
console.log(localesJson);

export const useTransition = () => {
  const { language } = useAtomValue(siteSettingAtom);

  const t = (transitionKey: string) => {
    try {
      const [keyInfo, ...pathInfo] = transitionKey.split(".").reverse();
      return localesJson[`/src/locales/${pathInfo.reverse().join("/")}.json`]
        .default[language][keyInfo];
    } catch {
      return transitionKey;
    }
  };

  return {
    t,
  };
};
