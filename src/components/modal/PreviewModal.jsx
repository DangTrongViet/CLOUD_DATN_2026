import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function PreviewModal({ isOpen, file, onClose }) {
  if (!file) return null;
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            className="bg-white dark:bg-[#2b2b2b] rounded-lg shadow-xl w-11/12 max-w-4xl overflow-hidden"
          >
            <div className="flex justify-between items-center p-3 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold dark:text-gray-100 truncate">
                {file.name}
              </h2>
              <button
                onClick={onClose}
                className="p-2 rounded hover:bg-gray-100 dark:hover:bg-[#3c4043]"
              >
                <X />
              </button>
            </div>
            <div className="h-[70vh] flex items-center justify-center bg-gray-50 dark:bg-[#202124]">
              {file.url ? (
                file.type.includes("image") ? (
                  <img
                    src={file.url}
                    alt={file.name}
                    className="max-h-full max-w-full rounded"
                  />
                ) : file.type.includes("video") ? (
                  <video src={file.url} controls className="max-h-full max-w-full" />
                ) : file.type.includes("pdf") ? (
                  <iframe
                    src={file.url}
                    title={file.name}
                    className="w-full h-full border-none"
                  ></iframe>
                ) : (
                  <p className="text-gray-400 dark:text-gray-500">
                    Không thể xem trước loại tệp này.
                  </p>
                )
              ) : (
                <p className="text-gray-400 dark:text-gray-500">Tệp trống</p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
