import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Home,
  FileText, 
  Users, 
  Database, 
  ChevronRight, 
  LogOut 
} from "lucide-react";
import { useMasterDataStore } from "../../features/master-data/store/masterDataStore";
import { useAuth } from "../../features/auth/hooks/useAuth";
import { ProfileCard } from "../ui/ProfileCard";

export default function AdminSidebar() {
  const location = useLocation();
  const { categories } = useMasterDataStore();
  const { handleLogout } = useAuth();

  const [isMasterOpen, setIsMasterOpen] = useState(
    location.pathname.includes("master-data")
  );

  // Semua icon sekarang menggunakan lucide-react dengan ukuran dan ketebalan yang konsisten
  const NAV_ITEMS = [
    {
      to: "/admin",
      exact: true,
      icon: <Home size={20} strokeWidth={2.5} />,
      label: "Dashboard",
    },
    {
      to: "/admin/pengajuan",
      icon: <FileText size={20} strokeWidth={2.5} />,
      label: "Pengajuan",
    },
    {
      to: "/admin/users",
      icon: <Users size={20} strokeWidth={2.5} />,
      label: "Users",
    },
    {
      to: "/admin/master-data",
      icon: <Database size={20} strokeWidth={2.5} />,
      label: "Master Data",
      hasArrow: true,
      isExpandable: true,
      children: categories.map((cat) => ({
        to: `/admin/master-data/${cat.key}`,
        label: cat.label,
        key: cat.key,
      })),
    },
  ];

  const isActive = (to, exact = false) => {
    if (exact) return location.pathname === to;
    return location.pathname.startsWith(to);
  };

  return (
    <aside className="w-[280px] bg-[#0B1121] text-white flex flex-col shadow-2xl z-20 shrink-0 border-r border-white/5 relative overflow-hidden">
      
      {/* Profile Card */}
      <ProfileCard />

      <div className="px-6 py-4 flex-1 relative z-10 overflow-y-auto scrollbar-hide">
        <p className="px-4 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-6 opacity-50">
          Menu Utama
        </p>
        <nav className="space-y-2">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.to, item.exact);
            const isMaster = item.label === "Master Data";

            return (
              <div key={item.to}>
                <div
                  onClick={() => isMaster && setIsMasterOpen(!isMasterOpen)}
                  className="block cursor-pointer"
                >
                  <Link
                    to={isMaster ? "#" : item.to}
                    className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 group ${
                      active && !isMaster
                        ? "bg-[#FFC800] text-[#0B1121] shadow-xl shadow-[#FFC800]/10 font-black"
                        : active && isMaster
                          ? "text-[#FFC800] font-black"
                          : "text-gray-500 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <span
                      className={`${active ? "text-[#FFC800]" : "group-hover:text-white transition-colors"} ${active && !isMaster ? "!text-[#0B1121]" : ""}`}
                    >
                      {item.icon}
                    </span>
                    <span className="text-[15px] flex-1 tracking-tight">
                      {item.label}
                    </span>
                    {item.hasArrow && (
                      <ChevronRight 
                        size={16} 
                        strokeWidth={3} 
                        className={`transition-transform duration-300 ${
                          isMaster && isMasterOpen ? "rotate-90" : ""
                        } ${active ? "text-[#FFC800]" : "opacity-30"}`} 
                      />
                    )}
                  </Link>
                </div>

                {isMaster && isMasterOpen && (
                  <div className="mt-2 ml-10 space-y-1 border-l border-white/5 pl-4 animate-in fade-in slide-in-from-left-2 duration-300">
                    {item.children?.map((child) => {
                      const childActive = location.pathname.includes(child.to);
                      return (
                        <Link
                          key={child.to}
                          to={child.to}
                          className={`block py-2.5 text-[13px] transition-all ${childActive ? "text-[#FFC800] font-black" : "text-gray-500 hover:text-white"}`}
                        >
                          <div className="flex items-center gap-3">
                            {childActive && (
                              <div className="w-1.5 h-1.5 bg-[#FFC800] rounded-full shadow-[0_0_10px_#FFC800]" />
                            )}
                            {child.label}
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <p className="px-4 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mt-10 mb-6 opacity-50">
          Pengaturan
        </p>

        {/* --- TOMBOL LOGOUT --- */}
        <button
          type="button"
          onClick={async (e) => {
            e.preventDefault();
            console.log("Tombol berhasil diklik!");
            await handleLogout();
          }}
          className="relative z-50 pointer-events-auto cursor-pointer isolate flex w-full items-center gap-4 px-5 py-4 rounded-2xl text-gray-500 hover:bg-white/5 hover:text-red-400 transition-all group"
        >
          <LogOut size={20} strokeWidth={2.5} />
          <span className="text-[15px] flex-1 text-left tracking-tight">
            Keluar
          </span>
        </button>
      </div>

      <div className="h-10 shrink-0" />
    </aside>
  );
}