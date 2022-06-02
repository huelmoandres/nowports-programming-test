import { AxiosResponse, AxiosError } from "axios";
import { useMutation } from "react-query";
import { RegisterInputs } from "src/types/Register";
import apiClient from "../../utils/http-common";

function useRegister() {
    return useMutation<AxiosResponse<any,any>, AxiosError<any, any>, RegisterInputs>(
        async (args: RegisterInputs) => {
            return await apiClient.post(`/user/`, args);
        }
    )
}

export { useRegister };