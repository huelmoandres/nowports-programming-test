import { AxiosResponse, AxiosError } from "axios";
import { useMutation } from "react-query";
import { ContactType } from "../../types/Contact";
import apiClient from "../../utils/http-common";

function useContactCreate() {
    return useMutation<AxiosResponse<any,any>, AxiosError<any, any>, ContactType>(
        async (args: ContactType) => {
            return await apiClient.post(`/contact/`, args);
        }
    )
}

export { useContactCreate };