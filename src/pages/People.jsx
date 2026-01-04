import { useEffect, useMemo, useState, useContext } from "react";
import { RefreshCw, Users } from "lucide-react";
import shareAPI from "../api/share.api";
import CloudSidebar from "../components/layout/CloudSidebar";
import Header from "../components/layout/Header";
import formatDate from "../utils/formatDate";
import PlanModal from "../components/modal/PlanModal";
import { AuthContext } from "../context/AuthContext";

export default function People() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [planModalOpen, setPlanModalOpen] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await shareAPI.getSharedPeople({ limit: 500 });
        const results = res?.data || [];
        setItems(results);
      } catch (err) {
        const fallbackRes = await shareAPI
          .getSharedWithMe({ limit: 500 })
          .then((r) => r?.data?.results || [])
          .catch(() => []);
        if (fallbackRes.length) {
          setItems(
            fallbackRes.reduce((acc, item) => {
              const email = item.owner_email || item.owner || item.shared_by || "Unknown";
              const name = item.owner_name || item.owner || item.shared_by || email;
              const existing = acc.find((x) => x.email === email);
              if (existing) {
                existing.count += 1;
                if (
                  !existing.latest_shared_at ||
                  new Date(item.shared_at) > new Date(existing.latest_shared_at)
                ) {
                  existing.latest_shared_at = item.shared_at;
                }
              } else {
                acc.push({
                  email,
                  name,
                  count: 1,
                  latest_shared_at: item.shared_at,
                });
              }
              return acc;
            }, [])
          );
        } else {
          const message =
            err?.response?.data?.error ||
            err?.response?.data?.detail ||
            err?.message ||
            "Không thể tải danh sách người chia sẻ";
          setError(message);
        }
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const people = useMemo(() => {
    const arr = Array.isArray(items) ? items : [];
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      return arr.filter(
        (p) => p.email.toLowerCase().includes(q) || (p.name || "").toLowerCase().includes(q)
      );
    }
    return arr;
  }, [items, search]);

  const emptyState = (
    <div className="flex flex-col items-center justify-center py-20 text-gray-500 dark:text-gray-400 space-y-4">
      <Users className="w-12 h-12" />
      <p className="text-lg font-semibold text-gray-900 dark:text-white">
        People have yet to share files with you
      </p>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-gray-50 text-gray-900 dark:bg-[#0b0c0f] dark:text-white">
      <CloudSidebar
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed((prev) => !prev)}
        onBuyStorage={() => setPlanModalOpen(true)}
      />

      <div className="flex-1 flex flex-col min-h-screen bg-gray-50 text-gray-900 dark:bg-[#0b0c0f] dark:text-white">
        <Header
          search={search}
          onSearch={setSearch}
          placeholder="Search people"
          showPlanButton
          onPlanClick={() => setPlanModalOpen(true)}
          rightExtra={
            <button
              onClick={() => window.location.reload()}
              className="h-10 w-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 text-gray-600 dark:border-white/10 dark:hover:bg-white/5 dark:text-gray-300"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          }
        />

        <main className="flex-1 px-6 lg:px-10 py-10 space-y-6 bg-gray-50 text-gray-900 dark:bg-[#0b0c0f] dark:text-white custom-scroll overflow-y-auto">
          <h2 className="text-lg font-semibold">People</h2>

          {error && (
            <div className="border border-rose-200 bg-rose-50 text-rose-700 rounded-2xl p-4 dark:border-rose-500/40 dark:bg-rose-500/10 dark:text-rose-100">
              {error}
            </div>
          )}

          {loading ? (
            <p className="text-gray-600 dark:text-gray-400">Đang tải...</p>
          ) : people.length === 0 ? (
            emptyState
          ) : (
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-white/10 dark:bg-white/5">
              <div className="grid grid-cols-3 px-4 py-3 text-xs uppercase tracking-wide text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-white/5">
                <span>Người chia sẻ</span>
                <span className="text-center">Số link</span>
                <span className="text-right">Gần nhất</span>
              </div>
              <div className="divide-y divide-gray-200 dark:divide-white/5">
                {people.map((p) => (
                  <div key={p.email} className="grid grid-cols-3 px-4 py-3 text-sm items-center">
                    <div className="min-w-0">
                      <p className="font-medium text-gray-900 truncate dark:text-white">{p.name}</p>
                      <p className="text-xs text-gray-500 truncate dark:text-gray-400">{p.email}</p>
                    </div>
                    <div className="text-center text-gray-700 dark:text-gray-200">{p.count}</div>
                    <div className="text-right text-gray-500 dark:text-gray-300">
                      {p.latest_shared_at ? formatDate(p.latest_shared_at) : "--"}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>

        {planModalOpen && (
          <PlanModal
            isOpen={planModalOpen}
            onClose={() => setPlanModalOpen(false)}
            activePlanName={user?.plan ? user.plan.charAt(0).toUpperCase() + user.plan.slice(1) : "Free"}
          />
        )}
      </div>
    </div>
  );
}

