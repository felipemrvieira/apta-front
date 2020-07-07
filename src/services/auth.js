export const TOKEN_KEY = "@airbnb-Token";
export const UID = "uid";
export const CLIENT = "client";

export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const getUid = () => localStorage.getItem(UID);
export const getClient = () => localStorage.getItem(CLIENT);

export const login = (token, client, uid) => {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(CLIENT, client);
    localStorage.setItem(UID, uid);
};
export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(CLIENT);
    localStorage.removeItem(UID);
};