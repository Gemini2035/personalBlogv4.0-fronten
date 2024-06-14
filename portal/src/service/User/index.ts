import { useHttp } from "../useHttp";

export const useLogin = (data) => useHttp({
    url: '/tenants',
    method: 'post',
    data,
})