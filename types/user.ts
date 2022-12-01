import { ISODateString } from "next-auth";

export interface User{
    id: string;
    name: string;
    email: string;
    emailVerified: boolean | null;
    balance: {
        amount: number;
    }
}

export interface UserInfo{
    id: string | null;
    first_name: string | null;
    last_name: string | null;
    second_name: string | null;
    phone_number: string | null;
}
