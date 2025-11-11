import { Folder } from "lucide-react";
import useFile from "../../hooks/useFile";

export default function FolderItem({ name }) {
  const { path, setPath } = useFile();

  const handleClick = () => {
    // Khi click -> di chuyển path xuống folder con
    setPath([...path, name]);
  };

  return (
    <div
      className="bg-white border rounded-lg p-4 flex flex-col items-center justify-center hover:shadow cursor-pointer transition"
      onClick={handleClick}
    >
      <Folder size={36} className="text-yellow-500 mb-2" />
      <p className="font-medium text-gray-700 truncate w-full text-center">{name}</p>
    </div>
  );
}
