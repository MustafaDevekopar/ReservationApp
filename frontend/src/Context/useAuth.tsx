
import React, { createContext, useEffect, useState } from "react";
import { UserProfile, UserProfileToken } from "../Models/User";
import { useNavigate } from "react-router";
import { loginAPI, registerAPI } from "../Services/AuthService";
import { toast } from "react-toastify";
import axios from "axios";

type UserContextType = {
    user: UserProfile | null;
    token: string | null;
    registerUser: (email: string, username: string, password: string, accountType: string) => void;
    loginUser: (username: string, password: string) => void;
    logout: () => void;
    isLoggedIn: () => boolean;
};

type Props = { children: React.ReactNode };

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: Props) => {
    const navigate = useNavigate();
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<UserProfile | null>(null);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const storedToken = localStorage.getItem("token");
        if (storedUser && storedToken) {
            setUser(JSON.parse(storedUser));
            setToken(storedToken);
            axios.defaults.headers.common["Authorization"] = "Bearer " + storedToken;
        }

        setIsReady(true);
    }, []);

    const registerUser = async (email: string, username: string, password: string, accountType: string) => {
        await registerAPI(email, username, password, accountType).then((res: any) => {
            if (res) {
                localStorage.setItem("token", res?.data.token);
                const userObj: UserProfile = {
                    userName: res?.data.userName,
                    email: res?.data.email,
                    accountType: res?.data.accountType,
                };
                localStorage.setItem("user", JSON.stringify(userObj));
                setToken(res?.data.token);
                setUser(userObj);
                toast.success("تم تسجيل الدخول بنجاح");
                navigate("/reservations/current");
            }
        }).catch((e) => toast.warning("حدث خطأ من جانب السيرفر"));
    };

    const loginUser = async (username: string, password: string) => {
        await loginAPI(username, password).then((res: UserProfileToken | any) => {
            if (res) {
                localStorage.setItem("token", res?.data.token);
                const userObj: UserProfile = {
                    userName: res?.data.userName,
                    email: res?.data.email,
                    accountType: res?.data.accountType,
                };
                localStorage.setItem("user", JSON.stringify(userObj));
                setToken(res?.data.token);
                setUser(userObj);
                toast.success("تم تسجيل الدخول بنجاح");
                navigate("/reservations/current");
            }
        }).catch((e) => toast.warning("حدث خطأ من جانب السيرفر"));
    };

    const isLoggedIn = () => {
        return !!user;
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setToken(null);
        setUser(null);
        navigate("/");
    };

    return (
        <UserContext.Provider value={{ loginUser, user, token, logout, isLoggedIn, registerUser }}>
            {isReady ? children : null}
        </UserContext.Provider>
    );
};

export const useAuth = () => React.useContext(UserContext);

