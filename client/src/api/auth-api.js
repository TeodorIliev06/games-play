import requster from "./requester";

const BASE_URL = "http://localhost:3030/users"

export const login =  (email,password) =>   requster.post(`${BASE_URL}/login`,{email, password});

export const register = (email, password) =>requster.post(`${BASE_URL}/register`,{email, password});

export const logout = () => requster.get(`${BASE_URL}/logout`);
