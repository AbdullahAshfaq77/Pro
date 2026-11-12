import api from "../../api.js";

export const login = async (token) => {
  try {
    const { data } = await api.post("/api/auth/login", { token });
    return data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    const { data } = await api.get("/api/auth/logout");
    console.log(data);
    return data;
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
};

export const me = async () => {
  try {
    const { data } = await api.get("/api/auth/me");
    console.log(data);
    return data;
  } catch (error) {
    console.error("User fetch error:", error);
    throw error;
  }
};

