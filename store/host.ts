import {atom} from "recoil";

export const editHostOpen = atom({
    key: 'editOpen',
    default: false,
});

export const hostState = atom({
    key: 'host',
    default: null,
});
