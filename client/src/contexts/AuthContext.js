import { createContext } from "react";

export const AuthContext = createContext({
    email: '',
    accsesToken: '',
    isAuthenticated: false,
    changeAuthState: (authState = {}) => null,
});
