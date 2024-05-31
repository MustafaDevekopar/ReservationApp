import React, { createContext, useEffect, useState } from "react";
import { UserProfile, UserProfileToken } from "../Models/User";
import { useNavigate } from "react-router";
import { loginAPI, registerAPI } from "../Services/AuthService";
import { toast } from "react-toastify";
import axios from "axios";

type UserContextType = {
    user: UserProfile | null;
    token: string | null;
    registerUser: (email: string, username: string, password: string)  => void;
    loginUser: (username: string, password: string) => void;
    logout: () => void;
    isLoggedIn: () => boolean;
};

type Props = {children: React.ReactNode };

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({children} : Props) => {
    const navigate = useNavigate();
    const [token, setToken] = useState<string | null >(null);
    const [user, setUser] = useState<UserProfile | null >(null);
    const [isReady, setisReady] = useState(false);

    useEffect(() => {
        const user = localStorage.getItem("user");
        const token = localStorage.getItem("token");
        if(user && token) {
            setUser(JSON.parse(user));
            setToken(token);
            axios.defaults.headers.common["Authorization"] = "Bearer" + token;
        }

        setisReady(true);
    }, []);

    const registerUser = async  ( 
        emali: string,
        username: string, 
        password: string 
    ) => {
        await registerAPI(emali, username, password).then((res: any) => {
            if(res) {
                localStorage.setItem("token", res?.data.token)
                const userObj = {
                    userName: res?.data.usreName,
                    email: res?.data.email    
                }
                localStorage.setItem("user", JSON.stringify(userObj));
                setToken(res?.data.token!);
                setUser(userObj!);
                toast.success("تم تسجيل الدخول بنجاح");
                navigate("/reservations/current");
            }
        }).catch((e) => toast.warning("حدث خطأ من جانب السيرفر"))
    }

    const loginUser = async  ( 
        username: string, 
        password: string 
    ) => {
        await loginAPI( username, password).then((res: UserProfileToken | any) => {
            if(res) {
                localStorage.setItem("token", res?.data.token)
                const userObj = {
                    userName: res?.data.usreName,
                    email: res?.data.email    
                }
                localStorage.setItem("user", JSON.stringify(userObj));
                setToken(res?.data.token);
                setUser(userObj!);
                toast.success("تم تسجيل الدخول بنجاح");
                navigate("/reservations/current");
            }
        }).catch((e) => toast.warning("حدث خطأ من جانب السيرفر"))
    };

    const isLoggedIn = () => {
        return !!user;
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setToken("");
        setUser(null);
        navigate("/");
    }

    return (
        <UserContext.Provider value={{loginUser, user, token, logout, isLoggedIn, registerUser }}>
            {isReady ? children : null}


        </UserContext.Provider>)
};

export const useAuth = () => React.useContext(UserContext)