
import React, { createContext, useEffect, useState } from "react";
import { UserProfile, UserProfileToken } from "../Models/User";
import { useNavigate } from "react-router";
import { loginAPI, registerAPI, registerAdminAPI } from "../Services/AuthService";
import { toast } from "react-toastify";
import axios from "axios";
import {jwtDecode} from "jwt-decode"; // تأكد من استيراد مكتبة فك تشفير التوكن بشكل صحيح

type UserContextType = {
    user: UserProfile | null;
    token: string | null;
    registerUser: (phonenumber: string, username: string, password: string, accountType: string) => void;
    registerAdmin: (phonenumber: string, username: string, password: string, accountType: string) => void;
    loginUser: (username: string, password: string) => void;
    logout: () => void;
    isLoggedIn: () => boolean;
    hasRole: (roles: string[]) => boolean;
};

type Props = { children: React.ReactNode };

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: Props) => {
    const navigate = useNavigate();
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<UserProfile | null>(null);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            const decodedToken: any = jwtDecode(storedToken); // تأكد من استخدام jwt_decode كدالة
            const userObj: UserProfile = {
                userName: decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
                phonenumber: decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/mobilephone"],
                accountType: decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"],
            };
            setUser(userObj);
            setToken(storedToken);
            axios.defaults.headers.common["Authorization"] = "Bearer " + storedToken;
        }
        setIsReady(true);
    }, []);

    const registerUser = async (phonenumber: string, username: string, password: string, accountType: string) => {
        await registerAPI(phonenumber, username, password, accountType).then((res: any) => {
            if (res) {
                const token = res?.data.token;
                localStorage.setItem("token", token);
                const decodedToken: any = jwtDecode(token);
                const userObj: UserProfile = {
                    userName: decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
                    phonenumber: decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/mobilephone"],
                    accountType: decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"],
                };
                localStorage.setItem("user", JSON.stringify(userObj));
                setToken(token);
                setUser(userObj);
                toast.success("تم تسجيل الدخول بنجاح");
                navigate("/reservations/current");
            }
        }).catch((e) => toast.warning("حدث خطأ من جانب السيرفر"));
    };
    const registerAdmin = async (phonenumber: string, username: string, password: string, accountType: string) => {
        await registerAdminAPI(phonenumber, username, password, accountType).then((res: any) => {
            if (res) {
                const token = res?.data.token;
                localStorage.setItem("token", token);
                const decodedToken: any = jwtDecode(token);
                const userObj: UserProfile = {
                    userName: decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
                    phonenumber: decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/mobilephone"],
                    accountType: decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"],
                };
                localStorage.setItem("user", JSON.stringify(userObj));
                setToken(token);
                setUser(userObj);
                toast.success("تم تسجيل الدخول بنجاح");
                navigate("/reservations/current");
            }
        }).catch((e) => toast.warning("حدث خطأ من جانب السيرفر"));
    };

    const loginUser = async (username: string, password: string) => {
        await loginAPI(username, password).then((res: UserProfileToken | any) => {
            if (res) {
                const token = res?.data.token;
                localStorage.setItem("token", token);
                const decodedToken: any = jwtDecode(token);
                const userObj: UserProfile = {
                    userName: decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
                    phonenumber: decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/mobilephone"],
                    accountType: decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"],
                };
                localStorage.setItem("user", JSON.stringify(userObj));
                setToken(token);
                setUser(userObj);
                toast.success("تم تسجيل الدخول بنجاح");
                navigate("/reservations/current");
            }
        }).catch((e) => toast.warning("حدث خطأ من جانب السيرفر"));
    };

    const isLoggedIn = () => {
        return !!user;
    };

    const hasRole = (roles: string[]) => {
        if (!user) return false;
        return roles.includes(user.accountType);
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setToken(null);
        setUser(null);
        navigate("/");
    };

    return (
        <UserContext.Provider value={{ loginUser, user, token, logout, isLoggedIn, registerUser, registerAdmin ,hasRole }}>
            {isReady ? children : null}
        </UserContext.Provider>
    );
};

export const useAuth = () => React.useContext(UserContext);
