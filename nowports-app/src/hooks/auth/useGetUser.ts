import { useQuery } from "react-query";
import apiClient from "../../utils/http-common";

function useGetUser() {
    return useQuery('useGetUser',
        async () => {
            return await apiClient.get("/auth/session/me", {
                withCredentials: true
            });
        },
        {
            retry: 0,
            staleTime: 1,
            cacheTime: 1
        }
    );
};

export { useGetUser };
