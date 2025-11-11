import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function Login() {
  const { login } = useContext(AuthContext);
  const nav = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = login(form.email, form.password);
    if (success) {
      toast.success("Đăng nhập thành công!");
      nav("/");
    } else toast.error("Sai email hoặc mật khẩu!");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-[#202124] transition">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-[#2b2b2b] p-6 rounded-xl shadow-lg w-96"
      >
        <h2 className="text-xl font-semibold text-center mb-4 dark:text-gray-100">
          Đăng nhập Drive
        </h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 p-2 border rounded dark:bg-[#303134] dark:border-gray-600"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          className="w-full mb-4 p-2 border rounded dark:bg-[#303134] dark:border-gray-600"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
          Đăng nhập
        </button>
        <p className="text-sm mt-3 text-center text-gray-500 dark:text-gray-400">
          Chưa có tài khoản?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Đăng ký
          </Link>
        </p>
      </form>
    </div>
  );
}
