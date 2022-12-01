import { User } from "@/types/user";
import {atom} from "recoil";

export const userState = atom({
    key: 'user',
    default: {} as User,
});