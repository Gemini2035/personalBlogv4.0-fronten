import { siteSettingAtom } from "@/store/SiteSetting";
import { useAtomValue } from "jotai";

export const useTransition = () => {
  const { language } = useAtomValue(siteSettingAtom);

  const t = async (transitionKey: string) => {
    try {
      const [keyInfo, ...pathInfo] = transitionKey.split(".").reverse();

      return (await import(`../locales/${pathInfo.reverse().join("/")}`)).default[
        language
      ][keyInfo];
    } catch {
      return transitionKey;
    }
  };

  return {
    t,
  };
};
