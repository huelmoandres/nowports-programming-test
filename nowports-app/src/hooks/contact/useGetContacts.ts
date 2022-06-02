import { useQuery } from "react-query";
import apiClient from "../../utils/http-common";

function useGetContacts() {
    return useQuery('useGetContacts',
        async () => {
            return await apiClient.get("/contact/", {
                withCredentials: true
            });
        }
    );
};

export { useGetContacts };
