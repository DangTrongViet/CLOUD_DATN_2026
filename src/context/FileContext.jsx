import React, { createContext, useContext, useState, useEffect } from "react";
import fileAPI from "../api/file.api";
import folderAPI from "../api/folder.api";

export const FileContext = createContext();
export const useFiles = () => useContext(FileContext);

export default function FileProvider({ children }) {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentFolder, setCurrentFolder] = useState("root");
  const [error, setError] = useState(null);

  const bucketName = "default";

  // 📥 Load danh sách file
  const fetchFiles = async () => {
    setLoading(true);
    try {
      const res = await fileAPI.list(bucketName);
      setFiles(res.data.objects || []); // Tùy cấu trúc backend
      setError(null);
    } catch (err) {
      console.error("Lỗi khi tải file:", err);
      setError("Không thể tải danh sách file");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, [currentFolder]);

  // 📤 Upload file
  const uploadFile = async (file) => {
    try {
      await fileAPI.upload(file);
      fetchFiles();
    } catch (err) {
      console.error("Upload thất bại:", err);
      setError("Không thể tải lên file");
    }
  };

  // 🗑️ Xóa file
  const deleteFile = async (key) => {
    try {
      await fileAPI.delete(key);
      setFiles((prev) => prev.filter((f) => f.key !== key));
    } catch (err) {
      console.error("Xóa file thất bại:", err);
      setError("Không thể xóa file");
    }
  };

  // ♻️ Khôi phục file
  const restoreFile = async (key) => {
    try {
      await fileAPI.restore(key);
      fetchFiles();
    } catch (err) {
      console.error("Khôi phục thất bại:", err);
      setError("Không thể khôi phục file");
    }
  };

  // ✏️ Đổi tên file
  const renameFile = async (oldKey, newKey) => {
    try {
      await fileAPI.rename(oldKey, newKey);
      fetchFiles();
    } catch (err) {
      console.error("Đổi tên thất bại:", err);
      setError("Không thể đổi tên file");
    }
  };

  // 📁 Tạo thư mục
  const createFolder = async (name) => {
    try {
      await folderAPI.create(name);
      fetchFiles();
    } catch (err) {
      console.error("Tạo thư mục thất bại:", err);
      setError("Không thể tạo thư mục");
    }
  };

  const value = {
    files,
    loading,
    error,
    currentFolder,
    setCurrentFolder,
    fetchFiles,
    uploadFile,
    deleteFile,
    restoreFile,
    renameFile,
    createFolder,
  };

  return (
    <FileContext.Provider value={value}>
      {children}
    </FileContext.Provider>
  );
}
