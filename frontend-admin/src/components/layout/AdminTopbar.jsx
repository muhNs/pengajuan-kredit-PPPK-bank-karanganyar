import React from "react";
import { useLocation } from "react-router-dom";
import { useUIStore } from "../../store/uiStore";
import { useAuthStore } from "../../features/auth/stores/authStore";

const PAGE_TITLES = {
  "/admin": "Dashboard",
  "/admin/pengajuan": "Data Pengajuan",
  "/admin/kreditur": "Data Kreditur",
  "/admin/master-data": "Kelola Master Data",
};

export default function AdminTopbar() {
  const location = useLocation();
  const { globalSearch, setGlobalSearch, toggleSidebar } = useUIStore();
  const user = useAuthStore((state) => state.user);
  const pageTitle =
    Object.entries(PAGE_TITLES)
      .sort((a, b) => b[0].length - a[0].length)
      .find(([path]) => location.pathname.startsWith(path))?.[1] ?? "Admin CMS";

  return (
    <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0 z-10">
      <div className="flex items-center gap-8 flex-1">
        {/* Menu Toggle (Mobile) */}
        <button onClick={toggleSidebar} className="lg:hidden p-2 hover:bg-gray-50 rounded-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Page Info */}
        <div className="hidden sm:block">
          <h1 className="text-[22px] font-black text-[#152042] tracking-tight">
            {pageTitle}
          </h1>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">
              Home
            </span>
            <span className="text-[11px] text-gray-300">/</span>
            <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">
              {pageTitle}
            </span>
          </div>
        </div>
      </div>

      {/* Right Actions  */}
      <div className="flex items-center gap-6">
        {/* User Profile */}
        <div className="flex items-center gap-3 pl-6 border-l border-gray-100">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-black text-[#152042] leading-none">
              {user?.username || "Admin Utama"}
            </p>
            <p className="text-[11px] text-gray-400 font-semibold mt-1">
              {user?.email || "Super Admin"}
            </p>
          </div>
          <div className="relative group cursor-pointer">
            <div className="w-11 h-11 rounded-xl overflow-hidden ring-2 ring-white shadow-md group-hover:ring-[#FFC800] transition-all duration-300">
              <img
                src="https://ui-avatars.com/api/?name=Admin+Utama&background=152042&color=fff&bold=true"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full shadow-sm" />
          </div>
        </div>
      </div>
    </header>
  );
}
