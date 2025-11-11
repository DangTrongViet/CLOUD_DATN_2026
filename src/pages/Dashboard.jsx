import React, { useState } from "react";
import { useFiles } from "../context/FileContext";
import {
  Folder,
  File,
  Upload,
  Plus,
  Trash2,
  RefreshCcw,
  Edit3,
  FolderPlus,
} from "lucide-react";

export default function Dashboard() {
  const {
    files,
    loading,
    error,
    uploadFile,
    deleteFile,
    renameFile,
    createFolder,
    fetchFiles,
  } = useFiles();

  const [showUpload, setShowUpload] = useState(false);
  const [view, setView] = useState("grid");
  const [search, setSearch] = useState("");
  const [renameData, setRenameData] = useState({ key: "", newName: "" });

  const filteredFiles = files.filter((item) =>
    item.name?.toLowerCase().includes(search.toLowerCase())
  );

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) uploadFile(file);
    setShowUpload(false);
  };

  const handleRename = async () => {
    if (renameData.key && renameData.newName) {
      await renameFile(renameData.key, renameData.newName);
      setRenameData({ key: "", newName: "" });
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-800">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-sm border-r flex flex-col">
        <div className="p-4">
          <button
            onClick={() => setShowUpload(!showUpload)}
            className="flex items-center gap-3 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 w-full"
          >
            <Plus className="w-5 h-5" />
            Mới
          </button>

          {showUpload && (
            <div className="bg-white shadow-lg rounded-lg border mt-2 overflow-hidden">
              <label className="flex items-center gap-3 p-3 hover:bg-gray-100 cursor-pointer">
                <Upload className="w-4 h-4" />
                <span>Tải tệp lên</span>
                <input
                  type="file"
                  onChange={handleUpload}
                  className="hidden"
                />
              </label>
              <button
                onClick={() => {
                  const name = prompt("Nhập tên thư mục mới:");
                  if (name) createFolder(name);
                }}
                className="flex items-center gap-3 p-3 hover:bg-gray-100 w-full"
              >
                <FolderPlus className="w-4 h-4" />
                <span>Thư mục mới</span>
              </button>
            </div>
          )}
        </div>

        <nav className="flex-1 p-4 space-y-2 text-gray-700">
          <button
            onClick={fetchFiles}
            className="flex items-center gap-3 px-3 py-2 w-full hover:bg-gray-100 rounded-lg"
          >
            <RefreshCcw className="w-4 h-4" /> Làm mới
          </button>
          <button className="flex items-center gap-3 px-3 py-2 w-full hover:bg-gray-100 rounded-lg">
            <Trash2 className="w-4 h-4" /> Thùng rác
          </button>
        </nav>

        <div className="p-4 border-t text-sm text-gray-600">
          <p>Đã dùng: <span className="font-medium text-gray-800">1.1 GB</span></p>
          <div className="w-full h-1.5 bg-gray-200 rounded mt-1">
            <div className="h-1.5 bg-blue-500 rounded" style={{ width: "15%" }}></div>
          </div>
          <p className="mt-1 text-xs text-gray-500">Tổng: 15 GB</p>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-semibold">Drive của tôi</h1>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Tìm kiếm tệp..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border px-4 py-2 rounded-lg w-64"
            />
            <button
              className={`px-3 py-2 rounded-lg border ${
                view === "grid" ? "bg-blue-600 text-white" : "bg-white"
              }`}
              onClick={() => setView("grid")}
            >
              Lưới
            </button>
            <button
              className={`px-3 py-2 rounded-lg border ${
                view === "list" ? "bg-blue-600 text-white" : "bg-white"
              }`}
              onClick={() => setView("list")}
            >
              Danh sách
            </button>
          </div>
        </div>

        {loading && (
          <div className="text-gray-500 text-center py-10">Đang tải dữ liệu...</div>
        )}
        {error && (
          <div className="text-red-500 text-center py-10">{error}</div>
        )}

        {!loading && filteredFiles.length === 0 && (
          <div className="text-center text-gray-500 py-20">
            <Folder className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <p>Không có tệp nào trong thư mục này</p>
          </div>
        )}

        {!loading && filteredFiles.length > 0 && (
          <>
            {view === "grid" ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {filteredFiles.map((item) => (
                  <div
                    key={item.key}
                    className="group relative p-4 bg-white border rounded-lg shadow-sm hover:shadow-md transition-all"
                  >
                    {item.is_folder ? (
                      <Folder className="w-12 h-12 text-blue-400 mx-auto mb-2" />
                    ) : (
                      <File className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    )}
                    <p className="text-center text-sm font-medium truncate">
                      {item.name || item.key}
                    </p>

                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition">
                      <button
                        onClick={() =>
                          setRenameData({ key: item.key, newName: "" })
                        }
                        className="p-1 hover:bg-gray-200 rounded"
                      >
                        <Edit3 className="w-4 h-4 text-gray-600" />
                      </button>
                      <button
                        onClick={() => deleteFile(item.key)}
                        className="p-1 hover:bg-red-100 rounded"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white border rounded-lg shadow-sm">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left py-3 px-4">Tên</th>
                      <th className="text-left py-3 px-4">Loại</th>
                      <th className="text-left py-3 px-4">Ngày sửa đổi</th>
                      <th className="text-left py-3 px-4">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredFiles.map((item) => (
                      <tr key={item.key} className="hover:bg-gray-50">
                        <td className="py-2 px-4">{item.name || item.key}</td>
                        <td className="py-2 px-4">
                          {item.is_folder ? "Thư mục" : "Tệp"}
                        </td>
                        <td className="py-2 px-4">{item.modified || "--"}</td>
                        <td className="py-2 px-4 flex gap-2">
                          <button
                            onClick={() =>
                              setRenameData({ key: item.key, newName: "" })
                            }
                            className="p-1 hover:bg-gray-200 rounded"
                          >
                            <Edit3 className="w-4 h-4 text-gray-600" />
                          </button>
                          <button
                            onClick={() => deleteFile(item.key)}
                            className="p-1 hover:bg-red-100 rounded"
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}

        {/* Rename Modal */}
        {renameData.key && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-md w-96">
              <h2 className="text-lg font-semibold mb-4">Đổi tên tệp</h2>
              <input
                type="text"
                placeholder="Tên mới"
                value={renameData.newName}
                onChange={(e) =>
                  setRenameData({ ...renameData, newName: e.target.value })
                }
                className="border px-3 py-2 w-full rounded mb-4"
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setRenameData({ key: "", newName: "" })}
                  className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                >
                  Hủy
                </button>
                <button
                  onClick={handleRename}
                  className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                >
                  Lưu
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
