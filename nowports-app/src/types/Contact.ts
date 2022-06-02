export type ContactType = {
    id: number;
    firstName: string;
    lastName: string;
    userId: number;
    phone: string;
    addresses: {
        address: string
    }[];
}