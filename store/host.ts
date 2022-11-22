import {atom} from "recoil";

export const editOpen = atom({
    key: 'editOpen',
    default: false,
});

export const hostState = atom({
    key: 'host',
    default: null,
});
