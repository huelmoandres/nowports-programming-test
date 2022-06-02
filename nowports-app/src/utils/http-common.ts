import axios, { AxiosError } from "axios";

export const REQUEST_ERROR = 'Compruebe su conexión a internet.';
export const GENERIC_ERROR = 'Ocurrió un error, intente más tarde.';
export const UNAUTHORIZED_ERROR = 'Primero es necesario ingresar al sistema.';
export const USER_ALREADY_EXISTS = "Ya existe un usuario con ese email."

export const generateErrorMessage = (error: AxiosError<any, any>, msgErrorResponse: string) => {
    if (error.code === "ERR_NETWORK") {
        return REQUEST_ERROR;
    }

    if (error.response?.data?.code) {
        switch (error.response.data.code) {
            case 1:
                return GENERIC_ERROR;
            case 5:
                return UNAUTHORIZED_ERROR;
            case 9:
                return USER_ALREADY_EXISTS;
            default:
                return msgErrorResponse;
        }
    } else {
        return msgErrorResponse;
    }
}

export default axios.create({
    baseURL: process.env.REACT_APP_URL_NOWPORTS_API,
    withCredentials: true,
    headers: {
        "Content-type": "application/json"
    }
});