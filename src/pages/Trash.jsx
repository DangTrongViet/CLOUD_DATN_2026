import { useContext } from "react";
import { FileContext } from "../context/FileContext";
import { ArrowLeftCircle, Trash2 } from "lucide-react";

export default function Trash() {
  const { trash, restoreFile, deleteForever } = useContext(FileContext);

  if (!trash.length)
    return (
      <div className="flex items-center justify-center h-screen text-gray-500 dark:text-gray-400">
        Thùng rác trống 🗑
      </div>
    );

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Thùng rác</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
        {trash.map((f) => (
          <div
            key={f.id}
            className="bg-white dark:bg-[#2b2b2b] p-4 rounded-lg border border-gray-200 dark:border-gray-600"
          >
            <p className="truncate font-medium text-gray-800 dark:text-gray-100">
              {f.name}
            </p>
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => restoreFile(f.id)}
                className="flex-1 px-2 py-1 bg-green-500 hover:bg-green-600 text-white rounded text-sm"
              >
                <ArrowLeftCircle size={14} className="inline mr-1" /> Khôi phục
              </button>
              <button
                onClick={() => deleteForever(f.id)}
                className="flex-1 px-2 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm"
              >
                <Trash2 size={14} className="inline mr-1" /> Xóa
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
