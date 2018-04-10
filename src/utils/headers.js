import {getCookie} from "./cookies";

const TOKEN_NAME = "token";

export const getAuthenticatedHeaders = () => {
    if (getCookie(TOKEN_NAME)) {
        return {
            "Authorization": `Bearer ${getCookie(TOKEN_NAME)}`
        }
    }
};