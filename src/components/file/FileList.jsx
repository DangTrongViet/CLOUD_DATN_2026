import { motion } from "framer-motion";
import { FileText, Folder, Trash2, Edit, Eye, Download } from "lucide-react";

export default function FileList({
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
        <p>Không có tệp nào trong thư mục này</p>
      </div>
    );
  }

  return (
    <div className="w-full divide-y divide-gray-100 dark:divide-gray-700 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#202124] shadow-sm overflow-hidden">
      {files.map((file, index) => (
        <motion.div
          key={file.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.03 }}
          className="group flex items-center justify-between px-5 py-3 hover:bg-gray-50 dark:hover:bg-[#2b2b2b] transition-colors cursor-pointer"
        >
          <div
            className="flex items-center gap-3 flex-1"
            onClick={() => file.type === "folder" && onPreview(file)}
          >
            {file.type === "folder" ? (
              <Folder className="w-5 h-5 text-blue-500" />
            ) : (
              <FileText className="w-5 h-5 text-gray-500" />
            )}
            <span className="truncate font-medium text-gray-800 dark:text-gray-100">
              {file.name}
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            {file.size ? (
              <span>{Math.round(file.size / 1024)} KB</span>
            ) : (
              <span>—</span>
            )}
          </div>

          {/* Hành động */}
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPreview(file);
              }}
              className="p-1 hover:bg-gray-100 dark:hover:bg-[#3c4043] rounded"
              title="Xem trước"
            >
              <Eye className="w-4 h-4 text-gray-600 dark:text-gray-300" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRename(file);
              }}
              className="p-1 hover:bg-gray-100 dark:hover:bg-[#3c4043] rounded"
              title="Đổi tên"
            >
              <Edit className="w-4 h-4 text-gray-600 dark:text-gray-300" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDownload(file);
              }}
              className="p-1 hover:bg-gray-100 dark:hover:bg-[#3c4043] rounded"
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
        </motion.div>
      ))}
    </div>
  );
}
