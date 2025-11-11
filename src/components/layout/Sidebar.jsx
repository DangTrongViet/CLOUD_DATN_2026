import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Folder,
  Share2,
  Star,
  Trash2,
  Plus,
  FolderPlus,
  Upload,
} from "lucide-react";
import { FileContext } from "../../context/FileContext";

export default function Sidebar({ onUploadClick }) {
  const nav = useNavigate();
  const { totalMB } = useContext(FileContext);
  const [showMenu, setShowMenu] = useState(false);

  const handleCreateFolder = () => {
    const name = prompt("Nhập tên thư mục mới:");
    if (name) {
      const event = new CustomEvent("create-folder", { detail: name });
      window.dispatchEvent(event);
    }
    setShowMenu(false);
  };

  const percent = Math.min((totalMB / 15000) * 100, 100);

  return (
    <aside className="w-60 border-r border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-[#202124] flex flex-col transition-all">
      <div className="relative mb-3">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="w-full flex items-center gap-3 px-4 py-2 bg-white dark:bg-[#303134] border border-gray-200 dark:border-gray-600 rounded-full shadow hover:bg-gray-50 dark:hover:bg-[#3a3a3a] transition-all"
        >
          <Plus className="w-4 h-4" />
          <span className="font-medium text-gray-700 dark:text-gray-200">
            Mới
          </span>
        </button>

        {showMenu && (
          <div className="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-[#2b2b2b] border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-10">
            <button
              onClick={handleCreateFolder}
              className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-[#3c4043]"
            >
              <FolderPlus className="w-4 h-4 mr-2" /> Thư mục mới
            </button>
            <label className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-[#3c4043] cursor-pointer">
              <Upload className="w-4 h-4 mr-2" /> Tải lên tệp
              <input
                type="file"
                className="hidden"
                onChange={(e) => onUploadClick(e.target.files)}
              />
            </label>
          </div>
        )}
      </div>

      <nav className="flex-1 space-y-1">
        <button
          onClick={() => nav("/")}
          className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#3a3a3a] text-gray-700 dark:text-gray-300 transition-all"
        >
          <Folder className="w-4 h-4" /> Drive của tôi
        </button>
        <button
          onClick={() => nav("/shared")}
          className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#3a3a3a] text-gray-700 dark:text-gray-300"
        >
          <Share2 className="w-4 h-4" /> Được chia sẻ
        </button>
        <button
          onClick={() => nav("/starred")}
          className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#3a3a3a] text-gray-700 dark:text-gray-300"
        >
          <Star className="w-4 h-4" /> Có gắn sao
        </button>
        <button
          onClick={() => nav("/trash")}
          className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#3a3a3a] text-gray-700 dark:text-gray-300"
        >
          <Trash2 className="w-4 h-4" /> Thùng rác
        </button>
      </nav>

      <div className="mt-auto border-t border-gray-200 dark:border-gray-700 pt-3 text-sm text-gray-600 dark:text-gray-400">
        <div className="flex justify-between mb-1">
          <span>Bộ nhớ</span>
          <span>{totalMB} MB / 15000 MB</span>
        </div>
        <div className="w-full bg-gray-300 dark:bg-gray-700 h-1.5 rounded-full">
          <div
            className="bg-blue-500 h-1.5 rounded-full"
            style={{ width: `${percent}%` }}
          ></div>
        </div>
      </div>
    </aside>
  );
}
