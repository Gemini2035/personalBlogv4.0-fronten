import { useEffect, useState } from "react";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { useNavigate } from "react-router";
import { useGlobalConfig } from "@/hooks/useGlobalConfig";

interface ApiResponseData<DataType, MetaType> {
  status?: number;
  _data?: DataType;
  meta?: MetaType;
}

export interface UseHttpState<DataType, MetaType> {
  loading: boolean;
  _error: string | null;
  _data: ApiResponseData<DataType, MetaType>;
  _code: number | null;
  fetchData?: () => void;
}

export interface UseHttpProps {
  url: string;
  method?: AxiosRequestConfig["method"];
  data?: AxiosRequestConfig["data"];
  headers?: AxiosRequestConfig["headers"];
  isLocal?: boolean;
}

export const useHttp = <DataType, MetaType = unknown>(
  { url, method = "get", data, headers, isLocal = true }: UseHttpProps,
  handleResponse?: (data: UseHttpState<DataType, MetaType>["_data"]) => void
): UseHttpState<DataType, MetaType> => {
  //   const { messageApi } = useContext(AppContext);
  const navigate = useNavigate();
  const { token, apiBaseUrl } = useGlobalConfig();
  const [state, setState] = useState<UseHttpState<DataType, MetaType>>({
    loading: false,
    _error: null,
    _data: {},
    _code: null,
  });

  const fetchData = async () => {
    try {
      setState((prevState) => ({
        ...prevState,
        _data: {},
        _error: null,
        loading: true,
        _code: 0,
      }));
      const response: AxiosResponse<ApiResponseData<DataType, MetaType>> =
        await axios({
          url: isLocal ? `${apiBaseUrl}${url}` : url,
          method,
          ...(method === "get"
            ? {
                params: data,
              }
            : {
                data,
              }),
          headers: {
            ...headers,
            Authorization: token ? `Bearer ${token}` : "",
          },
        });
      setState({
        loading: false,
        _error: null,
        _code: 200,
        _data: response.data,
      });
    } catch (error) {
      const httpStrategy: { [key: number]: () => void } = {
        401: () => {
          navigate("/login");
        },
      };

      const networkError = error as {
        response: {
          data: { meta: { message: string }; message: string };
          status: number;
        };
        message: string;
      };

      const errorMsg =
        networkError?.response?.data?.message ||
        networkError?.response?.data?.meta?.message ||
        networkError?.message;

      // TODO: handle error
      //   try {
      //     errorMsg = JSON.parse(
      //       networkError?.response?.data?.message ||
      //         networkError?.response?.data?.meta?.message ||
      //         networkError?.message
      //     )[language!];
      //   } catch {
      //     errorMsg =
      //       networkError?.response?.data?.message ||
      //       networkError?.response?.data?.meta?.message ||
      //       networkError?.message;
      //   }
      setState({
        loading: false,
        _error: errorMsg,
        _code: networkError.response?.status || 0,
        _data: {},
      });

      console.error(errorMsg);
      httpStrategy[networkError?.response?.status || 401]?.();
    }
  };

  useEffect(() => {
    if (state._code === 200 && !!handleResponse && state._data?.status === 2000)
      handleResponse(state._data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state._code]);

  return {
    ...state,
    fetchData,
  };
};
