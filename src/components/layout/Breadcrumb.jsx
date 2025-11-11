export default function Breadcrumb({ path, onNavigate }) {
  return (
    <div className="text-sm text-gray-600 dark:text-gray-400 mb-3 flex items-center gap-1">
      {path.map((p, i) => (
        <span key={i} className="flex items-center gap-1">
          <button
            onClick={() => onNavigate(i)}
            className="hover:underline hover:text-blue-500"
          >
            {p}
          </button>
          {i < path.length - 1 && <span>/</span>}
        </span>
      ))}
    </div>
  );
}
