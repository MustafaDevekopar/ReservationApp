
import axios from "axios";
import { handleError } from "../Helper/handleError";
import { UserProfileToken } from "../Models/User";

const api = "https://localhost:7249/api/";

export const loginAPI = async (phoneNumber: string, password: string) => {
    try {
        const data = await axios.post<UserProfileToken>(api + "Account/login", {
            phoneNumber: phoneNumber,
            password: password,
        });
        return data;
    } catch (error) {
        handleError(error);
    }
}

export const registerAPI = async (
    phoneNumber: string, 
    username: string, 
    password: string,
    accountType: string
) => {
    try {
        const data = await axios.post<UserProfileToken>(api + "Account/register", {
            phoneNumber: phoneNumber,
            username: username,
            password: password,
            accountType: accountType
        });
        return data;
    } catch (error) {
        handleError(error);
    }
}

//==================== Add admin ===================
export const registerAdminAPI = async (
    phoneNumber: string, 
    username: string, 
    password: string,
    accountType: string
) => {
    try {
        const data = await axios.post<UserProfileToken>(api + "AccountAdmin/register", {
            phoneNumber: phoneNumber,
            username: username,
            password: password,
            accountType: accountType
        });
        return data;
    } catch (error) {
        handleError(error);
    }
}
