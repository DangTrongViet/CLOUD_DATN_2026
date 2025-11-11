import storage from "../services/storage.service";
import useFile from "./useFile";

export default function useUpload() {
  const { currentPath, addFiles } = useFile();

  const upload = async (fileList) => {
    const files = Array.from(fileList || []).filter(Boolean);
    const results = await Promise.all(files.map(f => storage.upload(f, currentPath)));
    addFiles(results);
    return results;
  };

  return { upload };
}
