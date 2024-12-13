import { login, logout, register } from "../api/auth-api";
import { useAuthContext } from "../contexts/AuthContext";

export const useLogin = () => {
  const { changeAuthState } = useAuthContext();
  const loginHandler = async (email, password) => {
    const { password: _, ...result } = await login(email, password);
    changeAuthState(result);
    return result;
  };
  return loginHandler;
};

export const useRegister = () => {
  const { changeAuthState } = useAuthContext();
  const registerHandler = async (email, password) => {
    const { password: _, ...result } = await register(email, password);
    changeAuthState(result);
    return result;
  };
  return registerHandler;
};

export const useLogout = () => {
  const { logout: localLogout } = useAuthContext();

  const logoutHandler = async () => {
    localLogout();
    
    await logout();
  };

  return logoutHandler;
};
