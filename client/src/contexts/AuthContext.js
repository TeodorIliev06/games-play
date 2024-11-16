import { createContext } from "react";

export const AuthContext = createContext({
    userId: '',
    email: '',
    accsesToken: '',
    isAuthenticated: false,
    changeAuthState: (authState = {}) => null,
});
