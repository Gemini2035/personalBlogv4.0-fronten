import { userAtom } from "@/store";
import { siteSettingAtom } from "@/store/SiteSetting";
import { useAtomValue } from "jotai";
import { FC, ReactNode, createContext, useContext } from "react";

export interface GlobalConfig {
  token?: string;
  apiBaseUrl: string;
  // TODO: message alert
}

const defaultGlobalConfig: Readonly<GlobalConfig> = {
  apiBaseUrl: import.meta.env.APIBASEURL,
};

const GlobalConfigContext = createContext<GlobalConfig>(defaultGlobalConfig);

export interface GlobalConfigProviderPorp {
  children: ReactNode;
  config?: GlobalConfig;
}

export const GlobalConfigProvider: FC<GlobalConfigProviderPorp> = ({
  children,
  config,
}) => {
  const { token } = useAtomValue(userAtom);
  const test = useAtomValue(siteSettingAtom);
  console.log(test)
  return (
    <GlobalConfigContext.Provider
      value={{
        ...defaultGlobalConfig,
        ...config,
        ...{
          token,
        },
      }}
    >
      {children}
    </GlobalConfigContext.Provider>
  );
};

export const useGlobalConfig = () => useContext(GlobalConfigContext);
