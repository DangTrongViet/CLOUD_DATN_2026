import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { Search, Sun, Moon, UserCircle } from "lucide-react";

export default function Header({ search, setSearch }) {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header className="flex items-center px-5 py-3 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-[#202124] transition-all">
      <div className="flex items-center gap-3 flex-shrink-0">
        <img
          src="https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_48dp.png"
          alt="logo"
          className="w-8 h-8"
        />
        <h1 className="text-lg font-medium text-gray-700 dark:text-gray-100">
          Drive
        </h1>
      </div>

      <div className="flex-1 mx-8 max-w-2xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm kiếm trong Drive"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-[#303134] rounded-full text-gray-700 dark:text-gray-200 focus:bg-white dark:focus:bg-[#3c4043] outline-none transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
        <button
          onClick={toggleTheme}
          className="p-2 hover:bg-gray-100 dark:hover:bg-[#3c4043] rounded-full transition-all"
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <UserCircle size={22} className="cursor-pointer hover:text-blue-500" />
      </div>
    </header>
  );
}
