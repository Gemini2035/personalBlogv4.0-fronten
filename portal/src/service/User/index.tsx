import { UserInfoWithToken } from "@/store";
import { useHttp } from "../useHttp";
import { useSetAtom } from "jotai";
import { userAtom } from "@/store";

export const useLogin = (data: { email: string; password: string }) => {
  const setUserInfo = useSetAtom(userAtom);
  return useHttp<UserInfoWithToken>(
    {
      url: "/tenants",
      method: "post",
      data,
    },
    ({ _data }) => setUserInfo(_data || {})
  );
};
