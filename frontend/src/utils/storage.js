
const TOKEN_KEY = 'authToken';
const USER_KEY = 'userData';

// --- JWT Token Management ---

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const setToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
  removeUser(); // Also remove user data on logout
};

// --- User Data Management ---

export const getUser = () => {
  const user = localStorage.getItem(USER_KEY);
  try {
    return user ? JSON.parse(user) : null;
  } catch (e) {
    console.error("Could not parse user data from localStorage", e);
    return null;
  }
};

export const setUser = (data) => {
  localStorage.setItem(USER_KEY, JSON.stringify(data));
};

export const removeUser = () => {
  localStorage.removeItem(USER_KEY);
};

// --- Combined Auth Setter ---

export const setAuthData = ({ token, _id, username, email }) => {
  setToken(token);
  setUser({ _id, username, email });
};