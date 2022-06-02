import { AxiosResponse, AxiosError } from "axios";
import { useMutation } from "react-query";
import apiClient from "../../utils/http-common";

function useSessionDestroy() {
    return useMutation<AxiosResponse<any,any>, AxiosError<any, any>, null>(
        async () => {
            return await apiClient.delete(`/auth/session/destroy`);
        }
    )
}

export { useSessionDestroy };