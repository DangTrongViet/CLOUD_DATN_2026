import { motion } from "framer-motion";
import {
  FileText,
  Folder,
  Trash2,
  Star,
  Eye,
  Edit,
  Download,
} from "lucide-react";

export default function FileGrid({
  files,
  onPreview,
  onDelete,
  onRename,
  onDownload,
}) {
  if (!files || files.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500 dark:text-gray-400">
        <Folder className="w-16 h-16 mx-auto mb-4 opacity-50" />
        <p>Thư mục trống</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
      {files.map((file, index) => (
        <motion.div
          key={file.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.03 }}
          className="group relative bg-white dark:bg-[#202124] border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer"
        >
          {/* Nút hành động hiển thị khi hover */}
          <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-all">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPreview(file);
              }}
              className="p-1 hover:bg-gray-100 dark:hover:bg-[#2b2b2b] rounded"
              title="Xem trước"
            >
              <Eye className="w-4 h-4 text-gray-600 dark:text-gray-300" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRename(file);
              }}
              className="p-1 hover:bg-gray-100 dark:hover:bg-[#2b2b2b] rounded"
              title="Đổi tên"
            >
              <Edit className="w-4 h-4 text-gray-600 dark:text-gray-300" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDownload(file);
              }}
              className="p-1 hover:bg-gray-100 dark:hover:bg-[#2b2b2b] rounded"
              title="Tải xuống"
            >
              <Download className="w-4 h-4 text-gray-600 dark:text-gray-300" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(file.id);
              }}
              className="p-1 hover:bg-red-100 dark:hover:bg-red-900 rounded"
              title="Xóa"
            >
              <Trash2 className="w-4 h-4 text-red-500" />
            </button>
          </div>

          {/* Nội dung */}
          <div
            onClick={() => file.type === "folder" && onPreview(file)}
            className="flex flex-col items-center p-6 text-center select-none"
          >
            {file.type === "folder" ? (
              <Folder className="w-14 h-14 text-blue-500 mb-3" />
            ) : (
              <FileText className="w-14 h-14 text-gray-500 mb-3" />
            )}
            <p className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate w-full">
              {file.name}
            </p>
            {file.size && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {Math.round(file.size / 1024)} KB
              </p>
            )}
          </div>

          {/* Dấu sao yêu thích */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              file.starred = !file.starred;
            }}
            className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-all"
            title="Gắn sao"
          >
            <Star
              className={`w-4 h-4 ${
                file.starred
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-400"
              }`}
            />
          </button>
        </motion.div>
      ))}
    </div>
  );
}
