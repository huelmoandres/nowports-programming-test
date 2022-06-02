import * as React from 'react';
import { useSessionDestroy } from '../hooks/auth/useSessionDestroy';
import { useGetUser } from "../hooks/auth/useGetUser";
import { useLogin } from "../hooks/login/useLogin";
import { UserType } from "../types/Auth";
import { LoginInputs } from "../types/Login";
import { generateErrorMessage, GENERIC_ERROR } from "../utils/http-common";

interface AuthContextType {
    user: UserType;
    signin: (user: LoginInputs, callback: VoidFunction) => void;
    signout: (callback: VoidFunction) => void;
    error: string | null;
    loading: boolean;
    localLoading: boolean;
    isSuccess: boolean;
    isFetched: boolean;
}

let AuthContext = React.createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const { mutate: mutateLoginUser, isLoading: loadingLogin } = useLogin();
    const { mutate: mutateDestroyUser, isLoading: loadingMutateDestroy } = useSessionDestroy();
    const { data: dataQuery, isLoading, isSuccess, isFetched, refetch: getUser } = useGetUser();
    const [error, setError] = React.useState<string | null>(null);
    const [user, setUser] = React.useState<UserType>(null);
    
    React.useEffect(() => {
        if (isSuccess && dataQuery?.data) {
            setUser(dataQuery.data);
            setError(null);
        }
    }, [dataQuery?.data, isSuccess]);

    const signin = async (data: LoginInputs, callback: VoidFunction) => {
        mutateLoginUser(data, {
            onSuccess: () => {
                getUser().then(response => {
                    if (response?.data?.data) {
                        setUser(response.data.data);
                        setError(null);
                        callback();
                    }
                });
            },
            onError: (err) => {
                setError(generateErrorMessage(err, "Usuario y/o contraseña incorrectos"));
            },
        });
    };

    const signout = (callback: VoidFunction) => {
        mutateDestroyUser(null, {
            onSuccess: () => {
                setUser(null);
                setError(null);
                callback();
            },
            onError: (err) => {
                setError(generateErrorMessage(err, GENERIC_ERROR));
            },
        });
    };

    return <AuthContext.Provider value={{ isFetched: isFetched, isSuccess: isSuccess, user, signin, signout, error, localLoading: isLoading || loadingMutateDestroy || loadingLogin, loading: isLoading || loadingMutateDestroy }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    return React.useContext(AuthContext);
}