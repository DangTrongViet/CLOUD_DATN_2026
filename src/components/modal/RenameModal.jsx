import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function RenameModal({ isOpen, file, onClose, onSave }) {
  const [name, setName] = useState("");

  useEffect(() => {
    if (file) setName(file.name);
  }, [file]);

  if (!file) return null;

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
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            className="bg-white dark:bg-[#2b2b2b] p-6 rounded-xl shadow-lg w-96"
          >
            <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-100">
              Đổi tên tệp
            </h3>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 dark:bg-[#303134] rounded px-3 py-2 mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={onClose}
                className="px-3 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-[#3c4043] dark:hover:bg-[#4c4f54] rounded-md"
              >
                Hủy
              </button>
              <button
                onClick={() => {
                  onSave(file.id, name);
                  onClose();
                }}
                className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
              >
                Lưu
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
