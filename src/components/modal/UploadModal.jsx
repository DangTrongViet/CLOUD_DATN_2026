import { motion, AnimatePresence } from "framer-motion";

export default function UploadModal({ isOpen, onClose, onUpload }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white dark:bg-[#2b2b2b] p-6 rounded-xl shadow-lg w-96"
          >
            <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-100">
              Tải tệp lên
            </h3>

            <input
              type="file"
              multiple
              onChange={(e) => onUpload(e.target.files)}
              className="w-full text-sm border border-gray-300 dark:border-gray-600 dark:bg-[#303134] rounded p-2 text-gray-700 dark:text-gray-200"
            />

            <div className="flex justify-end mt-4">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-[#3c4043] dark:hover:bg-[#4c4f54] rounded-md text-gray-700 dark:text-gray-200"
              >
                Đóng
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
