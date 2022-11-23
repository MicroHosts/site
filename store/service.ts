import {atom} from "recoil";

export const editServiceOpen = atom({
    key: 'editServiceOpen',
    default: false,
});

export const serviceState = atom({
    key: 'serviceState',
    default: null,
});
