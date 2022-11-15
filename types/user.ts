import { ISODateString } from "next-auth";

export interface User{
    id: string;
    name: string;
    email: string;
    balance: {
        balance: number;
    }
    emailVerified: boolean,
}

export interface SessionUser{
    user: {
        name: string,
        email: string,
    },
    expires: ISODateString,
}
