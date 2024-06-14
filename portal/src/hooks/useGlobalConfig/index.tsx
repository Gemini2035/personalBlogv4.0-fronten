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
  config: Partial<GlobalConfig>;
}

export const GlobalConfigProvider: FC<GlobalConfigProviderPorp> = ({
  children,
  config,
}) => {
  return (
    <GlobalConfigContext.Provider value={{ ...defaultGlobalConfig, ...config }}>
      {children}
    </GlobalConfigContext.Provider>
  );
};

export const useGlobalConfig = () => useContext(GlobalConfigContext);

