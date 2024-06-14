import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export interface UserInfoWithToken {
  token: string;
  userInfo: UserInfo;
}

export interface UserInfo {
  id: number;
  name: string;
  email: string;
  avatar: string;
}

const userCoreAtom = atomWithStorage<UserInfoWithToken>(
  "user-about",
  {} as UserInfoWithToken,
  undefined,
  {
    getOnInit: true,
  }
);

export const userAtom = atom(
  (get) => get(userCoreAtom),
  (get, set, newValue: Partial<UserInfoWithToken>) =>
    set(userCoreAtom, { ...get(userCoreAtom), ...newValue })
);
