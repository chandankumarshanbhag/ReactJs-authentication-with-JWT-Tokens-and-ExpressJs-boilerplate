import { useContext, createContext, useState, useEffect } from "react";
import Cookies from "js-cookie"
import http from "../http"

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        checkLoogedIn();
    }, []);

    async function checkLoogedIn() {
        setLoading(true);
        let key = Cookies.get("auth_key");
        if (typeof key == "string" && key != "") {
            let { data } = await http.post("/authenticate", { key });
            if (data.ok == 0) {
                //Valid token
                setTimeout(() => {
                    setUser(data.user);
                    setLoading(false);
                }, 1000)
                return true;
            } else if (data.ok == -1) {
                //Token expired
                Cookies.remove("auth_key");
                setUser(null)
                setLoading(false);
                return false;
            } else {
                throw Error("Invalid Response");
            }
        } else {
            setLoading(false);
            Cookies.remove("auth_key");
            setUser(null);
        }

    }
    async function login(username, password) {
        setLoading(true);
        let { data } = await http.post("/login", { username, password });
        if (data.ok == 0) {
            setTimeout(() => {
                Cookies.set("auth_key", data.key, { expires: 7 });
                setUser({ user: data.user, key: data.key });
                setLoading(false);
            }, 1000);
            return true;
        } else if (data.ok == -1) {
            setLoading(false);
            return false;
        } else {
            throw Error("Invalid Response");
        }
    }
    function logout() {
        setLoading(true);
        Cookies.remove("auth_key");
        setUser(null);
        setLoading(false);
    }
    function isLoggedIn() {
        return Boolean(user);
    }

    return <AuthContext.Provider value={{ isLoggedIn, login, logout, loading }}>{children}</AuthContext.Provider>
}

export default function useAuth() {
    const value = useContext(AuthContext);
    return value;
}