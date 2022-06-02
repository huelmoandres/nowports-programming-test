import { AxiosResponse, AxiosError } from "axios";
import { useMutation } from "react-query";
import apiClient from "../../utils/http-common";

function useDeleteContact() {
    return useMutation<AxiosResponse<any,any>, AxiosError<any, any>, number>(
        async (id: number) => {
            return await apiClient.delete(`/contact/${id}`);
        }
    )
}

export { useDeleteContact };