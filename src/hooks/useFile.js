import { useContext, useMemo } from "react";
import { FileContext } from "../context/FileContext";

export default function useFile() {
  const ctx = useContext(FileContext);
  const currentPath = useMemo(() => ctx.path.join("/"), [ctx.path]);

  const visibleFiles = useMemo(
    () => ctx.files.filter(f => !f.deleted && f.path === currentPath),
    [ctx.files, currentPath]
  );

  const trashFiles = useMemo(
    () => ctx.files.filter(f => f.deleted),
    [ctx.files]
  );

  return { ...ctx, currentPath, visibleFiles, trashFiles };
}
