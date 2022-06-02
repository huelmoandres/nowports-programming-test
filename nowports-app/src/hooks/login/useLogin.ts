import { AxiosResponse, AxiosError } from "axios";
import { useMutation } from "react-query";
import { LoginInputs } from "../../types/Login";
import apiClient from "../../utils/http-common";

function useLogin() {
    return useMutation<AxiosResponse<any,any>, AxiosError<any, any>, LoginInputs>(
        async (args: LoginInputs) => {
            return await apiClient.post(`/auth/session/create`, args);
        }
    )
}

export { useLogin };