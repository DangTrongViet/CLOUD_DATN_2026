import { createContext, useState, useEffect } from "react";
import authAPI from "../api/auth.api";
import toast from "react-hot-toast";
import storageService from "../services/storage.service";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    try {
      const res = await authAPI.login({ email, password });
      if (res.data?.access_token) {
        storageService.setToken(res.data.access_token);
        const profile = await authAPI.getProfile();
        storageService.setUser(profile.data);
        setUser(profile.data);
        toast.success("Đăng nhập thành công!");
      }
    } catch (error) {
      toast.error("Sai tài khoản hoặc mật khẩu!");
    }
  };

  const register = async (email, password) => {
    if (!email.endsWith("@gmail.com")) {
      toast.error("Email phải có đuôi @gmail.com");
      return;
    }
    await authAPI.register({ email, password });
    toast.success("Đăng ký thành công!");
  };

  const logout = async () => {
    await authAPI.logout();
    storageService.removeToken();
    storageService.removeUser();
    setUser(null);
    toast.success("Đã đăng xuất!");
  };

  useEffect(() => {
    const u = storageService.getUser();
    if (u) setUser(u);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
