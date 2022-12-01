import {atom} from "recoil";

export const deleteStore = atom({
    key: 'deleteStore',
    default: {
        open: false as boolean,
        onDelete: () => {},
    },
});
