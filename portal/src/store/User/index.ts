import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export interface UserProtocol {
  token: string;
  userInfo: UserInfo;
}

export interface UserInfo {
  id: number;
  name: string;
  email: string;
  avatar: string;
}

const userCoreAtom = atomWithStorage<UserProtocol>(
  "user-about",
  {} as UserProtocol,
  undefined,
  {
    getOnInit: true,
  }
);

export const userAtom = atom(
  (get) => get(userCoreAtom),
  (get, set, newValue: Partial<UserProtocol>) =>
    set(userCoreAtom, { ...get(userCoreAtom), ...newValue })
);