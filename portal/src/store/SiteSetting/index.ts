import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export type LanguageType = 'en-US' | 'zh-CN'

export interface SiteSetting {
  isDark: boolean;
  language: LanguageType;
}

const defaultSiteSetting: Readonly<SiteSetting> = {
  isDark: window.matchMedia("(prefers-color-scheme: dark)").matches,
  language: navigator.language as LanguageType || 'zh-CN',
};

const siteSettingCoreAtom = atomWithStorage<SiteSetting>(
  "site-setting",
  defaultSiteSetting,
  undefined,
  {
    getOnInit: true,
  }
);

export const siteSettingAtom = atom(
  (get) => get(siteSettingCoreAtom),
  (get, set, newValue: Partial<SiteSetting>) =>
    set(siteSettingCoreAtom, { ...get(siteSettingCoreAtom), ...newValue })
);
